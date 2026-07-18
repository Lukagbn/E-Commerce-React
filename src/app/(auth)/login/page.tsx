"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import form from "../form.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = yup.object({
  email: yup.string().required("Email is required!").email("Incorrect email!"),
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
  const handleLogIn = async (data: { email: string; password: string }) => {
    try {
      const res = await fetch("http://localhost:4000/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setLoginError("Incorrect login information");
        return;
      }

      const result = await res.json();

      if (checked) {
        localStorage.setItem("localUser", "true");
        localStorage.setItem("token", result.token);
      } else {
        sessionStorage.setItem("sessionUser", "true");
        sessionStorage.setItem("token", result.token);
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
    if (typeof window === "undefined") return;
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (localUser || sessionUser) {
      router.push("/");
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <main className={form.main}>
      <form
        className={form.form}
        onSubmit={handleSubmit(handleLogIn)}
        noValidate
      >
        <h1 className={form.formHeader}>log in</h1>
        <div className={form.formGroup}>
          <label htmlFor="username">Email</label>
          <input id="username" type="text" {...register("email")} />
          {errors.email && (
            <span className={form.errorMessage}>{errors.email.message}</span>
          )}
        </div>
        <div className={form.formGroup}>
          <label htmlFor="password">Password</label>
          <div className={form.passwordInput}>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password")}
            />
            <button
              className={form.passwordVisible}
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? "hide" : "show"}
            </button>
          </div>
          {errors.password && (
            <span className={form.errorMessage}>{errors.password.message}</span>
          )}
        </div>
        <div className={form.checkboxGroup}>
          <input
            type="checkbox"
            id="checkbox"
            checked={checked}
            onChange={handleCheck}
          />
          <label htmlFor="checkbox">Remember me</label>
        </div>
        <button className={form.logInBtn} type="submit">
          log in
        </button>
        <p className={form.link}>
          Didn't have an account? <Link href={"/register"}>Sign up</Link>
        </p>
        {loginError && <div className={form.errorMessage}>{loginError}</div>}
      </form>
    </main>
  );
}

export default page;
