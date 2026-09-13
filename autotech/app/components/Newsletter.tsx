export default function Newsletter() {
  return (
    <aside className="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📩</span>
        <h3 className="text-white font-bold text-sm">
          Receba novidades em primeira mão!
        </h3>
      </div>

      <p className="text-gray-500 text-xs mb-4">
        Dicas, lançamentos e conteúdos exclusivos no seu e-mail.
      </p>

      <form className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Seu e-mail"
          className="bg-gray-950 border border-gray-800 focus:border-orange-500 outline-none text-white text-xs px-3 py-2.5 rounded-lg transition"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs py-2.5 rounded-lg transition"
        >
          Inscrever-se
        </button>
      </form>
    </aside>
  );
}