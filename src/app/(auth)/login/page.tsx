"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from "./page.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [loginError, setLoginError] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleLogIn = async (data: { username: string; password: string }) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        setLoginError("Incorrect login information");
        return;
      }
      // const result = await res.json();
      if (checked) {
        localStorage.setItem("localUser", "true");
      } else {
        sessionStorage.setItem("sessionUser", "true");
      }
      router.push("/");
    } catch (error) {
      console.error("error", error);
    }
  };
  const handleCheck = async () => {
    setChecked(!checked);
  };
  const checkUser = () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (localUser || sessionUser) {
      router.push("/products");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleLogIn)}
        noValidate
      >
        <h1 className={styles.formHeader}>log in</h1>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" {...register("username")} />
          {errors.username && (
            <span className={styles.errorMessage}>
              {errors.username.message}
            </span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.passwordInput}>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
            />
            <button
              className={styles.passwordVisible}
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "show" : "hide"}
            </button>
          </div>
          {errors.password && (
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="checkbox"
            checked={checked}
            onChange={handleCheck}
          />
          <label htmlFor="checkbox">Remember me</label>
        </div>
        <button className={styles.logInBtn} type="submit">
          log in
        </button>
        {loginError && <div className={styles.errorMessage}>{loginError}</div>}
      </form>
    </main>
  );
}

export default page;
