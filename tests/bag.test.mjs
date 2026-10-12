import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { createRequire } from 'node:module';
const loadCompiled = createRequire(import.meta.url);
const lib = process.env.VELUM_TEST_LIB;
const cart = loadCompiled(join(lib, 'cart.js'));
const { products } = loadCompiled(join(lib, 'products.js'));
const stored = items => JSON.stringify({ version: 1, items });

test('merges repeated additions, caps each product at ten, and preserves catalog order', () => {
  let items = cart.addCartItem([], 'seal', 1).items;
  items = cart.addCartItem(items, 'fortify', 2).items;
  items = cart.addCartItem(items, 'cleanse', 3).items;
  items = cart.addCartItem(items, 'fortify', 2).items;
  assert.deepEqual(items, [{ slug: 'cleanse', quantity: 3 }, { slug: 'fortify', quantity: 4 }, { slug: 'seal', quantity: 1 }]);
  const limited = cart.addCartItem(items, 'fortify', 9);
  assert.equal(limited.limited, true);
  assert.equal(limited.items[1].quantity, 10);
  assert.deepEqual(cart.addCartItem(items, 'unknown', 2).items, items);
});
test('uses integer cents from the shared approved catalog for totals', () => {
  assert.deepEqual(products.map(p => [p.name, p.size, p.priceCents]), [['CLEANSE', '150 mL', 3800], ['FORTIFY', '30 mL', 6800], ['SEAL', '50 mL', 5800]]);
  const items = [{ slug: 'cleanse', quantity: 2 }, { slug: 'fortify', quantity: 3 }, { slug: 'seal', quantity: 1 }];
  assert.equal(cart.cartUnits(items), 6);
  assert.equal(cart.cartSubtotalCents(items), 33800);
  assert.equal(cart.formatMoney(33800), '$338.00');
  assert.equal(cart.cartSubtotalCents([]), 0);
});
test('normalizes changed quantities to positive bounded integers and supports removal', () => {
  const items = [{ slug: 'cleanse', quantity: 2 }];
  for (const [value, expected] of [[0, 1], [-1, 1], [2.9, 2], [99, 10], [NaN, 1], [Infinity, 1]]) {
    assert.equal(cart.changeCartQuantity(items, 'cleanse', value)[0].quantity, expected);
  }
  assert.deepEqual(cart.removeCartItem(items, 'cleanse'), []);
});
test('rejects malformed JSON, unsupported versions and incorrect structures', () => {
  for (const value of [null, '', 'broken{', 'null', '[]', '{}', JSON.stringify({ version: 2, items: [] }), JSON.stringify({ version: 1, items: {} })]) assert.deepEqual(cart.parseStoredCart(value), []);
});
test('ignores unknown products, invalid types and invalid stored quantities', () => {
  const valid = [{ slug: 'cleanse', quantity: 2 }];
  const invalid = [null, 1, { slug: 'unknown', quantity: 3 }, ...[0, -2, 2.2, 11, '2', null].map(quantity => ({ slug: 'fortify', quantity }))];
  assert.deepEqual(cart.parseStoredCart(stored([...valid, ...invalid])), valid);
});
test('sanitizes duplicate stored lines, order and injected prices', () => {
  const parsed = cart.parseStoredCart(stored([{ slug: 'seal', quantity: 1, priceCents: 1 }, { slug: 'fortify', quantity: 6 }, { slug: 'fortify', quantity: 7 }, { slug: 'cleanse', quantity: 2 }]));
  assert.deepEqual(parsed, [{ slug: 'cleanse', quantity: 2 }, { slug: 'fortify', quantity: 10 }, { slug: 'seal', quantity: 1 }]);
  assert.equal(cart.cartSubtotalCents(parsed), 81400);
});
test('round-trips valid persistence without storing prices or personal information', () => {
  let value = null;
  const storage = { getItem: () => value, setItem: (key, next) => { assert.equal(key, cart.BAG_STORAGE_KEY); value = next; } };
  const items = [{ slug: 'fortify', quantity: 2 }];
  assert.equal(cart.saveCart(items, () => storage), true);
  assert.deepEqual(JSON.parse(value), { version: 1, items });
  assert.deepEqual(cart.loadCart(() => storage), { items, unavailable: false });
});
test('catches blocked storage access, read errors and quota/write errors', () => {
  const blocked = () => { throw new Error('SecurityError'); };
  const failures = { getItem: () => { throw new Error('read failure'); }, setItem: () => { throw new Error('QuotaExceededError'); } };
  assert.deepEqual(cart.loadCart(blocked), { items: [], unavailable: true });
  assert.deepEqual(cart.loadCart(() => failures), { items: [], unavailable: true });
  assert.equal(cart.saveCart([], blocked), false);
  assert.equal(cart.saveCart([], () => failures), false);
});
test('shared store keeps an operational in-memory bag when browser storage is unavailable', () => {
  global.window = { get localStorage() { throw new Error('SecurityError'); }, addEventListener() {}, removeEventListener() {} };
  const path = join(lib, 'bag-store.js');
  delete loadCompiled.cache[loadCompiled.resolve(path)];
  const store = loadCompiled(path);
  let notifications = 0;
  const unsubscribe = store.subscribeBag(() => { notifications++; });
  assert.equal(store.getBagSnapshot().storageUnavailable, true);
  store.addBagItem('cleanse', 2);
  store.addBagItem('cleanse', 3);
  assert.deepEqual(store.getBagSnapshot().items, [{ slug: 'cleanse', quantity: 5 }]);
  assert.equal(store.getBagSnapshot().storageUnavailable, true);
  store.setBagQuantity('cleanse', 99);
  assert.equal(store.getBagSnapshot().items[0].quantity, 10);
  assert.match(store.getBagSnapshot().notice, /limit of 10/);
  store.removeBagItem('cleanse');
  assert.deepEqual(store.getBagSnapshot().items, []);
  assert.ok(notifications >= 5);
  unsubscribe();
  delete global.window;
});
test('shared store hydrates malformed storage safely and recovers on the next write', () => {
  let value = 'malformed';
  global.window = { localStorage: { getItem: () => value, setItem: (_, next) => { value = next; } }, addEventListener() {}, removeEventListener() {} };
  const path = join(lib, 'bag-store.js');
  delete loadCompiled.cache[loadCompiled.resolve(path)];
  const store = loadCompiled(path);
  const unsubscribe = store.subscribeBag(() => {});
  assert.deepEqual(store.getBagSnapshot().items, []);
  store.addBagItem('seal', 1);
  assert.deepEqual(cart.parseStoredCart(value), [{ slug: 'seal', quantity: 1 }]);
  assert.equal(store.getBagSnapshot().storageUnavailable, false);
  assert.deepEqual(store.getServerBagSnapshot().items, []);
  unsubscribe();
  delete global.window;
});

test('shared store retains additions after quota failure and resumes persistence after recovery', () => {
  let value = null;
  let blocked = true;
  global.window = { localStorage: { getItem: () => value, setItem: (_, next) => { if (blocked) throw new Error('QuotaExceededError'); value = next; } }, addEventListener() {}, removeEventListener() {} };
  const path = join(lib, 'bag-store.js');
  delete loadCompiled.cache[loadCompiled.resolve(path)];
  const store = loadCompiled(path);
  const unsubscribe = store.subscribeBag(() => {});
  store.addBagItem('fortify', 2);
  assert.deepEqual(store.getBagSnapshot().items, [{ slug: 'fortify', quantity: 2 }]);
  assert.equal(store.getBagSnapshot().storageUnavailable, true);
  blocked = false;
  store.addBagItem('cleanse', 1);
  assert.equal(store.getBagSnapshot().storageUnavailable, false);
  assert.deepEqual(cart.parseStoredCart(value), [{ slug: 'cleanse', quantity: 1 }, { slug: 'fortify', quantity: 2 }]);
  unsubscribe();
  delete global.window;
});
