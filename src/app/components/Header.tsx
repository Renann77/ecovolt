import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/img/logo.png';

const Cabecalho = () => (
  <header className="flex flex-col items-center bg-teal-600 text-white py-6 shadow-md">
    {/* Logo centralizada com destaque */}
    <div className="flex flex-col items-center space-y-2 transform hover:scale-110 transition-transform duration-500">
      <Image src={logo} alt="EcoVolt Logo" width={80} height={80} className="drop-shadow-lg" />
      <h1 className="text-3xl font-extrabold hover:text-green-300 transition-colors duration-300">EcoVolt</h1>
    </div>
    
    {/* Navegação posicionada abaixo da logo com espaçamento */}
    <nav className="mt-4">
      <ul className="flex space-x-8">
        <li>
          <Link href="/" className="text-lg text-white hover:text-green-300 transition-all duration-300">Home</Link>
        </li>
        <li>
          <Link href="/controle-painel" className="text-lg text-white hover:text-green-300 transition-all duration-300">Controle do Painel</Link>
        </li>
        <li>
          <Link href="/monitoramento" className="text-lg text-white hover:text-green-300 transition-all duration-300">Monitoramento</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Cabecalho;
