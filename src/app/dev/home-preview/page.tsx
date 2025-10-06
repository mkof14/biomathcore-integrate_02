export default function HomePreview() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
          BioMath <span className="text-sky-400">Core</span>
        </h1>
        <p className="mt-4 text-center text-slate-300 max-w-2xl mx-auto">
          Precision insights for your health and performance.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold">180+</div>
            <div className="text-xs text-slate-400 mt-1">Partners</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold">3M+</div>
            <div className="text-xs text-slate-400 mt-1">Data points</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-xs text-slate-400 mt-1">Accuracy</div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-xs text-slate-400 mt-1">Availability</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-lg font-semibold text-slate-200 mb-4 text-center">
          Our Advantages
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-sm font-semibold">Personalized Insights</div>
            <p className="text-xs text-slate-400 mt-1">
              Tailored recommendations powered by your data.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-sm font-semibold">Secure by Design</div>
            <p className="text-xs text-slate-400 mt-1">
              Encryption and privacy from day one.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-sm font-semibold">Fast Insights</div>
            <p className="text-xs text-slate-400 mt-1">
              From ingestion to answers in minutes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="text-sm font-semibold">Human + AI</div>
            <p className="text-xs text-slate-400 mt-1">
              Blend of expert knowledge and models.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
