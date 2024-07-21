"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/authContext";
import Navbar from "../../components/navbar/Navbar";
import { settingsSchema } from "@/validations/settingsSchema";
import { z } from "zod";

type SettingsFormInputs = z.infer<typeof settingsSchema>;

export default function SettingsForm() {
  const { darkMode, handleDarkMode } = useAuth();

  const setHandleDarkMode = () => {
    handleDarkMode();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormInputs>({
    resolver: zodResolver(settingsSchema),
  });

  const onSubmit = (data: SettingsFormInputs) => {
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <div className="dark:bg-darkVoid dark:text-blancoHueso bg-blancoHueso text-darkVoid h-screen flex items-center justify-center">
        <div className="dark:bg-slateGray bg-blancoHueso p-8 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">SETTINGS</h1>
            <button
              className="text-blancoHueso bg-slateGray p-2 rounded-full"
              onClick={setHandleDarkMode}
            >
              {darkMode ? "🌞" : "🌜"}
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="username">
                Username (edit)
              </label>
              <input
                className={`${darkMode ? "placeholder:text-black text-black  bg-lightGray" : " text-darkVoid border-2 placeholder-black bg-dustyGray"} w-full p-2 rounded`}
                type="text"
                id="username"
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="password">
                Password (edit)
              </label>
              <input
                className={`${darkMode ? " text-black  bg-lightGray placeholder:text-black" : "placeholder-black text-darkVoid border-2 bg-dustyGray "} w-full p-2 rounded `}
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className={`${darkMode ? "bg-liquidLava text-blancoHueso" : "bg-liquidLava text-blancoHueso"} w-full p-2 rounded hover:bg-ligthPurple transition-colors`}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
