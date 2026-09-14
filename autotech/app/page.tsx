import Image from "next/image";
import CategoriesSection from "./components/CategoriesSection";
import Sidebar from "./components/Sidebar";
import FeaturedArticles from "./components/FeaturedArticles";
import PopularTools from "./components/PopularTools";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 grid lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0">
              <Image
                src="/hero-carro.png"
                alt="Carro esportivo em oficina"
                fill
                className="object-cover opacity-60"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative px-8 py-20 md:px-12 md:py-24">
              <p className="text-orange-500 text-xs font-semibold tracking-widest">
                CONHECIMENTO QUE MANTÉM SEU CARRO EM MOVIMENTO
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                Tudo sobre o seu carro,
                <br />
                <span className="text-orange-500">em um só lugar</span>
              </h1>
              <p className="mt-6 text-gray-300 max-w-xl">
                Dicas, tutoriais, diagnósticos, manutenções, comparativos e muito
                mais para você cuidar do seu veículo com segurança e economia.
              </p>

              <div className="mt-10 flex items-center bg-white rounded-lg overflow-hidden max-w-2xl shadow-xl">
  <span className="pl-5 text-gray-500 text-lg">🔍</span>
  <input
    type="text"
    placeholder="Ex: código OBD2, troca de óleo, freio, suspensão..."
    className="flex-1 px-4 py-4 text-black outline-none text-sm"
  />
  <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold px-8 py-4 transition">
    Buscar
  </button>
</div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Mecânica", "OBD2", "Freios", "Óleo", "Suspensão", "Pintura", "Diagnóstico"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="bg-white/10 hover:bg-orange-500 hover:text-black text-gray-300 text-xs px-3 py-1.5 rounded-full transition"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </section>

          <CategoriesSection />
          <FeaturedArticles />
          <PopularTools />
        </div>

        <div className="lg:col-span-1">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}