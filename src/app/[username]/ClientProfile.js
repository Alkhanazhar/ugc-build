"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRefferalByUser } from "@/redux/slice/userSlice";

export default function ClientProfile({ username }) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("refrralByUser", username);
    dispatch(setRefferalByUser(username));
    console.log(username, "Stored");
    router.push("/");
  }, [username]);

  return (
    <div>
      {/* <h1>Profile for {username}</h1> */}
      loading
    </div>
  );
}
