"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cabecalho from "../components/Header";
import Footer from "../components/Footer";

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState({
        nome: "",
        email: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");

    return (
        <>
            <Cabecalho />
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 p-8">
                <h1 className="text-4xl font-bold text-teal-700 text-center mb-6">
                    Bem-vindo(a)!
                </h1>

                {error ? (
                    <div className="text-center text-red-600 font-semibold">{error}</div>
                ) : (
                    <>
                        <p className="text-lg text-gray-700 text-center mb-10">
                            Aqui você pode acessar suas informações e aproveitar ao máximo o EcoVolt.
                        </p>

                        {/* Ações ou informações disponíveis */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div
                                onClick={() => router.push("/monitoramento")}
                                className="cursor-pointer bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                            >
                                <h2 className="text-2xl font-semibold text-teal-700">Painéis Solares</h2>
                                <p className="text-gray-600 mt-2">
                                    Visualize e monitore seu consumo energético em tempo real.
                                </p>
                                <button className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-all">
                                    Acessar Monitoramento
                                </button>
                            </div>
                            <div
                                onClick={() => router.push("/gastos")}
                                className="cursor-pointer bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                            >
                                <h2 className="text-2xl font-semibold text-teal-700">Financeiro</h2>
                                <p className="text-gray-600 mt-2">
                                    Simule seus custos e veja os benefícios econômicos.
                                </p>
                                <button className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-all">
                                    Acessar Financeiro
                                </button>
                            </div>
                            <div
                                onClick={() => router.push("/sobre")}
                                className="cursor-pointer bg-white shadow-md rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
                            >
                                <h2 className="text-2xl font-semibold text-teal-700">Sobre</h2>
                                <p className="text-gray-600 mt-2">
                                    Saiba mais sobre a EcoVolt e sua missão.
                                </p>
                                <button className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-all">
                                    Saiba Mais
                                </button>
                            </div>
                        </div>

                        {/* Informações do Usuário */}
                        {!isLoading && (
                            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-12">
                                <h2 className="text-3xl font-semibold text-teal-700 mb-6">
                                    Informações do Usuário
                                </h2>
                                <p className="text-gray-700 text-lg mb-4">
                                    <strong>E-mail:</strong> {user.email}
                                </p>
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300"
                                        />
                                        <div className="flex justify-end space-x-4">
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
                                            >
                                                Salvar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-700 text-lg">
                                            <strong>Nome:</strong> {user.nome}
                                        </p>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
                                        >
                                            Editar Nome
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}
