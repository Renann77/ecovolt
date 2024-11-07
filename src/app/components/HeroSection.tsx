

const HeroSection = () => (
    <section className="flex flex-col items-center text-center bg-cover bg-center py-16"
      style={{ backgroundImage: "url('/background.jpg')" }}> {/* Add the background image */}
      <h2 className="text-4xl font-bold text-gray-800">EcoVolt App</h2>
      <p className="mt-4 text-lg text-gray-700">
        Nós da EcoVolt fornecemos um aplicativo para usuários que possuem painéis solares em suas residências.
      </p>
      <div className="mt-6 space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          Cadastro
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md">
          Login
        </button>
      </div>
    </section>
  );
  
  export default HeroSection;
  