export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-800 bg-slate-950">
      <div className="p-5">
        <h2 className="text-slate-400 text-xs uppercase tracking-wider mb-4">
          Recent Objections
        </h2>

        <div className="space-y-2">
          <div className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 cursor-pointer">
            Price objection
          </div>

          <div className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 cursor-pointer">
            Trust objection
          </div>

          <div className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 cursor-pointer">
            Timing objection
          </div>
        </div>
      </div>
    </aside>
  );
}