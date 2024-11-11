
import AutomaticCalculations from './components/CalculationSection';
import ChatbotSection from './components/ChatBotSection';
import Footer from './components/Footer';
import Cabecalho from './components/Header';
import HeroSection from './components/HeroSection';
import SolarEnergySection from './components/SolarEnergy';
import SolarKits from './components/SolarKits';


const Home = () => (
  <>
    
    <title>EcoVolt App</title>


    <section  className="bg-[url('../../public/img/Background.png')] bg-cover bg-center h-screen" >   {/* Seção principal */}
    

        <Cabecalho />
        <HeroSection />

    </section>

    <section> {/* seção de energia solar */}



    <SolarEnergySection/>

    </section>



    <section>    {/* Seção de chatbot / Duvidas  */}


      <ChatbotSection/>

    </section>


  <section className='secao'>
  
    <SolarKits/>

  </section>


  <section>
   
   <AutomaticCalculations/>
    
  </section>




    <Footer/>




  </>
);

export default Home;
