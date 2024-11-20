"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClienteType } from "../../types";
import Cabecalho from "../components/Header";
import Footer from "../components/Footer";
import logo from "../../../public/img/logo.png";

export default function CadastroPage() {
  const navigate = useRouter();

  const [cliente, setCliente] = useState<ClienteType>({
    idCadastro: 0,
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cabecalho = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente),
    };
  
    try {
      const response = await fetch("http://localhost:8080/cadastro", cabecalho);
  
      if (response.ok) {
        alert(`${cliente.email} cadastrado com sucesso!`);
        setCliente({
          idCadastro: 0,
          email: "",
          senha: "",
        });
        navigate.push("/");
      } else if (response.status === 409) {
        alert("Já existe uma conta cadastrada com esse e-mail!");
        navigate.push("/login");
      } else {
        alert("Erro ao cadastrar!");
      }
    } catch (erro) {
      console.log("Erro ao cadastrar cliente: ", erro);
    }
  };
  

  return (
    <>
      <Cabecalho />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src={logo} alt="EcoVolt Logo" width={100} height={100} />
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-teal-700 text-center mb-6">
            Cadastro de Usuário
          </h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={cliente.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300 text-black"
                placeholder="Digite seu email"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="senha"
                className="block text-gray-700 font-medium mb-1"
              >
                Senha
              </label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={cliente.senha}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300 text-black"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {/* Botão de Cadastro */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold py-2 rounded-md shadow hover:bg-teal-700 transition-all"
            >
              Cadastrar
            </button>
          </form>

          {/* Mensagens de Sucesso ou Erro */}
          {successMessage && (
            <p className="mt-4 text-center text-green-600 font-medium">
              {successMessage}
            </p>
          )}

          {errorMessage && (
            <p className="mt-4 text-center text-red-600 font-medium">
              {errorMessage}
            </p>
          )}

          {/* Voltar ao Menu */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-teal-600 hover:text-teal-800 font-medium transition-all"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}