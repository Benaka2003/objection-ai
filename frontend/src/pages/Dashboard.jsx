import Navbar from "../layout/Navbar";


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
       

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              What objection did you receive?
            </h1>

            <p className="text-slate-400 mb-8">
              Paste a customer objection and get AI-generated responses.
            </p>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              Input component goes here...
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}