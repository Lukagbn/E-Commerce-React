"use client";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import form from "../form.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("Firstname is required!")
    .min(4, "Firstname must be at least 4 symbols!")
    .max(20, "Firstname must be maximum 20 symbols!"),
  lastName: yup
    .string()
    .required("Lastname is required!")
    .min(4, "Lastname must be at least 4 symbols!")
    .max(20, "Lastname must be maximum 20 symbols!"),
  userName: yup
    .string()
    .required("Username is required!")
    .min(4, "Username must be at least 4 symbols!")
    .max(20, "Username must be maximum 20 symbols!"),
  email: yup.string().required("Email is required!").email("Incorrect email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be minimum 6 symbols!")
    .max(12, "Password must be maximum 12 symbols!")
    .matches(/(?=.*[A-Z])/, "At least one uppercase letter required!")
    .matches(/(?=.*[a-z])/, "At least one lowercase letter required!"),
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleRegister = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
  }) => {
    try {
      const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userName: data.userName,
        password: data.password,
        gender: false,
      };
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.log("error registering user!");
      }
      console.log(user);
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.error("error", error);
    }
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
        onSubmit={handleSubmit(handleRegister)}
        noValidate
      >
        <h1 className={form.formHeader}>Register</h1>
        <div className={form.formGroup}>
          <div className={form.formInnerGroup}>
            <label>First name</label>
            <input {...register("firstName")} type="text" required />
          </div>
          {errors.firstName && (
            <p className={form.errorMessage}>{errors.firstName.message}</p>
          )}
        </div>
        <div className={form.formGroup}>
          <div className={form.formInnerGroup}>
            <label>Last name</label>
            <input {...register("lastName")} type="text" required />
          </div>
          {errors.lastName && (
            <p className={form.errorMessage}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={form.formGroup}>
          <div className={form.formInnerGroup}>
            <label>Username</label>
            <input {...register("userName")} type="text" required />
          </div>
          {errors.userName && (
            <p className={form.errorMessage}>{errors.userName.message}</p>
          )}
        </div>
        <div className={form.formGroup}>
          <div className={form.formInnerGroup}>
            <label>Email</label>
            <input {...register("email")} type="email" required />
          </div>
          {errors.email && (
            <p className={form.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        <div className={form.formGroup}>
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
              <span className={form.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>
        </div>
        <button className={form.logInBtn} type="submit">
          Create account
        </button>
        <p className={form.link}>
          Already have an account? <Link href={"/login"}>Log In</Link>
        </p>
      </form>
    </main>
  );
}

export default page;
