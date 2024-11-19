"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/img/logo.png";
import Cabecalho from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();

    const API_URL = "http://localhost:8080/api/login"; // API REST em Java

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Erro ao fazer login.");
                return;
            }

            const data = await response.json();
            console.log("Usuário autenticado:", data);

            // Redirecionar para o painel ou home após login
            router.push("/painel");
        } catch (error) {
            console.error("Erro durante o login:", error);
            setErrorMessage("Erro ao conectar com o servidor.");
        }
    };

    return (
        <>
        <Cabecalho/>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 via-teal-300 to-teal-100">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
                    {/* Logo e Título */}
                    <div className="flex flex-col items-center mb-6">
                        <Image
                            src={logo}
                            alt="EcoVolt Logo"
                            width={120}
                            height={120}
                            className="drop-shadow-md"
                        />
                        <h1 className="text-3xl font-bold text-teal-700 mt-4">
                            Bem-vindo ao EcoVolt
                        </h1>
                    </div>

                    {/* Formulário de Login */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Campo de E-mail */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-black"
                                placeholder="Digite seu e-mail"
                            />
                        </div>

                        {/* Campo de Senha */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Senha
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-black"
                                placeholder="Digite sua senha"
                            />
                        </div>

                        {/* Botão de Login */}
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Entrar
                        </button>
                    </form>

                    {/* Mensagem de Erro */}
                    {errorMessage && (
                        <div className="mt-4 text-center text-red-600 font-semibold">
                            {errorMessage}
                        </div>
                    )}

                    {/* Links de Ajuda */}
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => router.push("/")}
                            className="text-teal-600 hover:text-teal-800 font-semibold transition-all underline"
                        >
                            Voltar ao Menu
                        </button>
                        <p className="mt-2 text-sm text-gray-600">
                            Não tem uma conta?{" "}
                            <a
                                href="/cadastro"
                                className="text-teal-600 hover:text-teal-800 font-semibold transition duration-300 underline"
                            >
                                Cadastre-se
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}
