/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import TextField from "@mui/material/TextField";
import BubbleText from "../../components/ui/bubbleText/BubbleText";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response:", response.data);

      if (response.data.success) {
        toast.success("Login successful");
        router.push("/profile");
      } else {
        toast.error(response.data.error || "Login failed");
      }
    } catch (error: any) {
      console.error("Login failed:", error.message);
      toast.error(
        error.response?.data?.error || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center border border-gray-300 rounded-xl p-8 shadow-lg bg-white space-y-4">
        <BubbleText>{loading ? "Logging in..." : "Login"}</BubbleText>
        <hr className="w-full" />

        <label className="font-semibold w-full" htmlFor="email">
          Email
        </label>
        <TextField
          className="w-full border border-gray-300 rounded p-2 mb-4"
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label className="font-semibold w-full" htmlFor="password">
          Password
        </label>
        <TextField
          className="w-full border border-gray-300 rounded p-2 "
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <Button
          onClick={onLogin}
          className="w-full p-2 border-gray-900 rounded-lg focus:outline-none focus:border-gray-600 mt-4"
          disabled={buttonDisabled}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Link href="/signup" className="text-blue-500 hover:underline">
          Don&apos;t have an account? Signup
        </Link>
      </div>
    </div>
  );
}
