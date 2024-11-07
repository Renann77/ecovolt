import Image from 'next/image';
import painel from '../../../public/img/energiapainel.png';

const SolarEnergySection = () => (
  <section className="flex flex-col md:flex-row items-center p-8 bg-white">
    {/* Text Section */}
    <div className="md:w-1/2 space-y-4">
      <h2 className="text-3xl font-bold text-gray-900">
        A energia solar funciona aproveitando a luz do sol para gerar eletricidade.
      </h2>
      <p className="text-gray-600">
        Nosso objetivo é ajudar nossos clientes a alcançar um futuro sustentável e realmente nos importamos com a qualidade dos produtos que usamos em nossas instalações.
      </p>
      <p className="text-gray-600">
        Tivemos a ideia de melhorar a experiência do cliente que possui placa solar em casa e fornecemos a tecnologia de
      </p>

      <div className="space-y-2 text-green-600 font-medium">
        <p>01 / Colaborar com nossos clientes</p>
        <p>02 / Ajudar o meio ambiente</p>
        <p>03 / Impactos na sociedade</p>
        <p>04 / Serviço tecnológico</p>
      </div>
    </div>

    {/* Image Section */}
    <div className="relative md:w-1/2 mt-8 md:mt-0 flex justify-center">
      {/* Background Image */}
      <div className="relative w-[300px] h-[300px]">
        <Image
          src={painel} // Replace with your image path in the public folder
          alt="Solar energy illustration"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Yellow Overlay Box */}
      <div className="absolute bottom-8 left-8 bg-yellow-400 p-4 rounded-md shadow-md flex items-center space-x-2">
        {/* Replace with an actual icon if needed */}
        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 3a1 1 0 00-1 1v1.27a7.001 7.001 0 00-3.758 12.355 1 1 0 00.707 1.707h7.102a1 1 0 00.707-1.707A7.001 7.001 0 0011 5.27V4a1 1 0 00-1-1zM7 10a1 1 0 011-1h2V7a1 1 0 112 0v2h2a1 1 0 010 2h-2v2a1 1 0 01-2 0v-2H8a1 1 0 01-1-1z" />
        </svg>
        <p className="text-black font-medium">Tecnologia</p>
      </div>
    </div>
  </section>
);

export default SolarEnergySection;
