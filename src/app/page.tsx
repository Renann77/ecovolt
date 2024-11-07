import ChatbotSection from './components/ChatBotSection';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SolarEnergySection from './components/SolarEnergy';


const Home = () => (
  <>
    
    <title>EcoVolt App</title>


    <section  className="bg-[url('../../public/img/Background.png')] bg-cover bg-center h-screen" >
  {/* Seção principal */}
        <Header />
        <HeroSection />

    </section>

    <section> 
{/* seção de energia solar */}
    <SolarEnergySection/>

    </section>



    <section>
      {/* Seção de chatbot / Duvidas  */}


      <ChatbotSection/>

    </section>



  </>
);

export default Home;
