import { Accessor, createEffect, createSignal, Show } from "solid-js";

export interface WeatherForecastProps {
  city: Accessor<string>;
}

interface Weather {
  temperature: string;
  wind: string;
}

export default function WeatherForecast({ city }: WeatherForecastProps) {
  const [weather, setWeather] = createSignal<Weather | null>(null);

  createEffect(async () => {
    setWeather(null);

    if (!city()) {
      return;
    }

    const response = await fetch(`https://goweather.herokuapp.com/weather/${city()}`);
    const json = await response.json();
    setWeather(json);
  });

  return (
    <Show when={weather()}>
      <div>
        <h2 className={"text-blue-800 text-3xl"}>{city()}</h2>
        <p className={"flex gap-1"}>
          <label>Temperature: </label>
          <span>{weather().temperature}</span>
        </p>
        <p className={"flex gap-1"}>
          <label>Wind: </label>
          <span>{weather().wind}</span>
        </p>
      </div>
    </Show>
  )
}