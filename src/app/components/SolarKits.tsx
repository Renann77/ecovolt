import casa1 from "../../../public/img/casa1.jpg";
import casa2 from "../../../public/img/casa2.jpg";
import casa3 from "../../../public/img/casa3.jpg";
import Link from "next/link";
import Image from "next/image";

const benefits = [
  {
    title: "Sustentabilidade Ambiental",
    description:
      "O uso de painéis solares reduz a dependência de combustíveis fósseis, diminuindo a emissão de gases de efeito estufa e promovendo uma energia limpa e sustentável.",
    imageUrl: casa1,
  },
  {
    title: "Redução de Custos Energéticos",
    description:
      "Com a instalação de painéis solares, é possível reduzir significativamente os custos de energia a longo prazo, especialmente para quem vive em áreas com alto índice de radiação solar.",
    imageUrl: casa2,
  },
  {
    title: "Baixa Manutenção e Alta Durabilidade",
    description:
      "Os sistemas de energia solar têm baixa necessidade de manutenção e são projetados para durar por décadas, tornando-se um investimento duradouro e confiável.",
    imageUrl: casa3,
  },
];

export default function SolarKits() {
  return (
    <div className="container mx-auto py-24 px-6 md:px-12 bg-gradient-to-b from-blue-50 to-teal-50 rounded-lg shadow-lg">
      <h2 className="text-5xl font-bold text-center text-teal-700 mb-10">Por que Usar Painéis Solares?</h2>
      <p className="text-center text-gray-700 text-xl max-w-3xl mx-auto mb-16">
        Os painéis solares são uma das melhores alternativas para a geração de energia limpa e sustentável. Aqui estão alguns dos principais motivos para escolher essa tecnologia em vez de opções convencionais.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            
            <div className="relative w-full h-72 group">
              <Image
                src={benefit.imageUrl}
                alt={benefit.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Conteúdo */}
            <div className="p-8">
              <h3 className="text-3xl font-bold text-teal-700 mb-6">{benefit.title}</h3>
              <p className="text-gray-600 text-lg mb-8">{benefit.description}</p>
              <Link href="/sobre" legacyBehavior>
                <a className="inline-block bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all hover:bg-teal-700 hover:shadow-lg text-lg">
                  Saiba Mais
                </a>
              </Link>
            </div>

            
            <div className="absolute top-6 right-6 flex space-x-3">
              <div className="p-3 bg-yellow-300 rounded-full shadow-lg animate-pulse">
                ☀️ 
              </div>
              <div className="p-3 bg-blue-300 rounded-full shadow-lg animate-bounce">
                🌧️ 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
