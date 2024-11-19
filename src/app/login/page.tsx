"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { LoginProps } from "../../types";
import logo from "../../../public/img/logo.png";

export default function Login() {
    const [formData, setFormData] = useState<LoginProps>({
        email: "",
        password: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Dados de Login:", formData);
        // Lógica para login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <Image src={logo} alt="EcoVolt Logo" width={100} height={100} />
                    <h1 className="text-2xl font-semibold text-teal-700 mt-2">EcoVolt</h1>
                </div>

                {/* Formulário de Login */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            placeholder="Digite seu e-mail"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
                    >
                        Entrar
                    </button>
                </form>

                {/* Links de ajuda */}
                <div className="mt-4 text-center">
                    <a
                        href="#"
                        className="text-sm text-teal-600 hover:text-teal-800 transition duration-300"
                    >
                        Esqueceu sua senha?
                    </a>
                    <p className="mt-2 text-sm text-gray-600">
                        Não tem uma conta?{" "}
                        <a
                            href="/cadastro"
                            className="text-teal-600 hover:text-teal-800 font-semibold transition duration-300"
                        >
                            Cadastre-se
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
