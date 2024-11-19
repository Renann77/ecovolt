"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/img/logo.png"; 

export default function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = "http://localhost:8080/api/usuarios"; // API de java .

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário.");
      }

      setFormData({ nome: "", email: "" });
      setSuccessMessage("Usuário cadastrado com sucesso!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao cadastrar usuário. Tente novamente.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50 to-teal-100">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
       
        <div className="flex justify-center mb-6">
          <Image src={logo} alt="EcoVolt Logo" width={100} height={100} />
        </div>

      
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-6">
          Cadastro de Usuário
        </h1>

       
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <div>
            <label
              htmlFor="nome"
              className="block text-gray-700 font-medium mb-1"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="Digite seu nome"
              required
            />
          </div>

          
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
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              placeholder="Digite seu email"
              required
            />
          </div>

       
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-2 rounded-md shadow hover:bg-teal-700 transition-all"
          >
            Cadastrar
          </button>
        </form>

        
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
      </div>
    </div>
  );
}
