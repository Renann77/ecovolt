"use client";

import { LoginType } from "../../types";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../../public/img/logo.png";
import Cabecalho from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
    const navigate = useRouter();

    const [dados, setDados] = useState<LoginType>({
        email: "",
        senha: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDados({
            ...dados,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/cadastro/login/${dados.email}/${dados.senha}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: dados.email,
                    senha: dados.senha,
                }),
            });
    
            if (response.ok) {
                const usuario = await response.json();
                setDados(usuario);
                navigate.push(`/sobre`);
            } else {
                const errorText = await response.text();
                console.error(`Erro ao fazer login: ${response.status} - ${errorText}`);
                if (response.status === 400 || response.status === 404) {
                    alert("Email ou Senha Inválidos!");
                    navigate.push("/login");
                } else {
                    alert(`ERRO AO FAZER O LOGIN! Tente novamente. Erro: ${errorText}`);
                    navigate.push("/login");
                }
            }
        } catch (error) {
            console.error(`Erro ao fazer login: ${error}`);
            alert(`Erro ao fazer o login: ${error}`);
            navigate.push("/login");
        }
    };
    
    const [errorMessage, ] = useState<string | null>(null);
    const router = useRouter();

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
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                        {/* Campo de E-mail */}
                        <div>
                            <label htmlFor="idEmail" className="block text-sm font-medium text-gray-700">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="idEmail"
                                onChange={(e) => handleChange(e)}
                                value={dados.email}
                                required
                                className="mt-2 block w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm text-black"
                                placeholder="Digite seu e-mail"
                            />
                        </div>

                        {/* Campo de Senha */}
                        <div>
                            <label htmlFor="idSenha" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                type="password"
                                name="senha"
                                id="idSenha"
                                onChange={(e) => handleChange(e)}
                                value={dados.senha}
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