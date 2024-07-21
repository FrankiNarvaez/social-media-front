"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validations/loginSchema";
import { z } from "zod";
import Link from "next/link";
import { useLoginMutation } from "@/redux/services/authApi";



// The type of the form inputs is inferred from the schema
type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const { loginToken, login } = useAuth();

  // useForm hook with zodResolver to validate the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });


  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodeToken = JSON.parse(token);
      console.log(decodeToken);
    } else {
      console.log("No hay cookie");
    }
  }, []);

  // Llama al hook aquí
  const [loginn, { isLoading, error, isSuccess }] = useLoginMutation();
  console.log("loginn:", loginn);

  // Función de manejo del envío del formulario
  const onSubmit =async  (data:LoginFormInputs) => {
    try {
      // Llama a la mutación de login
      const result = await loginn(data); // `unwrap` maneja la promesa para obtener los datos directamente
      const { accessToken } = result.data;
      localStorage.setItem("token", JSON.stringify(accessToken));
      
      console.log(localStorage.getItem("token"));

      console.log('Login successful:', result);
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (

    <main className="flex bg-darkVoid sm:bg-slateGray w-full min-h-screen">
      <div className="contenedor-login bg-darkVoid w-96 rounded-3xl pt-5 pb-5 pl-5 pr-5 m-auto">
        <h1 className="text-center  text-blancoHueso text-4xl">Nexo</h1>
        <form
          id="loginForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-4 mx-4"
        >
          <label htmlFor="email" className="text-blancoHueso text-sm mb-1">
            Email
          </label>
          <input
            className="rounded-md bg-slateGray h-10 text-blancoHueso p-4"
            type="email"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
          <label
            htmlFor="password"
            className="text-blancoHueso text-sm mb-1 mt-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
            className="rounded-md bg-slateGray h-10 text-blancoHueso p-4"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <button
            type="submit"
            className="text-blancoHueso bg-liquidLava rounded-md mt-2 h-10"
          >
            Login
          </button>
        </form>
        <p className="mt-5 text-center text-xs text-blancoHueso">
          Don’t have an account?
          <Link href="/register">
            <strong>Sign up</strong>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
