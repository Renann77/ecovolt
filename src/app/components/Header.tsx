import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/img/logo.png';
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => (
  <header className="flex justify-between items-center bg-teal-600 text-white p-4 transition-all duration-500">
    {/* Logo com animação de transição de opacidade */}
    <div className="flex items-center space-x-2 opacity-90 hover:opacity-100 transition-opacity duration-300">
      <Image src={logo} alt="EcoVolt Logo" width={40} height={40} />
      <h1 className="text-xl font-bold hover:scale-105 transition-transform duration-300">EcoVolt</h1>
    </div>
    
    {/* Navegação com transições e animações ao passar o mouse */}
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:underline hover:text-teal-300 transition-all duration-300">Home</Link>
        </li>
        <li>
          <Link href="/control-panel" className="hover:underline hover:text-teal-300 transition-all duration-300">Controle do Painel</Link>
        </li>
        <li>
          <Link href="/monitoring" className="hover:underline hover:text-teal-300 transition-all duration-300">Monitoramento</Link>
        </li>
      </ul>
    </nav>
    
    {/* Link de login com animação */}
    <div>
      <Link href="/login" className="text-lg hover:underline hover:text-teal-300 transition-all duration-300"> <FaRegCircleUser />  </Link>
    </div>
  </header>
);

export default Header;
