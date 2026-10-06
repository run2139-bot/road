"use client";

import { useEffect, useState } from "react";
import { Wind, Thermometer, CloudSun } from "lucide-react";

interface Weather {
  temp: number;
  wind: number;
  code: number;
}

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=35.1796&longitude=129.0756&current=temperature_2m,wind_speed_10m,weather_code&wind_speed_unit=ms&timezone=Asia%2FSeoul";

function describe(code: number) {
  if (code === 0) return "맑음";
  if (code <= 3) return "구름 조금";
  if (code <= 48) return "안개";
  if (code <= 67) return "비";
  if (code <= 77) return "눈";
  if (code <= 82) return "소나기";
  return "뇌우";
}

function windAdvice(w: number) {
  if (w < 4) return { text: "라이딩하기 좋아요", cls: "text-accent" };
  if (w < 8) return { text: "맞바람 주의", cls: "text-yellow-300" };
  return { text: "해안 코스는 피하세요", cls: "text-red-400" };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(API_URL, { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) =>
        setWeather({
          temp: d.current.temperature_2m,
          wind: d.current.wind_speed_10m,
          code: d.current.weather_code,
        }),
      )
      .catch((e) => {
        if (e.name !== "AbortError") setError(true);
      });
    return () => ctrl.abort();
  }, []);

  const advice = weather ? windAdvice(weather.wind) : null;

  return (
    <div className="w-full max-w-sm rounded-2xl border border-primary/30 bg-slate-900/60 p-5 backdrop-blur">
      <p className="mb-3 text-xs font-semibold tracking-widest text-primary">
        TODAY · BUSAN
      </p>
      {error ? (
        <p className="text-sm text-slate-400">날씨 정보를 불러오지 못했어요.</p>
      ) : !weather ? (
        <div className="h-16 animate-pulse rounded-lg bg-slate-800" />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="flex flex-col gap-1">
              <CloudSun className="size-5 text-primary" />
              <span className="font-semibold">{describe(weather.code)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <Thermometer className="size-5 text-primary" />
              <span className="font-semibold">{weather.temp.toFixed(1)}°C</span>
            </div>
            <div className="flex flex-col gap-1">
              <Wind className="size-5 text-primary" />
              <span className="font-semibold">{weather.wind.toFixed(1)} m/s</span>
            </div>
          </div>
          <p className={`mt-3 text-sm font-medium ${advice!.cls}`}>
            {advice!.text}
          </p>
        </>
      )}
    </div>
  );
}
