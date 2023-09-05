export interface Weather {
  key: string,
  temp: string,
  speed: string,
  time: string,
}

export enum WeatherKey {
  sunny = 'sunny',
  partlyCloudy = 'partlyCloudy',
  cloudy = 'cloudy',
  foggy = 'foggy',
  snow = 'snow',
  rain = 'rain',
  storm = 'storm',
}

export interface WeatherRaw {
  weather:
    {
      id: number,
      main: string,
      description: string,
      icon: string,
    }[],
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
  },
  wind: {
    speed: number,
    deg: number,
  },
}
