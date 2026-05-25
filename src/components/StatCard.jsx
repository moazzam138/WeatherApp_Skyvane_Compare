export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex flex-col gap-1 border border-white/30">
      <span className="text-2xl">{icon}</span>
      <span className="text-white/70 text-xs font-medium uppercase tracking-wider">{label}</span>
      <span className="text-white font-semibold text-lg">{value}</span>
    </div>
  );
}