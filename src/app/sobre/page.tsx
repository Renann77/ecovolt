"use client";
import { useState, useEffect } from 'react';
import { GiSunflower } from 'react-icons/gi';
import { FaLeaf, FaWater, FaSeedling, FaGlobeAmericas, FaLinkedin, FaGithub } from 'react-icons/fa';
import Cabecalho from '../components/Header';
import Footer from '../components/Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';

export default function SobreProjeto() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const participants = [
        {
            name: "Renan Dorneles",
            imageUrl: "/img/renan.jpg",
            rm: "RM557820",
            linkedin: "https://www.linkedin.com/in/renan-dorneles-boucault-47b8652a5/",
            github: "https://github.com/Renann77"
        },
        {
            name: "Igor Dias Barrocal",
            imageUrl: "/img/igor.jpg",
            rm: "RM555217",
            linkedin: "https://www.linkedin.com/in/igor-dias-barrocal-b7a7a82ba",
            github: "https://github.com/igorbarrocal"
        },
        {
            name: "João Victor Michaeli",
            imageUrl: "/img/joao.jpg",
            rm: "RM555678",
            linkedin: "https://www.linkedin.com/in/joaomichaeli/",
            github: "https://github.com/JoaoMichaeli"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <>
            <Cabecalho />
            <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 p-8 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out">
                
                <div className={`transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    
                    {/* Sobre a EcoVolt */}
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10 space-y-8 text-gray-700 leading-relaxed mb-10">
                        <h1 className="text-2xl font-semibold text-teal-700 text-center">Sobre a EcoVolt</h1>
                        <p>
                            Na EcoVolt, nossa missão é capacitar as pessoas a adotarem fontes de energia limpa e sustentável, contribuindo para um futuro mais verde e autossuficiente. Com um foco na inovação e na sustentabilidade, desenvolvemos soluções acessíveis e inteligentes para usuários residenciais e empresariais que desejam aproveitar o poder da energia solar. Nossos produtos são projetados para maximizar a eficiência energética, reduzir custos e minimizar o impacto ambiental, promovendo a autossuficiência e a economia de recursos.
                        </p>
                        <p>
                            Nosso compromisso vai além da tecnologia: queremos educar e inspirar a sociedade a fazer escolhas conscientes, alinhadas com o bem-estar do planeta e das futuras gerações. Acreditamos que a energia solar é o caminho para um amanhã mais sustentável, e nossa equipe está sempre empenhada em fornecer o suporte e a orientação necessários para que nossos clientes alcancem seus objetivos de sustentabilidade.
                        </p>
                    </div>

                    {/* Benefícios dos painéis solares */}
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10 space-y-8 text-gray-700 leading-relaxed">
                        <h1 className="text-4xl font-bold text-teal-700 mb-8 text-center">Por que usar Painéis Solares?</h1>
                        
                        <div className="flex items-center space-x-4">
                            <FaLeaf className="text-green-500 text-3xl" />
                            <h2 className="text-2xl font-semibold text-teal-700">Benefícios para o Meio Ambiente</h2>
                        </div>
                        <p>
                            Os painéis solares são uma fonte de energia limpa e renovável, reduzindo a dependência de combustíveis fósseis e diminuindo a emissão de gases de efeito estufa. Ao optar pela energia solar, você contribui para a preservação dos recursos naturais e ajuda a combater o aquecimento global.
                        </p>

                        <div className="flex items-center space-x-4">
                            <FaWater className="text-blue-500 text-3xl" />
                            <h2 className="text-2xl font-semibold text-teal-700">Economia de Recursos Hídricos</h2>
                        </div>
                        <p>
                            A energia solar requer pouca água para a manutenção, ao contrário das usinas que consomem grandes quantidades de água. Em regiões onde a escassez de água é um problema, a energia solar é uma excelente alternativa para evitar o consumo excessivo de recursos hídricos.
                        </p>

                        <div className="flex items-center space-x-4">
                            <FaSeedling className="text-green-600 text-3xl" />
                            <h2 className="text-2xl font-semibold text-teal-700">Impacto Econômico Positivo</h2>
                        </div>
                        <p>
                            Ao instalar um sistema de energia solar, você não só reduz sua conta de energia, mas também investe em um recurso que proporciona retorno financeiro a longo prazo. Com o tempo, os custos de instalação são recuperados, e você continua a economizar. Além disso, a valorização da propriedade é um benefício adicional.
                        </p>

                        <div className="flex items-center space-x-4">
                            <GiSunflower className="text-yellow-600 text-3xl" />
                            <h2 className="text-2xl font-semibold text-teal-700">Sustentabilidade e Autossuficiência</h2>
                        </div>
                        <p>
                            Com um sistema de energia solar, é possível alcançar a autossuficiência energética. Isso significa que você depende menos de fornecedores externos e pode produzir sua própria energia. Essa independência proporciona estabilidade e segurança energética, além de uma maior autonomia.
                        </p>

                        <div className="flex items-center space-x-4">
                            <FaGlobeAmericas className="text-teal-500 text-3xl" />
                            <h2 className="text-2xl font-semibold text-teal-700">Redução da Pegada de Carbono</h2>
                        </div>
                        <p>
                            A transição para a energia solar contribui para a redução da pegada de carbono, diminuindo o impacto ambiental das atividades humanas. Ao adotar essa tecnologia, você ajuda a criar um futuro mais sustentável e diminui a poluição e a degradação ambiental.
                        </p>
                    </div>

                    {/* Quem Somos? com Carrossel */}
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10 space-y-8 text-gray-700 leading-relaxed mb-10">
                        <h1 className="text-2xl font-semibold text-teal-700 text-center">Quem Somos?</h1>
                        <p>
                            Somos estudantes de Análise e Desenvolvimento de Sistemas da FIAP. Estamos no projeto da Global Solution, onde nossa solução para energia limpa é resolver problemas enfrentados por usuários que possuem placas solares em suas residências.
                        </p>
                        <p>
                            Para aqueles que ainda não possuem, oferecemos conscientização sobre os benefícios da energia solar e ajudamos na transição para um estilo de vida mais sustentável, focado em melhorar o meio ambiente e criar um mundo melhor para todos.
                        </p>
                    </div>

                    <Slider {...settings}>
                        {participants.map((participant, index) => (
                            <div key={index} className="text-center p-4">
                                <Image
                                    src={participant.imageUrl}
                                    alt={participant.name}
                                    width={128} // largura da imagem
                                    height={128} // altura da imagem
                                    className="mx-auto w-32 h-32 rounded-full mb-4 object-cover shadow-lg"
                                />
                                <h2 className="text-xl font-semibold text-teal-700">{participant.name}</h2>
                                <p className="text-gray-600">{participant.rm}</p>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <a href={participant.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="text-blue-600 text-2xl hover:text-blue-800" />
                                    </a>
                                    <a href={participant.github} target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="text-gray-800 text-2xl hover:text-black" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <Footer />
        </>
    );
}
