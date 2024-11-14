"use client";

import React, { useEffect, useState } from 'react';
import ChatBotComponente from '../components/ChatBot';
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';
import { FaRobot, FaArrowLeft } from 'react-icons/fa'; 

export default function ChatBot() {
  const [isVisible, setIsVisible] = useState(false);

  // Adiciona um pequeno delay para ativar a animação após o componente ser montado
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Cabecalho />

      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 p-8 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out">
      
        {/* Frase com animação de fade-in e deslizamento */}
        <div 
          className={`flex items-center space-x-2 mb-6 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}
        >
          <FaRobot size={30} className="text-teal-600" />
          <h1 className="text-3xl font-semibold text-teal-600">Olá eu sou a Sol ☀️, em que posso ajudar?</h1>
        </div>
        
        <ChatBotComponente />

        {/* Botão de retorno com ícone */}
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            <FaArrowLeft size={20} className="mr-2" />
            Voltar para a Página Inicial
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
