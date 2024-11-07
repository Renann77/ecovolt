import Image from 'next/image';
import Link from 'next/link';
import eolic from '../../../public/img/eolic.png';

const ChatbotSection = () => (
  <section className="flex flex-col md:flex-row items-center justify-between bg-green-100 p-8 md:p-16 rounded-lg transition-all duration-500">
    
    {/* Texto com animação de fade-in */}
    <div className="md:w-1/2 space-y-4 text-left opacity-0 transition-opacity duration-1000 delay-300 hover:opacity-100">
      <h2 className="text-3xl font-semibold text-gray-900">
        Você possui alguma dúvida?
      </h2>
      <p className="text-gray-700">
        Entre em contato com nosso chatbot especializado em dúvidas
      </p>
      <ul>
        <li>
          <Link href="/chatbot" className="inline-block px-6 py-3 mt-4 bg-yellow-400 text-white font-medium rounded-md shadow hover:bg-yellow-500 transition duration-200 transform hover:scale-105">
            CHATBOT
          </Link>
        </li>
      </ul>
    </div>

    {/* Imagem com efeito de zoom suave */}
    <div className="relative md:w-1/2 mt-8 md:mt-0 flex justify-center hover:scale-105 transition-transform duration-500">
      <div className="w-[300px] h-[200px] md:w-[400px] md:h-[300px]">
        <Image
          src={eolic} 
          alt="Turbinas eólicas e árvores"
          layout="responsive"
          className="rounded-lg"
        />
      </div>
    </div>
  </section>
);

export default ChatbotSection;
