"use client";
import { useState } from "react";
import Cabecalho from "../components/Header";
import Footer from "../components/Footer";
import { FaMoneyBillWave, FaClock,  FaChartLine,  FaStar,  } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import Image from "next/image";
import { FaHandHoldingUsd, FaGavel, FaLeaf } from "react-icons/fa";

const financialData = [
    {
        type: "Off Grid",
        cost: 15000,
        energySavings: 300,
        monthlyRevenue: 300 * 0.5,
        investmentTime: 5,
        payback: 3.5,
        storageCapacity: 500,
        imageUrl: "/img/ongrid.jpg",
    },
    {
        type: "On Grid",
        cost: 12000,
        energySavings: 250,
        monthlyRevenue: 250 * 0.5,
        investmentTime: 4,
        payback: 3,
        storageCapacity: 400,
        imageUrl: "/img/offgrid.jpg",
    },
    {
        type: "Híbrido",
        cost: 20000,
        energySavings: 400,
        monthlyRevenue: 400 * 0.5,
        investmentTime: 6,
        payback: 4,
        storageCapacity: 600,
        imageUrl: "/img/hibrido.jpg",
    },
];

export default function FinancialPage() {
    const [selectedPanel, setSelectedPanel] = useState(financialData[0]);
    const [monthlyConsumption, setMonthlyConsumption] = useState(0);
    const [estimatedSavings, setEstimatedSavings] = useState<number | null>(null);
    const [comments, setComments] = useState<{ name: string; stars: number; message: string }[]>([]);
    const [newComment, setNewComment] = useState<{ name: string; stars: number; message: string }>({
        name: "",
        stars: 0,
        message: "",
    });

    const handlePanelSelection = (panel: typeof financialData[0]) => {
        setSelectedPanel(panel);
    };

    const handleConsumptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMonthlyConsumption(value);
        calculateSavings(value);
    };

    const calculateSavings = (consumption: number) => {
        const savings = consumption * 0.5;
        setEstimatedSavings(savings);
    };

    const handleCommentSubmit = () => {
        if (newComment.name && newComment.message && newComment.stars > 0) {
            setComments([...comments, newComment]);
            setNewComment({ name: "", stars: 0, message: "" });
        }
    };

    return (
        <>
            <Cabecalho />
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 p-8">
                <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">Análise Financeira e Avaliações</h1>
                <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
                    Avalie os custos, tempo de investimento, armazenamento de energia e payback dos diferentes sistemas de energia solar, além de deixar ou visualizar avaliações de outros usuários.
                </p>

                {/* Painéis Solares */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {financialData.map((panel) => (
                        <div
                            key={panel.type}
                            onClick={() => handlePanelSelection(panel)}
                            className="cursor-pointer bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105"
                        >
                            <Image 
                                src={panel.imageUrl} 
                                alt={`${panel.type} Panel`} 
                                width={300} 
                                height={200} 
                                className="object-cover rounded-lg mx-auto mb-4" 
                            />
                            <h2 className="text-2xl font-semibold text-teal-700 mb-2">{panel.type}</h2>
                            <div className="text-gray-600 mb-2">
                                <FaMoneyBillWave className="inline-block mr-2" /> Custo: R${panel.cost.toLocaleString()}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <FaChartLine className="inline-block mr-2" /> Economia mensal: {panel.energySavings} kWh
                            </div>
                            <div className="text-gray-600 mb-2">
                                <GiPayMoney className="inline-block mr-2" /> Receita mensal: R${panel.monthlyRevenue.toFixed(2)}
                            </div>
                            <div className="text-gray-600 mb-2">
                                <FaClock className="inline-block mr-2" /> Payback: {panel.payback} anos
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">
                Incentivos e Subsídios para Energia Solar
            </h2>
            <p className="text-gray-700 text-lg mb-8 text-center">
                Descubra como reduzir os custos de instalação de sistemas de energia solar com incentivos oferecidos por governos e instituições. Aproveite os benefícios financeiros e contribua para a preservação do meio ambiente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Benefício 1 */}
                <div className="flex flex-col items-center bg-gradient-to-b from-teal-50 to-teal-100 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                    <FaHandHoldingUsd className="text-5xl text-teal-600 mb-4" />
                    <h3 className="text-xl font-bold text-teal-700 mb-2">
                        Benefícios Fiscais
                    </h3>
                    <p className="text-gray-600">
                        Reduza seus impostos ao instalar sistemas de energia solar, graças aos incentivos fiscais oferecidos por programas governamentais.
                    </p>
                </div>
                {/* Benefício 2 */}
                <div className="flex flex-col items-center bg-gradient-to-b from-teal-50 to-teal-100 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                    <FaGavel className="text-5xl text-teal-600 mb-4" />
                    <h3 className="text-xl font-bold text-teal-700 mb-2">
                        Financiamento Facilitado
                    </h3>
                    <p className="text-gray-600">
                        Instituições financeiras oferecem crédito com taxas de juros reduzidas para quem deseja investir em energia solar.
                    </p>
                </div>
                {/* Benefício 3 */}
                <div className="flex flex-col items-center bg-gradient-to-b from-teal-50 to-teal-100 rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                    <FaLeaf className="text-5xl text-teal-600 mb-4" />
                    <h3 className="text-xl font-bold text-teal-700 mb-2">
                        Programas Sustentáveis
                    </h3>
                    <p className="text-gray-600">
                        Participe de programas sustentáveis que promovem a adoção de tecnologias limpas e oferecem suporte técnico e financeiro.
                    </p>
                </div>
            </div>
        </div>

                {/* Simulador de Economia */}
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Simulador de Economia</h2>
                    <p className="text-center text-gray-600 mb-4">
                        Insira seu consumo mensal de energia para estimar a economia que você pode obter com um painel solar.
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        <input
                            type="number"
                            placeholder="Consumo mensal em kWh"
                            value={monthlyConsumption}
                            onChange={handleConsumptionChange}
                            className="p-2 border border-gray-300 rounded-lg text-gray-700 text-center"
                        />
                        {estimatedSavings !== null && (
                            <div className="text-lg text-gray-700">
                                Economia estimada: <span className="font-semibold">R${estimatedSavings.toFixed(2)}</span> por mês
                            </div>
                        )}
                    </div>
                </div>

                {/* Comentários e Avaliações */}
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Comentários e Avaliações</h2>

                    {/* Formulário de Comentários */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Seu Nome"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-gray-700"
                        />
                        <textarea
                            placeholder="Escreva seu comentário"
                            value={newComment.message}
                            onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-gray-700"
                        />
                        <div className="flex items-center mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`cursor-pointer ${
                                        newComment.stars >= star ? "text-yellow-400" : "text-gray-300"
                                    }`}
                                    onClick={() => setNewComment({ ...newComment, stars: star })}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleCommentSubmit}
                            className="w-full bg-teal-600 text-white font-bold py-2 rounded-md hover:bg-teal-700 transition-all"
                        >
                            Enviar Comentário
                        </button>
                    </div>

                    {/* Lista de Comentários */}
                    {comments.length > 0 ? (
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 p-4 rounded-lg shadow flex flex-col space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-teal-700">{comment.name}</h3>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`${
                                                        comment.stars >= star ? "text-yellow-400" : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700">{comment.message}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
