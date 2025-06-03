"use client";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl text-black">
        This is the profile page for user{" "}
        <span className="p-2 rounded bg-orange-300 text-black">
          {id}
        </span>
        .
      </p>
      <p>You can add user details here.</p>
    </div>
  );
}
