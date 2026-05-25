export default function HourlyCard({ time, icon, temp }) {
  return (
    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/20 min-w-[72px] flex-shrink-0">
      <span className="text-white/70 text-xs">{time}</span>
      <span className="text-xl">{icon}</span>
      <span className="text-white font-semibold text-sm">{temp}°</span>
    </div>
  );
}