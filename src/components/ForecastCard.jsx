export default function ForecastCard({ day, icon, high, low }) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 flex flex-col items-center gap-2 border border-white/20 hover:bg-white/25 transition-all duration-200">
      <span className="text-white/80 text-sm font-medium">{day}</span>
      <span className="text-3xl">{icon}</span>
      <div className="text-center">
        <p className="text-white font-bold text-sm">{high}°</p>
        <p className="text-white/60 text-sm">{low}°</p>
      </div>
    </div>
  );
}