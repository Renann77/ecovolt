// pages/monitoramento.tsx

"use client";
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';

export default function Monitoramento() {
    return (
        <>
            <Cabecalho />
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-teal-50 to-teal-100 text-gray-800 p-8">
                <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">Configuração do Monitoramento</h1>
                <p className="text-lg text-center text-gray-700 max-w-3xl mb-10">
                    Configure as opções para iniciar o monitoramento do seu sistema de energia solar.
                    Aqui você pode definir parâmetros e começar a monitorar o desempenho do seu sistema em tempo real.
                </p>

                <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-teal-700 mb-4">Configurações do Sistema</h2>
                    <p className="text-gray-600 mb-6">Selecione as opções para personalizar o monitoramento.</p>

                    <div className="text-left">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Frequência de Monitoramento
                        </label>
                        <select className="w-full p-3 border border-teal-500 rounded-lg mb-6">
                            <option value="1h">1 Hora</option>
                            <option value="6h">6 Horas</option>
                            <option value="24h">24 Horas</option>
                        </select>

                        <label className="block text-lg font-semibold text-gray-700 mb-2">
                            Tipo de Notificação
                        </label>
                        <select className="w-full p-3 border border-teal-500 rounded-lg mb-6">
                            <option value="email">E-mail</option>
                            <option value="sms">SMS</option>
                            <option value="app">Notificação no App</option>
                        </select>

                        <button className="bg-teal-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-teal-600 transition-transform transform hover:scale-105">
                            Iniciar Monitoramento
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
