import casa1 from '../../../public/img/casa1.jpg';
import casa2 from '../../../public/img/casa2.jpg';
import casa3 from '../../../public/img/casa3.jpg';


import Image from 'next/image';

const benefits = [
  {
    title: 'Sustentabilidade Ambiental',
    description: 'O uso de painéis solares reduz a dependência de combustíveis fósseis, diminuindo a emissão de gases de efeito estufa e promovendo uma energia limpa e sustentável.',
    imageUrl: casa1, // Imagem associada a este benefício
  },
  {
    title: 'Redução de Custos Energéticos',
    description: 'Com a instalação de painéis solares, é possível reduzir significativamente os custos de energia a longo prazo, especialmente para quem vive em áreas com alto índice de radiação solar.',
    imageUrl: casa2, // Imagem associada a este benefício
  },
  {
    title: 'Baixa Manutenção e Alta Durabilidade',
    description: 'Os sistemas de energia solar têm baixa necessidade de manutenção e são projetados para durar por décadas, tornando-se um investimento duradouro e confiável.',
    imageUrl: casa3, // Imagem associada a este benefício
  },
];

export default function SolarBenefits() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-6">Por que Usar Painéis Solares?</h2>
      <p className="text-center text-gray-600 mb-10">
        Os painéis solares são uma das melhores alternativas para a geração de energia limpa e sustentável. Aqui estão alguns dos principais motivos para escolher essa tecnologia em vez de opções convencionais.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative w-full h-56">
              <Image src={benefit.imageUrl} alt={benefit.title} layout="fill" objectFit="cover" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-700 mb-4">{benefit.description}</p>
              <a
                href="/sobre"
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                Saiba Mais →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
