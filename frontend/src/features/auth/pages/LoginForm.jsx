import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
      });
    setUsername("");
    setPassword("");
  }
  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 px-12 py-18 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-6">
        <h1 className="text-3xl font-bold text-green-800 drop-shadow-lg ">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-72">
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            name="username"
            placeholder="Enter username"
            className="bg-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-white/30 focus:border-white/70 backdrop-blur-md"
          />

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            name="password"
            placeholder="Enter password"
            className="bg-white/20 text-white placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-white/30 focus:border-white/70 backdrop-blur-md"
          />

          <button
            type="submit"
            className="rounded-lg bg-green-900 text-white font-semibold px-4 py-3  hover:bg-green-800 transition backdrop-blur-md active:scale-95 cursor-pointer"
          >
            Submit
          </button>
        </form>
        <p>
          Don't have an account ?{" "}
          <Link className="text-red-900 font-bold" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginForm;
