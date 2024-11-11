"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';
import jsPDF from 'jspdf';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sunnyBackground = "url('/img/fundoclima4.webp')";
const rainyBackground = "url('/img/climafundo2.webp')";
const clearBackground = "url('/img/climafundo1.webp')";

const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
};

interface WeatherData {
    name: string;
    sys: { country: string };
    main: { temp: number; temp_min: number; temp_max: number };
    weather: { description: string; icon: string }[];
    clouds: { all: number };
}

interface ForecastData {
    dt_txt: string;
    main: { temp: number };
    clouds: { all: number };
    weather: { description: string; icon: string }[];
}

export default function WeatherApp() {
    const [city, setCity] = useState<string>("");
    const [temperature, setTemperature] = useState<number>(0);
    const [weatherDescription, setWeatherDescription] = useState<string>("");
    const [energyGenerated, setEnergyGenerated] = useState<number>(0);
    const [co2Savings, setCo2Savings] = useState<string>("");
    const [weeklyForecast, setWeeklyForecast] = useState<{ day: string; energy: number }[]>([]);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setPosition, showError);
        } else {
            alert('Navegador não suporta geolocalização');
        }

        function setPosition(position: GeolocationPosition) {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            coordResults(lat, long);
        }

        function showError(error: GeolocationPositionError) {
            alert(`Erro: ${error.message}`);
        }
    }, []);

    const coordResults = async (lat: number, long: number) => {
        try {
            const response = await fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`);
            if (!response.ok) throw new Error(`Erro HTTP: status ${response.status}`);
            const data: WeatherData = await response.json();
            displayResults(data);
            fetchWeeklyForecast(lat, long);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const searchResults = async (city: string) => {
        try {
            const response = await fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`);
            if (!response.ok) throw new Error(`Erro HTTP: status ${response.status}`);
            const data: WeatherData = await response.json();
            displayResults(data);

            const { lat, lon } = await fetchLatLon(city);
            fetchWeeklyForecast(lat, lon);
        } catch (error: any) {
            alert(error.message);
        }
    };

    const fetchLatLon = async (city: string) => {
        const response = await fetch(`${api.base}weather?q=${city}&appid=${api.key}`);
        const data = await response.json();
        return {
            lat: data.coord.lat,
            lon: data.coord.lon,
        };
    };

    const fetchWeeklyForecast = async (lat: number, long: number) => {
        try {
            const response = await fetch(`${api.base}forecast?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`);
            const forecastData = await response.json();
            processWeeklyForecast(forecastData.list);
        } catch (error: any) {
            console.error("Erro ao buscar previsão semanal:", error);
        }
    };

    const processWeeklyForecast = (forecast: ForecastData[]) => {
        const dailyEnergy: { [key: string]: number[] } = {};
        forecast.forEach((item) => {
            const date = new Date(item.dt_txt).toLocaleDateString('pt-BR', { weekday: 'short' });
            const energy = calculateDailyEnergy(item.main.temp, item.clouds.all);

            if (dailyEnergy[date]) {
                dailyEnergy[date].push(energy);
            } else {
                dailyEnergy[date] = [energy];
            }
        });

        const weeklyData = Object.keys(dailyEnergy).map((day) => ({
            day,
            energy: parseFloat((dailyEnergy[day].reduce((a, b) => a + b) / dailyEnergy[day].length).toFixed(2)),
        }));
        setWeeklyForecast(weeklyData);
    };

    const calculateDailyEnergy = (temperature: number, cloudiness: number) => {
        const sunlightIntensity = Math.max(0, (100 - cloudiness) / 100);
        const baseProduction = 5;
        const temperatureFactor = temperature > 20 ? 1.2 : 0.8;
        return baseProduction * sunlightIntensity * temperatureFactor;
    };

    const displayResults = (weather: WeatherData) => {
        setCity(`${weather.name}, ${weather.sys.country}`);
        setTemperature(Math.round(weather.main.temp));
        const weatherDesc = weather.weather[0].description;
        setWeatherDescription(weatherDesc);
        const dailyEnergy = calculateDailyEnergy(weather.main.temp, weather.clouds.all);
        setEnergyGenerated(dailyEnergy);

        const co2PerKWh = 0.5;
        const co2SavingsValue = (dailyEnergy * co2PerKWh).toFixed(2);
        setCo2Savings(co2SavingsValue);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Relatório Climático e de Energia", 10, 10);

        doc.setFontSize(12);
        doc.text(`Cidade: ${city}`, 10, 30);
        doc.text(`Temperatura Atual: ${temperature}°C`, 10, 40);
        doc.text(`Descrição do Clima: ${weatherDescription}`, 10, 50);
        doc.text(`Energia Gerada: ${energyGenerated} kWh`, 10, 60);
        doc.text(`Economia de CO₂: ${co2Savings} kg`, 10, 70);

        weeklyForecast.forEach((day, index) => {
            doc.text(`${day.day}: ${day.energy} kWh`, 10, 80 + index * 10);
        });

        doc.save("Relatorio_Clima_Energia_Semanal.pdf");
    };

    const backgroundImage = weatherDescription.includes("chuva") || weatherDescription.includes("chuvoso")
        ? rainyBackground
        : weatherDescription.includes("limpo")
        ? clearBackground
        : sunnyBackground;

    const data = {
        labels: weeklyForecast.map(item => item.day),
        datasets: [
            {
                label: 'Energia Gerada (kWh)',
                data: weeklyForecast.map(item => item.energy),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search) {
            searchResults(search);
            setSearch("");
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <Cabecalho />
            <div
                className="min-h-screen flex flex-col items-center justify-between text-gray-800 p-6"
                style={{
                    backgroundImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transition: "background-image 0.5s ease-in-out"
                }}
            >
                <div className="w-full max-w-lg bg-white bg-opacity-80 rounded-xl shadow-2xl p-8 transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-xl">
                    <h1 className="text-3xl font-extrabold text-center mb-8 text-teal-700 drop-shadow-md">
                        Consulta Climática
                    </h1>

                    <form onSubmit={handleSearch} className="flex items-center mb-8">
                        <input
                            type="text"
                            placeholder="Digite uma cidade..."
                            value={search}
                            onChange={handleInputChange}
                            className="form-control w-full p-3 border border-teal-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                        />
                        <button
                            type="submit"
                            className="btn p-3 bg-teal-600 text-white font-semibold rounded-r-lg hover:bg-teal-700 transition-all transform hover:scale-105"
                        >
                            Buscar
                        </button>
                    </form>

                    <div className="text-center">
                        <div className="city text-2xl font-semibold mb-2 text-gray-800 drop-shadow-sm">
                            {city}
                        </div>
                        <div className="weather text-lg font-medium text-gray-700 mb-2">
                            {weatherDescription}
                        </div>
                        <div className="container-temp text-5xl font-extrabold mb-4 text-teal-700">
                            <span>{temperature}</span>°C
                        </div>

                        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Previsão Semanal de Energia</h2>
                        <Line data={data} />

                        <div className="mt-8 bg-teal-50 p-6 rounded-lg shadow-inner">
                            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Consumo de Energia Estimado</h2>
                            <p className="text-3xl font-bold text-teal-800">{energyGenerated} kWh</p>
                            <p className="text-gray-600 mt-2">Economia de CO₂: {co2Savings} kg</p>
                        </div>

                        <button
                            onClick={generatePDF}
                            className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
                        >
                            Gerar Relatório em PDF
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
