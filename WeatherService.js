class WeatherService {
  constructor(apiKey) {
    // Inicializa la propiedad API_KEY con la clave proporcionada y define la URL base de la API del clima
    this.API_KEY = apiKey;
    this.WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async getWeather(lat, lon) {
    try {
      // Construye la URL de la solicitud con las coordenadas, la clave de API, unidades métricas y lenguaje español
      const response = await fetch(`${this.WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&lang=es`);
      // Verifica si la respuesta es válida
      if (!response.ok) {
        throw new Error('Error al obtener los datos del clima');
      }
      // Convierte la respuesta a formato JSON
      const data = await response.json();
      // Retorna los datos del clima
      return data;
    } catch (error) {
      // Imprime un mensaje de error en la consola y lanza el error
      console.error('Error al obtener los datos del clima:', error);
      throw error;
    }
  }
}
