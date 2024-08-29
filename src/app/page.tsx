"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PostForm = async (name: string, email: string) => {
  const res = await fetch(`http://localhost:3000/api/user/`, {
    method: "POST",
    body: JSON.stringify({ name, email }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();
};

export default function Home() {
  const router = useRouter();
  interface ChangeState {
    name: string;
    email: string;
  }
  const [Change, setChange] = useState({
    name: "",
    email: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChange(prevChange => ({
      ...prevChange,
      [name]: value,
    }));
    console.log(Change.email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Change.name !== "" && Change.email !== "") {
      PostForm(Change.name, Change.email);
      router.push("/thanks");
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input
            className="text-black"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            className="text-black"
            type="email"
            onChange={handleChange}
            name="email"
          />
        </div>
        <button className="p-2 bg-gray-400">Submit</button>
      </form>
    </main>
  );
}
