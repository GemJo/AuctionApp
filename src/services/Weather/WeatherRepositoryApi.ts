import axios from 'axios';
import type WeatherRepository from "@/services/Weather/WeatherRepository";
import { type WeatherRaw } from "@/services/Weather/WeatherStructure";

const APIKEY: string | undefined = import.meta.env.VITE_API_KEY;
const LAT: number = 42.13615;
const LON: number = -0.4087;
const URL: string = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&lang=es&appid=${APIKEY}&units=metric`;
export default class WeatherRepositoryApi implements WeatherRepository {
  async retrieve(): Promise<WeatherRaw> {
    console.log(import.meta.env);
    return axios.get(URL)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.error(e);
        throw new Error(e);
      });
  }
}
