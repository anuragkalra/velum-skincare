"use client";

import { createContext, useContext, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { addBagItem, getBagSnapshot, getServerBagSnapshot, subscribeBag } from "../lib/bag-store";
import { BagDrawer } from "./bag-drawer";

type BagContextValue = ReturnType<typeof getBagSnapshot> & { isOpen: boolean; openBag: () => void; closeBag: () => void; addToBag: (slug: string, quantity: number) => void };
const BagContext = createContext<BagContextValue | null>(null);

export function useBag() {
  const value = useContext(BagContext);
  if (!value) throw new Error("Bag controls must be within BagProvider.");
  return value;
}

export function BagProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribeBag, getBagSnapshot, getServerBagSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const previousOverflow = useRef("");

  function openBag() {
    if (!dialog.current || dialog.current.open) return;
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    setIsOpen(true);
    dialog.current.querySelector<HTMLButtonElement>(".bag-close")?.focus();
  }
  function closeBag() { dialog.current?.close(); }
  function onClose() {
    document.body.style.overflow = previousOverflow.current;
    setIsOpen(false);
    const destination = trigger.current?.isConnected ? trigger.current : document.querySelector<HTMLButtonElement>(".bag");
    destination?.focus({ preventScroll: true });
  }
  function addToBag(slug: string, quantity: number) { addBagItem(slug, quantity); openBag(); }

  return <BagContext.Provider value={{ ...state, isOpen, openBag, closeBag, addToBag }}>
    {children}
    <BagDrawer dialogRef={dialog} onClose={onClose} />
  </BagContext.Provider>;
}
