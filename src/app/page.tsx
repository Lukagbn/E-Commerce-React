"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const router = useRouter();
  const checkUser = () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (localUser || sessionUser) {
      router.push("/profile");
    } else {
      router.push("/products");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return <div>page</div>;
}

export default page;
