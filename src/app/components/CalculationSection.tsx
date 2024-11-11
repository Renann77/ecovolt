import fundo from '../../../public/img/fundocal.webp';

import Image from 'next/image';

export default function AutomaticCalculations() {
  return (
    <div className="relative h-[400px] bg-gray-900 bg-opacity-50">
      {/* Imagem de fundo */}
      <Image
        src={fundo} // Certifique-se de que a imagem está na pasta public
        alt="Cálculos Automáticos"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Conteúdo sobreposto */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-black bg-opacity-70 p-8 rounded-lg max-w-xl text-center">
          <h2 className="text-white text-3xl font-semibold mb-4">Calculos Automaticos</h2>
          <p className="text-gray-200">
            Nós fornecemos um sistema completo de alta qualidade, que inclui ferramentas avançadas para ilustrar e calcular a energia produzida.
            Através de análises precisas e simulações, nosso sistema leva em conta variáveis como o clima local e outros fatores ambientais,
            proporcionando uma estimativa realista da geração de energia. Usamos essas informações para otimizar o desempenho do sistema,
            garantindo que nossos clientes possam monitorar e entender de forma eficiente o quanto estão economizando e contribuindo para um futuro sustentável.
          </p>
        </div>
      </div>
    </div>
  );
}
