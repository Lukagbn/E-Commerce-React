"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import layout from "@/app/layout.module.scss";

type user = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  image: string;
  phone: string;
};

function page() {
  const router = useRouter();
  const [userData, setUserData] = useState<user | null>(null);
  const fetchUser = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null) {
      const parsedToken = token ? JSON.parse(token) : null;
      const res = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedToken.accessToken}`,
        },
      });
      if (res.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
      } else {
        const result = await res.json();
        setUserData(result);
      }
    }
  };
  const checkUser = () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (!(localUser || sessionUser)) {
      router.push("/login");
    }
  };
  function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
  useEffect(() => {
    fetchUser();
    checkUser();
  }, []);
  if (!userData) return <div className={styles.loading}>Loading...</div>;
  return (
    <main>
      <div className={layout.innerContainer}>
        <div className={styles.userProfile}>
          <h1>Welcome {userData.firstName + userData.lastName}</h1>
          <div className={styles.profileHeader}>
            <Image
              src={userData.image}
              width={100}
              height={100}
              alt="user profile picture"
            />
          </div>
          <div className={styles.profileBody}>
            <div className={styles.profileDetails}>
              <h4>name</h4>
              <span>{userData.firstName}</span>
            </div>
            <div className={styles.profileDetails}>
              <h4>gender</h4>
              <span>{userData.gender}</span>
            </div>
            <div className={styles.profileDetails}>
              <h4>email</h4>
              <span>{userData.email}</span>
            </div>
            <div className={styles.profileDetails}>
              <h4>phone</h4>
              <span>{userData.phone}</span>
            </div>
            <button onClick={() => logOut()}>log out</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
