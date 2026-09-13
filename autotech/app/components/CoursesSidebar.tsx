export default function CoursesSidebar() {
  return (
    <aside className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 mt-6 overflow-hidden">
      <div className="absolute -right-4 -top-4 text-7xl opacity-20 select-none">
        🎓
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎓</span>
          <h3 className="text-black font-bold text-base leading-tight">
            Aprenda
            <br />
            com os melhores
          </h3>
        </div>

        <p className="text-black/80 text-xs leading-relaxed">
          Cursos, tutoriais e treinamentos para você se tornar um especialista.
        </p>

        <a
          href="/cursos"
          className="inline-block mt-4 bg-black hover:bg-gray-900 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition"
        >
          Ver Cursos →
        </a>
      </div>
    </aside>
  );
}