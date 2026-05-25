import { useState, useEffect, useCallback } from "react";
import WeatherSection from "./components/WeatherSection";
import { weatherBg } from "./constants/weatherBg";
import { weatherIcons } from "./constants/weatherIcons";
import { days } from "./constants/days";

const apiKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export default function WeatherApp() {

  const [city1, setCity1] = useState("Delhi");
  const [city2, setCity2] = useState("Mumbai");

  const [input1, setInput1] = useState("Delhi");
  const [input2, setInput2] = useState("Mumbai");

  const [weather1, setWeather1] = useState(null);
  const [weather2, setWeather2] = useState(null);

  const [forecast1, setForecast1] = useState(null);
  const [forecast2, setForecast2] = useState(null);

  const [hourly1, setHourly1] = useState(null);
  const [hourly2, setHourly2] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [unit, setUnit] = useState("metric");


  const fetchWeather = useCallback(
    async (
      cityName,
      setWeatherData,
      setForecastData,
      setHourlyData
    ) => {

      if (!cityName.trim()) return;

      setLoading(true);
      setError("");

      try {

        const [currentRes, forecastRes] = await Promise.all([
          fetch(
            `${BASE_URL}/weather?q=${encodeURIComponent(
              cityName
            )}&appid=${apiKey}&units=${unit}`
          ),

          fetch(
            `${BASE_URL}/forecast?q=${encodeURIComponent(
              cityName
            )}&appid=${apiKey}&units=${unit}`
          ),
        ]);

        if (!currentRes.ok) {
          const errData = await currentRes.json();
          throw new Error(errData.message || "City not found");
        }

        const [currentData, forecastData] = await Promise.all([
          currentRes.json(),
          forecastRes.json(),
        ]);


        setWeatherData(currentData);


        const dailyMap = {};

        forecastData.list.forEach((item) => {

          const date = new Date(item.dt * 1000);

          const key = date.toDateString();

          if (!dailyMap[key]) {
            dailyMap[key] = {
              items: [],
              date,
            };
          }

          dailyMap[key].items.push(item);
        });

        const dailyForecast = Object.values(dailyMap)
          .slice(1, 6)
          .map(({ items, date }) => {

            const temps = items.map((i) => i.main.temp);

            const noon =
              items.find(
                (i) =>
                  new Date(i.dt * 1000).getHours() === 12
              ) || items[0];

            return {
              day: days[date.getDay()],

              icon:
                weatherIcons[noon.weather[0].icon] || "🌡️",

              high: Math.round(Math.max(...temps)),

              low: Math.round(Math.min(...temps)),
            };
          });

        setForecastData(dailyForecast);


        const hourlyData = forecastData.list
          .slice(0, 8)
          .map((item) => {

            const date = new Date(item.dt * 1000);

            const hr = date.getHours();

            const ampm = hr >= 12 ? "PM" : "AM";

            const hour =
              hr % 12 === 0 ? 12 : hr % 12;

            return {
              time: `${hour}${ampm}`,

              icon:
                weatherIcons[item.weather[0].icon] ||
                "🌡️",

              temp: Math.round(item.main.temp),
            };
          });

        setHourlyData(hourlyData);

      } catch (err) {

        setError(err.message || "Something went wrong");

      } finally {

        setLoading(false);
      }
    },
    [unit]
  );


  useEffect(() => {

    fetchWeather(
      city1,
      setWeather1,
      setForecast1,
      setHourly1
    );

    fetchWeather(
      city2,
      setWeather2,
      setForecast2,
      setHourly2
    );

  }, [city1, city2, unit, fetchWeather]);


  const handleCompare = (e) => {

    e.preventDefault();

    if (input1.trim() && input2.trim()) {

      setCity1(input1.trim());

      setCity2(input2.trim());
    }
  };


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 font-sans relative overflow-hidden"
    >

  
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <h1
            className="text-white font-bold text-5xl tracking-tight drop-shadow-lg"
          >
            🌤 Skyvane Compare
          </h1>

          <button
            onClick={() =>
              setUnit(
                unit === "metric"
                  ? "imperial"
                  : "metric"
              )
            }
            className="bg-white/20 hover:bg-white/30
            border border-white/30 text-white text-sm
            font-semibold px-4 py-2 rounded-full
            transition-all duration-200"
          >
            {unit === "metric"
              ? "Switch to °F"
              : "Switch to °C"}
          </button>
        </div>


        <form
          onSubmit={handleCompare}
          className="grid grid-cols-1
          md:grid-cols-[1fr_1fr_auto]
          gap-3"
        >

        
          <input
            type="text"
            value={input1}
            onChange={(e) =>
              setInput1(e.target.value)
            }
            placeholder="First city..."
            className="bg-white/20 backdrop-blur-md
            border border-white/30 text-white
            placeholder-white/60 rounded-full
            px-5 py-3 outline-none
            focus:bg-white/30 transition-all"
          />

      
          <input
            type="text"
            value={input2}
            onChange={(e) =>
              setInput2(e.target.value)
            }
            placeholder="Second city..."
            className="bg-white/20 backdrop-blur-md
            border border-white/30 text-white
            placeholder-white/60 rounded-full
            px-5 py-3 outline-none
            focus:bg-white/30 transition-all"
          />

          
          <button
            type="submit"
            className="bg-white/20 hover:bg-white/30
            border border-white/30 text-white
            rounded-full px-6 py-3 font-semibold
            transition-all"
          >
            Compare
          </button>
        </form>

        

        {error && (
          <div
            className="bg-red-500/30 border
            border-red-300/50 text-white
            rounded-2xl px-5 py-3 text-sm"
          >
            ⚠️ {error}
          </div>
        )}


        {loading && (
          <div className="flex items-center justify-center py-16">
            <div
              className="w-12 h-12 border-4
              border-white/30 border-t-white
              rounded-full animate-spin"
            />
          </div>
        )}


        {!loading && (
          <div
            className="grid grid-cols-1
            xl:grid-cols-2 gap-6"
          >

      
            <WeatherSection
              weather={weather1}
              forecast={forecast1}
              hourly={hourly1}
              unit={unit}
            />

           
            <WeatherSection
              weather={weather2}
              forecast={forecast2}
              hourly={hourly2}
              unit={unit}
            />

          </div>
        )}


        <p className="text-white/80 text-sm text-center mt-4">
          Compare real-time weather conditions of two cities ·
          Data by OpenWeatherMap
        </p>

      </div>
    </div>
  );
}