export default function Footer() {
    return (
      <footer className="bg-teal-600 text-white py-8">
        <div className="container mx-auto text-center">
          {/* Título e descrição */}
          <h2 className="text-xl font-bold mb-4">EcoVolt</h2>
          <p className="text-gray-200 mb-6">
            Projeto desenvolvido para proporcionar soluções sustentáveis e automáticas para o monitoramento de energia solar.
          </p>
  
          {/* Nomes e RMs */}
          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="font-semibold">Renan Dorneles</p>
              <p className="text-sm">RM557820</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Igor Dias Barrocal</p>
              <p className="text-sm">RM555217</p>
            </div>

            <div className="text-center">
              <p className="font-semibold">João Victor Michaeli</p>
              <p className="text-sm">RM555678</p>
            </div>
          </div>
  
          {/* Links de navegação */}
          <nav className="mb-4">
            <ul className="flex justify-center space-x-4">
              <li>
                <a href="#" className="hover:text-green-300 transition-colors">Home</a>
              </li>
              <li>
                <a href="#kits-solares" className="hover:text-green-300 transition-colors">Kits Solares</a>
              </li>
              <li>
                <a href="#calculations" className="hover:text-green-300 transition-colors">Cálculos Automáticos</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-300 transition-colors">Contato</a>
              </li>
            </ul>
          </nav>
  
          {/* Direitos autorais */}
          <p className="text-sm text-gray-300">&copy; 2024 EcoVolt. Todos os direitos reservados.</p>
        </div>
      </footer>
    );
  }
  