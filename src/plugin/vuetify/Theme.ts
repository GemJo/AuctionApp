export default class Theme {
  public static get(): object {
    return {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#27ffff',
            'primary-darken-1': '#1ac5c5',
            'primary-darken-2': '#108f8f',
            'primary-darken-3': '#096b6b',
            'primary-darken-4': '#044949',
            'primary-lighten-1': '#61ffff',
            'primary-lighten-2': '#8bffff',
            'primary-lighten-3': '#afffff',
            'primary-lighten-4': '#cfffff',
            secondary: '#2d6194',
            'secondary-darken-1': '#225281',
            'secondary-darken-2': '#1a446e',
            'secondary-darken-3': '#103152',
            'secondary-lighten-1': '#3a71a8',
            'secondary-lighten-2': '#5b96d0',
            'secondary-lighten-3': '#78b2ec',
            'text-muted': '#BDBDBD',
          }
        }
      }
    }
  }
}
