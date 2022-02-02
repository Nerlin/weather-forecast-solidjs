import { onCleanup } from "solid-js";


export default function useDebounce(callback: (...args: any[]) => void, time: number = 350) {
  let id;

  const fn = (...args: any[]) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      callback(...args);
    }, time);
  };

  fn.cancel = () => clearTimeout(id);
  onCleanup(fn.cancel);

  return fn;
}