export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold shadow-lg">
            ⚡
          </div>

          <div>
            <h1 className="text-white font-bold text-2xl">
              ObjectionAI
            </h1>

            <p className="text-slate-400 text-sm">
              AI-powered objection intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-emerald-300 text-sm">
              AI Online
            </span>
          </div>

          <button className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-medium shadow-lg hover:scale-105 transition">
            Demo Mode
          </button>

        </div>
      </div>
    </header>
  );
}