/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import TextField from "@mui/material/TextField";
import BubbleText from "../../components/ui/bubbleText/BubbleText";
import { Button } from "../../components/ui/button";

export default function Signup() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Error in signup:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else if (
      user.username.length === 0 ||
      user.email.length === 0 ||
      user.password.length === 0
    ) {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center border border-gray-300 rounded-xl p-8 shadow-lg bg-white w-[90%] max-w-sm">
        <BubbleText>{loading ? "Signing up..." : "Signup"}</BubbleText>

        <div className="w-full mt-4">
          <label className="font-semibold" htmlFor="username">
            Username
          </label>
          <TextField
            type="text"
            id="username"
            fullWidth
            size="small"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            className="mb-4"
          />
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <TextField
            type="email"
            id="email"
            fullWidth
            size="small"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="mb-4"
          />
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <TextField
            type="password"
            id="password"
            fullWidth
            size="small"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className=""
          />
        </div>

        <Button
          onClick={onSignup}
          className=" w-full py-2 rounded-lg mt-4"
          disabled={buttonDisabled}
        >
          {loading ? "Signing up..." : "Signup"}
        </Button>

        <Link href="/login" className="mt-4 text-blue-500 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
