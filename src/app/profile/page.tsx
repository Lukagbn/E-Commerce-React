"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    const parsedToken = token ? JSON.parse(token) : null;
    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedToken.accessToken}`, // Pass JWT via Authorization header
      },
    });
    // if (res.status === 401) {
    //   console.log("Error");
    // }
    const result = await res.json();
    setUserData(result);
    console.log(result);
  };
  const checkUser = () => {
    const localUser = localStorage.getItem("localUser");
    const sessionUser = sessionStorage.getItem("sessionUser");
    if (!(localUser || sessionUser)) {
      router.push("/login");
    }
  };
  useEffect(() => {
    fetchUser();
    checkUser();
  }, []);
  if (!userData) return <div>Loading...</div>;
  return (
    <div>
      <ul>
        <li>{userData.firstName}</li>
        <li>{userData.lastName}</li>
        <li>{userData.gender}</li>
        <li>{userData.email}</li>
        <li>{userData.phone}</li>
        <li>
          <img src={userData.image} alt="profile image" />
        </li>
      </ul>
    </div>
  );
}

export default page;
