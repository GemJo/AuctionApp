import GetWeatherUseCase from "@/services/Weather/GetWeather/GetWeatherUseCase";
import WeatherRepositoryApi from "@/services/Weather/WeatherRepositoryApi";

export const getWeather = new GetWeatherUseCase(new WeatherRepositoryApi());
