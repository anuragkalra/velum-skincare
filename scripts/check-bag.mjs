import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const output = mkdtempSync(join(tmpdir(), 'velum-bag-checks-'));
try {
  for (const name of ['products', 'quantity', 'cart', 'bag-store']) {
    const source = readFileSync(resolve('app/lib', `${name}.ts`), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
    writeFileSync(join(output, `${name}.js`), outputText);
  }
  const result = spawnSync(process.execPath, ['--test', 'tests/bag.test.mjs'], { stdio: 'inherit', env: { ...process.env, VELUM_TEST_LIB: output } });
  process.exitCode = result.status ?? 1;
} finally { rmSync(output, { recursive: true, force: true }); }
