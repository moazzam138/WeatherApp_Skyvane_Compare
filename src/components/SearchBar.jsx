export default function SearchBar({ input, setInput, onSearch, onGeoLocation }) {
  return (
    <form onSubmit={onSearch} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search city..."
        className="flex-1 bg-white/25 backdrop-blur-sm border border-white/40 text-white placeholder-white/60 rounded-full px-5 py-3 text-sm outline-none focus:bg-white/35 focus:border-white/60 transition-all"
      />
      <button
        type="submit"
        className="bg-white/30 hover:bg-white/40 border border-white/40 text-white rounded-full px-5 py-3 text-sm font-semibold transition-all"
      >
        Search
      </button>
      <button
        type="button"
        onClick={onGeoLocation}
        className="bg-white/20 hover:bg-white/30 border border-white/30 text-white rounded-full px-4 py-3 text-lg transition-all"
        title="Use my location"
      >
        📍
      </button>
    </form>
  );
}