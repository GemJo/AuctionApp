import GetWeatherUseCase from "@/services/Weather/GetWeather/GetWeatherUseCase";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { type Weather, type WeatherRaw } from "@/services/Weather/WeatherStructure";

const weatherRepositoryMock = {
  retrieve: vi.fn(),
}

const provider: { dataFromApi: WeatherRaw, data: Weather }[] = [
  {
    dataFromApi: {
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "cielo claro",
          icon: "01d"
        }
      ],
      main: {
        temp: 30.59,
        feels_like: 30.26,
        temp_min: 30.38,
        temp_max: 30.59,
        pressure: 1017,
        humidity: 39
      },
      wind: {
        speed: 4.12,
        deg: 150
      },
    },
    data: {
      key: 'sunny',
      temp: '31º',
      speed: '15km/h',
      time: '',
    }
  },
  {
    dataFromApi: {
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "muy nuboso",
          icon: "04d"
        }
      ],
      main: {
        temp: 23.86,
        feels_like: 23.87,
        temp_min: 23.62,
        temp_max: 28.02,
        pressure: 1012,
        humidity: 60
      },
      wind: {
        speed: 6.17,
        deg: 180
      },
    },
    data: {
      key: 'cloudy',
      temp: '24º',
      speed: '22km/h',
      time: '',
    }
  }
]

let getWeatherUseCase: GetWeatherUseCase;

describe(('Get weather use case and repository fails') , () => {
  beforeEach(() => {
    vi.resetAllMocks();
    weatherRepositoryMock.retrieve.mockRejectedValue(new Error());
    getWeatherUseCase = new GetWeatherUseCase(weatherRepositoryMock);
  });

  it('must return success false', async () => {
    const response = await getWeatherUseCase.execute();
    expect(response.success).toBe(false);
  });

  it('must not return the weather info', async () => {
    const response = await getWeatherUseCase.execute();
    expect(response.weather).toBeUndefined();
  });
});

describe.each(provider)(('Get weather use case') , (data) => {
  beforeEach(() => {
    vi.resetAllMocks();
    weatherRepositoryMock.retrieve.mockResolvedValue(data.dataFromApi);
    getWeatherUseCase = new GetWeatherUseCase(weatherRepositoryMock);
  });

  it('must return success true', async () => {
    const response = await getWeatherUseCase.execute();
    expect(response.success).toBe(true);
  });

  it('must not return the weather info', async () => {
    const response = await getWeatherUseCase.execute();
    expect(response.weather!.key).toBe(data.data.key);
    expect(response.weather!.temp).toBe(data.data.temp);
    expect(response.weather!.speed).toBe(data.data.speed);
  });
});