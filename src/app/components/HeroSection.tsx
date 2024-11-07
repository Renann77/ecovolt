"use client"
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Função para adicionar a animação de fade-in quando a seção aparecer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Delay de 0.3s para iniciar a animação
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="flex flex-col items-center text-center bg-cover bg-center py-16 transition-transform transform"
      style={{
        backgroundImage: "url('/background.jpg')",
        transform: isVisible ? 'scale(1)' : 'scale(1.05)',
        transition: 'transform 1.2s ease-out', // Transição de zoom
      }}
    >
      <h2
        className={`text-4xl font-bold text-gray-800 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        EcoVolt App
      </h2>
      <p
        className={`mt-4 text-lg text-gray-700 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Nós da EcoVolt fornecemos um aplicativo para usuários que possuem
        painéis solares em suas residências.
      </p>
      <div className="mt-6 space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all transform hover:scale-105">
          Cadastro
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-all transform hover:scale-105">
          Login
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
