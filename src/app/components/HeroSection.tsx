"use client"
import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="flex flex-col items-center text-center bg-cover bg-center py-32 transition-transform transform shadow-2xl relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.jpg')",
        transform: isVisible ? 'scale(1)' : 'scale(1.05)',
        transition: 'transform 1.2s ease-out',
      }}
    >
      {/* Gradiente escuro para melhorar a legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-40"></div>

      <h2
        className={`text-5xl font-bold text-white relative transition-opacity duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        EcoVolt App
      </h2>
      <p
        className={`mt-4 text-lg text-white relative transition-opacity duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        Nós da EcoVolt fornecemos um aplicativo para usuários que possuem
        painéis solares em suas residências.
      </p>
      <div className="mt-8 space-x-4 relative">
        <button className="bg-white border border-green-500 text-green-600 font-semibold px-6 py-3 rounded-md transition-all transform hover:scale-110 hover:shadow-2xl hover:bg-green-500 hover:text-white">
          Cadastro
        </button>
        <button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-md transition-all transform hover:scale-110 hover:shadow-2xl hover:bg-green-600">
          Login
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
