class WeatherApp {
  constructor(weatherService, suggestionService) {
    // Inicializa las propiedades de la clase con los servicios de clima y sugerencias
    this.weatherService = weatherService;
    this.suggestionService = suggestionService;
    // Obtiene los elementos del DOM donde se mostrará la información
    this.weatherCard = document.getElementById('weather-card');
    this.clothingSuggestion = document.getElementById('clothing-suggestion');
    // Inicia la aplicación
    this.init();
  }

  init() {
    // Ejecuta este código cuando el contenido del documento se ha cargado completamente
    document.addEventListener('DOMContentLoaded', () => {
      // Verifica si el navegador soporta geolocalización
      if (navigator.geolocation) {
        // Obtiene la posición actual del usuario
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            // Llama al método fetchWeather con la latitud y longitud
            this.fetchWeather(latitude, longitude);
          },
          error => {
            console.error('Error al obtener la ubicación:', error);
            // Muestra un mensaje de error si no se pudo obtener la ubicación
            this.weatherCard.innerHTML = '<p>No se pudo obtener la ubicación.</p>';
          }
        );
      } else {
        // Muestra un mensaje si el navegador no soporta geolocalización
        this.weatherCard.innerHTML = '<p>Geolocalización no es soportada por este navegador.</p>';
      }
    });
  }

  async fetchWeather(lat, lon) {
    try {
      // Obtiene el clima usando el servicio weatherService
      const weather = await this.weatherService.getWeather(lat, lon);
      // Muestra los datos del clima
      this.displayWeather(weather);
      // Muestra las sugerencias de vestimenta
      this.displayClothingSuggestion(weather);
    } catch (error) {
      // Muestra un mensaje de error si no se pudieron obtener los datos del clima
      this.weatherCard.innerHTML = '<p>Error al obtener los datos del clima.</p>';
    }
  }

  capitalizeFirstLetter(string) {
    // Retorna la cadena con la primera letra en mayúscula
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  displayWeather(weather) {
    // Capitaliza la primera letra de la descripción del clima
    const description = this.capitalizeFirstLetter(weather.weather[0].description);
    // Inserta el HTML con los datos del clima en el elemento weatherCard
    this.weatherCard.innerHTML = `
      <h2>${weather.name}</h2>
      <p class="temp">${weather.main.temp}°C</p>
      <p class="desc">${description}</p>
      <p class="details">Humedad: ${weather.main.humidity}%</p>
      <p class="details">Viento: ${weather.wind.speed} m/s</p>
    `;
  }

  displayClothingSuggestion(weather) {
    // Obtiene una sugerencia de vestimenta usando el servicio suggestionService
    const suggestion = this.suggestionService.getSuggestion(weather);
    // Inserta la sugerencia en el elemento clothingSuggestion
    this.clothingSuggestion.innerHTML = `<p>${suggestion}</p>`;
  }
}
