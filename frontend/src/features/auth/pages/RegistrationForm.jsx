import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Nav from "../components/Nav";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyetoggle, setEyetoggle] = useState(true);
  const navigate = useNavigate();

  const { handleRegister, loading } = useAuth();
  if (loading) return (<main className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <i className="fa-brands fa-instagram text-4xl text-gray-400 animate-pulse mb-4"></i>
          <p className="text-gray-500 font-medium tracking-wide">Loading feed...</p>
        </div>
      </main>)
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await handleRegister(username, email, password);
    console.log(res);
    navigate("/"); 
    setUsername("");
    setEmail("");
    setPassword("");
  }
  return (
    <main className="relative flex justify-center items-center h-screen bg-[#e6eff7]">
      <Nav />
      <div
        className="
      bg-white/30
      backdrop-blur-2xl
      shadow-[0_8px_32px_rgba(31,38,135,0.37)]
      border border-black/20
      rounded-2xl
      p-10
      flex flex-col
      items-center
      gap-6
    "
      >
        <div className="flex justify-center items-center font-bold text-red-900 drop-shadow-lg gap-2 pr-4">
          <i className="fa-solid fa-person-circle-plus text-2xl"></i>
          <h1 className="text-3xl">Register</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-72 ">
          {loading && (
            <h1 className="text-lg font-semibold text-red-800">Loading...</h1>
          )}
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            type="text"
            name="username"
            placeholder="Enter username"
            className="bg-white/20 text-black/80 font-medium placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-black/30 backdrop-blur-md"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            name="email"
            placeholder="Enter email address"
            className="bg-white/20 text-black/80 font-medium  placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-black/30 backdrop-blur-md"
          />

          <div className="relative w-full">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={eyetoggle ? "password" : "text"}
              name="password"
              placeholder="Enter password"
              className="bg-white/20 w-full text-black/80 font-medium  placeholder-gray-300 px-4 py-3 rounded-lg focus:outline-none border border-black/30 backdrop-blur-md"
            />
            <div
              onClick={() => {
                setEyetoggle(!eyetoggle);
              }}
              className="absolute right-3 top-3 cursor-pointer"
            >
              <div className="text-black/80 text-md">
                {eyetoggle ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-red-900 text-white font-semibold px-4 py-3 hover:bg-red-800 transition backdrop-blur-md active:scale-95 cursor-pointer"
          >
            Register
          </button>
        </form>
        <p className="text-black/80 font-medium">
          Already have an account ?{" "}
          <Link className="text-green-900 font-bold" to="/login">
            login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default RegistrationForm;
