class ClothingSuggestionService {
  getSuggestion(weather) {
    // Extrae información relevante del objeto weather
    const { feels_like, humidity, pressure } = weather.main;
    const { speed: windSpeed } = weather.wind;
    const { visibility } = weather;
    const description = weather.weather[0].description;

    console.log(weather);

    // Sugerencia inicial por defecto
    let suggestion = "Ponete ropa adecuada para el clima actual.";

    // Sugerencias basadas en la sensación térmica (feels_like)
    const SUGGESTION_COLD =
      "Abrigate bien con un abrigo grueso, gorro, bufanda y guantes. Usá ropa térmica debajo si es necesario.";
    const SUGGESTION_CHILLY =
      "Usá una campera gruesa o abrigo, buzo y pantalones largos. Si sos friolento/a, no te olvides los guantes y la bufanda/cuellito.";
    const SUGGESTION_COOL =
      "Una campera o abrigo liviano, buzo y pantalones largos.";
    const SUGGESTION_MILD =
      "Usá una campera ligera, remera manga larga, pantalones largos o cortos y zapatos cómodos.";
    const SUGGESTION_WARM =
      "Usá una remera manga corta o manga larga, pantalones largos o cortos, y zapatos cómodos.";
    const SUGGESTION_HOT =
      "Usá ropa liviana como remeras manga corta, pantalones cortos o pollera. Hidratate y protegete del sol.";

    switch (true) {
      case feels_like < 0:
        suggestion = SUGGESTION_COLD;
        break;
      case feels_like < 10:
        suggestion = SUGGESTION_CHILLY;
        break;
      case feels_like < 15:
        suggestion = SUGGESTION_COOL;
        break;
      case feels_like < 20:
        suggestion = SUGGESTION_MILD;
        break;
      case feels_like < 25:
        suggestion = SUGGESTION_WARM;
        break;
      default:
        suggestion = SUGGESTION_HOT;
        break;
    }

    // Sugerencias adicionales basadas en la humedad
    if (humidity > 80) {
      suggestion += " La humedad está alta, considerá usar ropa transpirable.";
    } else if (humidity < 20) {
      suggestion +=
        " La humedad está baja, asegurate de hidratarte adecuadamente.";
    }

    // Sugerencias adicionales basadas en la velocidad del viento
    if (windSpeed > 10) {
      suggestion +=
        " Hace viento, llevá una campera cortavientos para protegerte.";
    }

    // Sugerencias adicionales basadas en la presión atmosférica
    if (pressure < 1000) {
      suggestion +=
        " La presión atmosférica está baja, prepárate para posibles cambios en el clima.";
    } else if (pressure > 1020) {
      suggestion +=
        " La presión atmosférica está alta, es probable que el clima sea estable.";
    }

    // Sugerencias adicionales basadas en la visibilidad
    if (visibility < 1000) {
      suggestion +=
        " La visibilidad está reducida, ten cuidado al conducir o realizar actividades al aire libre.";
    }

    // Sugerencias adicionales basadas en la descripción del clima
    if (description.includes("lluvia")) {
      suggestion += " No te olvides de llevar un paraguas o impermeable.";
    }

    // Retorna la sugerencia final
    return suggestion;
  }
}
