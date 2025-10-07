export default function ABPills() {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <div className="relative w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
        A
        <img
          src="/images/ai-a.png"
          alt="AI A"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none rounded-full"
        />
      </div>
      <div className="relative w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
        B
        <img
          src="/images/ai-b.png"
          alt="AI B"
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none rounded-full"
        />
      </div>
    </div>
  );
}
