import StatCard from "./StatCard";
import ForecastCard from "./ForecastCard";
import HourlyCard from "./HourlyCard";
import { weatherIcons } from "../constants/weatherIcons";

export default function WeatherSection({
  weather,
  forecast,
  hourly,
  unit,
}) {
  if (!weather) return null;

  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <div className="flex flex-col gap-5">

      {/* Main Card */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border border-white/30 shadow-xl">

        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-white text-3xl font-bold">
              {weather.name}, {weather.sys.country}
            </h2>

            <p className="text-white/80 text-sm mt-1 capitalize">
              {weather.weather[0].description}
            </p>

            <p className="text-white/70 text-xs mt-1">
              Feels like {Math.round(weather.main.feels_like)}
              {unitSymbol}
            </p>
          </div>

          <div className="text-right">
            <div className="text-7xl leading-none">
              {weatherIcons[weather.weather[0].icon] || "🌡️"}
            </div>

            <p className="text-white font-bold text-4xl mt-2">
              {Math.round(weather.main.temp)}
              {unitSymbol}
            </p>

            <p className="text-white/70 text-xs">
              H: {Math.round(weather.main.temp_max)}
              {unitSymbol}
              {" · "}
              L: {Math.round(weather.main.temp_min)}
              {unitSymbol}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <StatCard
            icon="💧"
            label="Humidity"
            value={`${weather.main.humidity}%`}
          />

          <StatCard
            icon="💨"
            label="Wind"
            value={`${Math.round(weather.wind.speed)} ${windUnit}`}
          />

          <StatCard
            icon="🌡️"
            label="Pressure"
            value={`${weather.main.pressure} hPa`}
          />

          <StatCard
            icon="👁️"
            label="Visibility"
            value={`${(weather.visibility / 1000).toFixed(1)} km`}
          />
        </div>

        {/* Sunrise Sunset */}
        <div className="flex gap-3 mt-3">

          <div className="flex-1 bg-white/10 rounded-2xl p-3 flex items-center gap-3 border border-white/20">
            <span className="text-2xl">🌅</span>

            <div>
              <p className="text-white/70 text-xs">Sunrise</p>

              <p className="text-white font-semibold text-sm">
                {new Date(
                  weather.sys.sunrise * 1000
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white/10 rounded-2xl p-3 flex items-center gap-3 border border-white/20">
            <span className="text-2xl">🌇</span>

            <div>
              <p className="text-white/70 text-xs">Sunset</p>

              <p className="text-white font-semibold text-sm">
                {new Date(
                  weather.sys.sunset * 1000
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Hourly Forecast */}
      {hourly && (
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-5 border border-white/25">
          <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4">
            Hourly Forecast
          </h3>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {hourly.map((h, i) => (
              <HourlyCard key={i} {...h} />
            ))}
          </div>
        </div>
      )}

      {/* 5 Day Forecast */}
      {forecast && (
        <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-5 border border-white/25">
          <h3 className="text-white/80 text-sm font-semibold uppercase tracking-wider mb-4">
            5-Day Forecast
          </h3>

          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, i) => (
              <ForecastCard key={i} {...day} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}