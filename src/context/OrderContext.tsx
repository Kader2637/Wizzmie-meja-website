"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MENU_ITEMS } from "@/lib/constants";

interface CartItem {
  id: number;
  qty: number;
}

interface OrderContextType {
  cart: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  totalCart: number;
  selectedTable: number | null;
  setSelectedTable: (id: number | null) => void;
  selectedPayment: string | null;
  setSelectedPayment: (payment: string | null) => void;
  resetOrder: () => void;
  currentFloor: number;
  setCurrentFloor: (floor: 1 | 2) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [currentFloor, setCurrentFloor] = useState<1 | 2>(1);

  const addToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalCart = cart.reduce((acc, curr) => {
    const menuItem = MENU_ITEMS.find((m) => m.id === curr.id);
    return acc + (menuItem?.price || 0) * curr.qty;
  }, 0);

  const resetOrder = () => {
    setCart([]);
    setSelectedTable(null);
    setSelectedPayment(null);
  };

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        totalCart,
        selectedTable,
        setSelectedTable,
        selectedPayment,
        setSelectedPayment,
        resetOrder,
        currentFloor,
        setCurrentFloor,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
