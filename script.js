// Instanciar servicios y la aplicación

// Crea una instancia de WeatherService con la clave de API proporcionada en el archivo de configuración (config.js)
const weatherService = new WeatherService(CONFIG.API_KEY);

// Crea una instancia de ClothingSuggestionService
const suggestionService = new ClothingSuggestionService();

// Crea una instancia de WeatherApp pasando las instancias de weatherService y suggestionService
new WeatherApp(weatherService, suggestionService);
