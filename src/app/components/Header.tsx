import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/img/logo.png';

const Header = () => (
  <header className="flex justify-between items-center bg-teal-600 text-white p-4">
    <div className="flex items-center space-x-2">
      <Image src={logo} alt="EcoVolt Logo" width={40} height={40} /> {/* Adjust width and height as needed */}
      <h1 className="text-xl font-bold">EcoVolt</h1>
    </div>
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link href="/control-panel" className="hover:underline">Controle do Painel</Link>
        </li>
        <li>
          <Link href="/monitoring" className="hover:underline">Monitoramento</Link>
        </li>
      </ul>
    </nav>
    <div>
      <Link href="/login" className="text-lg hover:underline">Login</Link>
    </div>
  </header>
);

export default Header;
