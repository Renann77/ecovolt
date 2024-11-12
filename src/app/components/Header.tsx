import Link from 'next/link';
import Image from 'next/image';
import { FaHome, FaSolarPanel, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';
import logo from '../../../public/img/logo.png';

const Cabecalho = () => (
  <header className="flex flex-col items-center bg-teal-600 text-white py-6 shadow-md">
    {/* Logo centralizada com destaque */}
    <div className="flex flex-col items-center space-y-2 transform hover:scale-110 transition-transform duration-500">
      <Image src={logo} alt="EcoVolt Logo" width={100} height={100} className="drop-shadow-lg" />
      <h1 className="text-3xl font-extrabold hover:text-green-300 transition-colors duration-300">EcoVolt</h1>
    </div>
    
    {/* Navegação posicionada abaixo da logo com espaçamento */}
    <nav className="mt-4">
      <ul className="flex space-x-8">
        <li>
          <Link href="/" className="text-lg flex items-center text-white hover:text-green-300 transition-all duration-300">
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link href="/controle-painel" className="text-lg flex items-center text-white hover:text-green-300 transition-all duration-300">
            <FaSolarPanel className="mr-2" /> Controle do Painel
          </Link>
        </li>

        <li>
          <Link href="/sobre" className="text-lg flex items-center text-white hover:text-green-300 transition-all duration-300">
            <FaSolarPanel className="mr-2" /> Sobre Nós
          </Link>
        </li>



        <li>
          <Link href="/monitoramento" className="text-lg flex items-center text-white hover:text-green-300 transition-all duration-300">
            <FaChartLine className="mr-2" /> Monitoramento
          </Link>
        </li>
        <li>
          <Link href="/gastos" className="text-lg flex items-center text-white hover:text-green-300 transition-all duration-300">
            <FaMoneyBillWave className="mr-2" /> Financeiro
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Cabecalho;
