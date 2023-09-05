import type WeatherRepository from "@/services/Weather/WeatherRepository";
import { type Weather, WeatherKey, type WeatherRaw } from "@/services/Weather/WeatherStructure";
export default class GetWeatherUseCase {
  private weatherRepository: WeatherRepository;

  constructor(weatherRepository: WeatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  public async execute(): Promise<{ success: boolean, weather?: Weather }> {
    try {
      const response: WeatherRaw = await this.weatherRepository.retrieve();

      return {
        success: true,
        weather: {
          key: this.getWeatherKeyFromCode(response.weather[0].id),
          temp: `${this.getRoundedTemp(response.main.temp)}º`,
          speed: `${this.getKmHour(response.wind.speed)}km/h`,
          time: this.getCurrentTime(),
        }
      };
    } catch (e) {
      return { success: false };
    }
  }

  private getWeatherKeyFromCode(code: number) {
    if (code < 300 && code >= 200) {
      return WeatherKey.storm;
    }
    if ((code < 400 && code >= 300) || (code < 600 && code >= 500)) {
      return WeatherKey.rain;
    }
    if (code < 700 && code >= 600) {
      return WeatherKey.snow;
    }
    if (code < 800 && code >= 700) {
      return WeatherKey.foggy;
    }
    if (code < 900 && code > 801) {
      return WeatherKey.cloudy;
    }
    if (code === 801) {
      return WeatherKey.partlyCloudy;
    }
    return WeatherKey.sunny;
  }

  private getKmHour(meterSec: number): number {
    return Math.round(meterSec * 3.600000);
  }

  private getRoundedTemp(temp: number): number {
    return Math.round(temp);
  }

  private getCurrentTime(): string {
    const date = new Date();
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }
}