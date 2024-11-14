import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Importando ícones de redes sociais e e-mail

export default function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-8">
      <div className="container mx-auto text-center px-6">
        {/* Título e descrição */}
        <h2 className="text-3xl font-bold mb-4 text-teal-50">EcoVolt</h2>
        <p className="text-gray-200 mb-6 text-lg">
          Projeto desenvolvido para proporcionar soluções sustentáveis e automáticas para o monitoramento de energia solar.
        </p>

        {/* Redes Sociais */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
            <FaTwitter size={30} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition-colors">
            <FaInstagram size={30} />
          </a>
        </div>

        {/* Seção de Contato */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Entre em Contato</h3>
          <p className="text-lg text-gray-200 mb-4">
            Estamos aqui para ajudar! Se tiver alguma dúvida ou sugestão, entre em contato com nossa equipe.
          </p>
          <div className="flex justify-center items-center space-x-3">
            <FaEnvelope size={20} className="text-gray-300" />
            <a href="mailto:support@ecovolt.com" className="text-gray-300 hover:text-white transition-colors text-lg">
              support@ecovolt.com
            </a>
          </div>
        </div>

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

        {/* Direitos autorais */}
        <p className="text-sm text-gray-300">&copy; 2024 EcoVolt. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
  