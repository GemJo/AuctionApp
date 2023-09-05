import  { type WeatherRaw } from "@/services/Weather/WeatherStructure";

export default interface WeatherRepository {
  retrieve(): Promise<WeatherRaw>;
}