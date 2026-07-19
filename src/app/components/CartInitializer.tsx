"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hook";
import { loadCartFromStorage } from "@/lib/slices/cartSlice";

export default function CartInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCartFromStorage());
  }, [dispatch]);

  return null;
}
