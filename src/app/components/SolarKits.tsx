import casa1 from '../../../public/img/casa1.jpg';
import casa2 from '../../../public/img/casa2.jpg';
import casa3 from '../../../public/img/casa3.jpg';

import Image from 'next/image';

const kits = [
  {
    title: 'Off Grid',
    description: '"Off Grid" significa operar de forma independente da rede elétrica, utilizando fontes renováveis como energia solar.',
    imageUrl: casa1, // Imagem associada a este item
  },
  {
    title: 'On Grid',
    description: 'Refere-se a sistemas de energia que estão conectados à rede elétrica pública. Isso permite que a energia gerada seja integrada.',
    imageUrl: casa2, // Imagem associada a este item
  },
  {
    title: 'Híbrido',
    description: 'Refere-se a sistemas de energia que combinam o uso de fontes renováveis, com a conexão à rede pública.',
    imageUrl: casa3, // Imagem associada a este item
  },
];

export default function SolarKits() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-semibold text-center mb-6">Kits Solares</h2>
      <p className="text-center text-gray-600 mb-10">
        Kits solares completos, prontos para instalação. Podem ser usados para complementar
        residências conectadas à rede elétrica, e nosso aplicativo, tornando uma casa
        totalmente autossustentável ou uma combinação de ambos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {kits.map((kit, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative w-full h-56">
              <Image src={kit.imageUrl} alt={kit.title} layout="fill" objectFit="cover" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{kit.title}</h3>
              <p className="text-gray-700 mb-4">{kit.description}</p>
              <a
                href="#"
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                Ver Produtos →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
