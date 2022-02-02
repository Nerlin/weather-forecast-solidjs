import type { Component } from 'solid-js';
import { createEffect, createSignal } from "solid-js";
import useDebounce from "./hooks/useDebounce";
import WeatherForecast from "./WeatherForecast";

const App: Component = () => {
  const [city, setCity] = createSignal("");
  const [query, setQuery] = createSignal("");

  const runQuery = useDebounce((value) => {
    setQuery(value);
  });

  createEffect(() => {
    runQuery(city());
  });

  return (
    <div className={"grid place-content-center gap-8 py-16"}>
      <form>
        <label>
          City:
          <input className={"border mx-2"} value={city()} onInput={(e) => setCity(e.currentTarget.value)}/>
        </label>
      </form>

      <WeatherForecast city={query} />
    </div>
  );
};

export default App;
