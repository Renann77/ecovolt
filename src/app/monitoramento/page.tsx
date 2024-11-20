"use client";
import {  useState, ReactElement } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';
import { FaSolarPanel, FaChartLine, FaSave, FaFilePdf } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Types
interface Highlight {
    icon: ReactElement;
    title: string;
    description: string;
}

interface WeatherData {
    main: { temp: number };
    clouds: { all: number };
}

interface Location {
    lat: number;
    lng: number;
}

const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
};

const googleMapsApiKey = "AIzaSyBkOTiygTyz8iro-ZSRd3Bi835SGlubvXg";

export default function PainelMonitoramento() {
    const [energyGenerated, setEnergyGenerated] = useState<number | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const highlights: Highlight[] = [
        {
            icon: <FaSolarPanel className="text-teal-600 text-5xl" />,
            title: "Monitoramento em Tempo Real",
            description: "Visualize a geração e o consumo de energia solar em tempo real.",
        },
        {
            icon: <FaChartLine className="text-teal-600 text-5xl" />,
            title: "Análise de Dados Históricos",
            description: "Acompanhe o histórico de desempenho e visualize padrões de uso.",
        },
        {
            icon: <FaSave className="text-teal-600 text-5xl" />,
            title: "Economia de Energia e Redução de CO₂",
            description: "Monitore o quanto você está economizando em energia e ajudando o meio ambiente.",
        },
    ];

    const fetchWeatherData = async (lat: number, lon: number): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch(`${api.base}weather?lat=${lat}&lon=${lon}&appid=${api.key}&units=${api.units}&lang=${api.lang}`);
            if (!response.ok) throw new Error("Erro ao buscar dados climáticos.");
            const weatherData: WeatherData = await response.json();

            const energy = calculateEnergy(weatherData.main.temp, weatherData.clouds.all);
            setEnergyGenerated(energy);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    const calculateEnergy = (temperature: number, cloudiness: number): number => {
        const sunlightIntensity = Math.max(0, (100 - cloudiness) / 100);
        const baseProduction = 5;
        const temperatureFactor = temperature > 20 ? 1.2 : 0.8;
        return baseProduction * sunlightIntensity * temperatureFactor;
    };

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedLocation({ lat, lng });
            fetchWeatherData(lat, lng);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Relatório de Monitoramento Solar", 10, 10);
        doc.text(`Energia Gerada: ${energyGenerated?.toFixed(2)} kWh`, 10, 20);
        doc.text(`Data do Relatório: ${new Date().toLocaleDateString()}`, 10, 30);
        doc.save("relatorio_solar.pdf");
    };

    const energyData = {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
            {
                label: "Consumo de Energia (kWh)",
                data: [4.3, 5.1, 4.8, 4.7, 5.0, 4.2, 4.5],
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                type: "line" as const,
            },
        ],
    };

    const temperatureData = {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        datasets: [
            {
                label: "Temperatura (°C)",
                data: [22, 23, 21, 20, 19, 24, 23],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    // Dados de projeção de energia por estação do ano
    const seasonalEnergyData = {
        labels: ["Verão", "Outono", "Inverno", "Primavera"],
        datasets: [
            {
                label: "Projeção de Energia Armazenada (kWh)",
                data: [600, 450, 300, 500],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Cabecalho />
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 p-8">
                <h1 className="text-4xl font-bold text-center text-teal-700 mb-6">Monitoramento de Painéis Solares</h1>
                <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-10">
                    Clique em um local no mapa para visualizar a quantidade estimada de energia solar que seria gerada naquela região.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {highlights.map((highlight, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center transition-transform transform hover:scale-105">
                            {highlight.icon}
                            <h2 className="text-2xl font-semibold text-teal-700 mt-4">{highlight.title}</h2>
                            <p className="text-gray-600 mt-2">{highlight.description}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Mapa de Localização</h2>
                    <LoadScript googleMapsApiKey={googleMapsApiKey}>
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '400px' }}
                            center={{ lat: -23.55052, lng: -46.633308 }}
                            zoom={5}
                            onClick={handleMapClick}
                        >
                            {selectedLocation && (
                                <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>

                {selectedLocation && (
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12 text-center">
                        <h2 className="text-3xl font-semibold text-teal-700 mb-6">Energia Gerada na Região Selecionada</h2>
                        {energyGenerated !== null ? (
                            <>
                                <p className="text-4xl font-bold text-teal-800">{energyGenerated.toFixed(2)} kWh</p>
                                <p className="text-gray-600 mt-2">Estimativa de energia gerada com base nas condições climáticas atuais.</p>
                            </>
                        ) : (
                            <p className="text-gray-600">Carregando dados...</p>
                        )}
                    </div>
                )}

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Gráfico de Consumo de Energia</h2>
                    <Line data={energyData} />
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Temperatura e Desempenho</h2>
                    <Bar data={temperatureData} />
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">Projeção de Energia Armazenada por Estação</h2>
                    <Bar data={seasonalEnergyData} />
                </div>

                <div className="text-center">
                    <button
                        onClick={generatePDF}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <FaFilePdf className="mr-2" /> Baixar Relatório PDF
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
}
