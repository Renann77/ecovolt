"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';

// URLs das imagens de fundo
// Assegure-se de que estas imagens estejam no diretório correto na pasta `public/img`.
const sunnyBackground = "url('/img/fundoclima4.webp')')";
const rainyBackground = "url('/img/climafundo2.webp')";
const clearBackground = "url('/img/climafundo1.webp')"; // Adicione uma imagem para clima limpo

const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
};

interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
}

export default function WeatherApp() {
    const [city, setCity] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [temperature, setTemperature] = useState<number>(0);
    const [tempUnit, setTempUnit] = useState<string>("°C");
    const [weatherDescription, setWeatherDescription] = useState<string>("");
    const [lowHigh, setLowHigh] = useState<string>("");
    const [icon, setIcon] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [energyGenerated, setEnergyGenerated] = useState<number>(0);

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
            setError(null);
        } catch (error: any) {
            alert(error.message);
            setError("Não foi possível carregar os dados do clima.");
        }
    };

    const searchResults = async (city: string) => {
        try {
            const response = await fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`);
            if (!response.ok) throw new Error(`Erro HTTP: status ${response.status}`);
            const data: WeatherData = await response.json();
            displayResults(data);
            setError(null);
        } catch (error: any) {
            alert(error.message);
            setError("Não foi possível carregar os dados do clima.");
        }
    };

    const displayResults = (weather: WeatherData) => {
        setCity(`${weather.name}, ${weather.sys.country}`);
        setDate(dateBuilder(new Date()));

        const iconName = weather.weather[0].icon;
        setIcon(iconName);

        setTemperature(Math.round(weather.main.temp));
        setTempUnit("°C");

        const weatherDesc = capitalizeFirstLetter(weather.weather[0].description);
        setWeatherDescription(weatherDesc);

        setLowHigh(`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`);

        calculateEnergyGenerated(weather.main.temp, weather.clouds.all);
    };

    const dateBuilder = (d: Date): string => {
        const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();

        return `${day}, ${date} ${month} ${year}`;
    };

    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const changeTemp = () => {
        if (tempUnit === "°C") {
            const f = (temperature * 1.8) + 32;
            setTempUnit("°F");
            setTemperature(Math.round(f));
        } else {
            const c = (temperature - 32) / 1.8;
            setTempUnit("°C");
            setTemperature(Math.round(c));
        }
    };

    const calculateEnergyGenerated = (temperature: number, cloudiness: number) => {
        const sunlightIntensity = Math.max(0, (100 - cloudiness) / 100);
        const baseProduction = 5; 
        const temperatureFactor = temperature > 20 ? 1.2 : 0.8; 

        const energy = baseProduction * sunlightIntensity * temperatureFactor;
        setEnergyGenerated(parseFloat(energy.toFixed(2)));
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

    // Determina o fundo com base na descrição do clima
    const backgroundImage = weatherDescription.includes("chuva") || weatherDescription.includes("chuvoso")
        ? rainyBackground
        : weatherDescription.includes("limpo")
        ? clearBackground
        : sunnyBackground;

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

                    {error && (
                        <p className="text-red-600 text-center font-semibold mb-6">
                            {error}
                        </p>
                    )}

                    <div className="text-center">
                        <div className="city text-2xl font-semibold mb-2 text-gray-800 drop-shadow-sm">
                            {city}
                        </div>
                        <div className="date text-gray-600 mb-4 italic">{date}</div>

                        <div className="container-img mb-4 flex justify-center">
                            {icon && (
                                <img
                                    src={`https://openweathermap.org/img/wn/${icon}.png`}
                                    alt="weather icon"
                                    className="w-24 h-24 drop-shadow-lg animate-pulse"
                                />
                            )}
                        </div>

                        <div
                            className="container-temp text-5xl font-extrabold mb-4 text-teal-700 cursor-pointer hover:scale-110 transition-transform"
                            onClick={changeTemp}
                        >
                            <span>{temperature}</span>
                            <span>{tempUnit}</span>
                        </div>

                        <div className="weather text-lg font-medium text-gray-700 mb-2">
                            {weatherDescription}
                        </div>
                        <div className="low-high text-gray-600 font-light">
                            {lowHigh}
                        </div>

                        {/* Exibição do consumo de energia */}
                        <div className="mt-8 bg-teal-50 p-6 rounded-lg shadow-inner">
                            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Consumo de Energia Estimado</h2>
                            <p className="text-3xl font-bold text-teal-800">{energyGenerated} kWh</p>
                            <p className="text-gray-600 mt-2">Baseado nas condições climáticas atuais.</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
