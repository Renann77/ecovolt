"use client";
import { useState } from 'react';
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';
import { FaMoneyBillWave, FaClock, FaBatteryHalf, FaChartLine } from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi';
import Image from 'next/image';

// Dados de exemplo dos painéis solares com imagens e informações adicionais
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

    const handlePanelSelection = (panel: typeof financialData[0]) => {
        setSelectedPanel(panel);
    };

    const handleConsumptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setMonthlyConsumption(value);
        calculateSavings(value);
    };

    const calculateSavings = (consumption: number) => {
        const savings = consumption * 0.5; // Exemplo de economia mensal com base no consumo
        setEstimatedSavings(savings);
    };

    return (
        <>
            <Cabecalho />
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 p-8">
                <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">Análise Financeira dos Painéis Solares</h1>
                <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
                    Avalie os custos, tempo de investimento, armazenamento de energia e payback dos diferentes sistemas de energia solar.
                </p>

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
                                className="object-cover rounded-lg mb-4" 
                            />
                            <h2 className="text-2xl font-semibold text-teal-700 mb-2">{panel.type}</h2>
                            <div className="flex justify-center items-center gap-2 text-gray-600 mb-2">
                                <FaMoneyBillWave /> <span>Custo: R${panel.cost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-gray-600 mb-2">
                                <FaChartLine /> <span>Economia mensal: {panel.energySavings} kWh</span>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-gray-600 mb-2">
                                <GiPayMoney /> <span>Receita mensal: R${panel.monthlyRevenue.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-gray-600 mb-2">
                                <FaClock /> <span>Tempo de investimento: {panel.investmentTime} anos</span>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-gray-600 mb-2">
                                <FaBatteryHalf /> <span>Armazenamento: {panel.storageCapacity} kWh</span>
                            </div>
                            <div className="flex justify-center items-center gap-2 text-gray-600">
                                <FaClock /> <span>Payback: {panel.payback} anos</span>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedPanel && (
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
                        <h2 className="text-3xl font-semibold text-teal-700 mb-6">
                            Detalhes do {selectedPanel.type}
                        </h2>
                        <Image 
                            src={selectedPanel.imageUrl} 
                            alt={`${selectedPanel.type} Panel`} 
                            width={600} 
                            height={400} 
                            className="object-cover rounded-lg mb-6" 
                        />
                        <div className="flex justify-center items-center gap-3 text-gray-700 text-lg mb-4">
                            <FaMoneyBillWave /> <span>Investimento Inicial: R${selectedPanel.cost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-center items-center gap-3 text-gray-700 text-lg mb-4">
                            <FaChartLine /> <span>Economia Mensal de Energia: {selectedPanel.energySavings} kWh</span>
                        </div>
                        <div className="flex justify-center items-center gap-3 text-gray-700 text-lg mb-4">
                            <GiPayMoney /> <span>Receita Mensal Estimada: R${selectedPanel.monthlyRevenue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-center items-center gap-3 text-gray-700 text-lg mb-4">
                            <FaClock /> <span>Tempo de Investimento: {selectedPanel.investmentTime} anos</span>
                        </div>
                        <div className="flex justify-center items-center gap-3 text-gray-700 text-lg mb-4">
                            <FaBatteryHalf /> <span>Capacidade de Armazenamento: {selectedPanel.storageCapacity} kWh</span>
                        </div>
                        <div className="flex justify-center items-center gap-3 text-gray-700 text-lg">
                            <FaClock /> <span>Payback Estimado: {selectedPanel.payback} anos</span>
                        </div>
                    </div>
                )}

                {/* Simulação de Economia */}
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
                            className="p-2 border rounded-lg text-gray-700 text-center"
                        />
                        {estimatedSavings !== null && (
                            <div className="text-lg text-gray-700">
                                Economia estimada: R${estimatedSavings.toFixed(2)} por mês
                            </div>
                        )}
                    </div>
                </div>

                {/* Informações sobre Incentivos e Subsídios */}
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Incentivos e Subsídios</h2>
                    <p className="text-gray-700">
                        Saiba mais sobre incentivos e subsídios disponíveis para a instalação de sistemas de energia solar. Muitos governos oferecem benefícios fiscais, financiamento facilitado e outros incentivos para promover a utilização de energia limpa.
                        <br />
                        Verifique os programas específicos de sua região e aproveite os benefícios disponíveis para reduzir os custos de instalação e acelerar o retorno do investimento.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}