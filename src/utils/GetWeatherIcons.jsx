export default function getWeatherIcon(condition) {
  switch (condition) {
    case 'Clear':
      return <img src="soleado.png" alt="solcito" />;
    case 'Clouds':
      return <img src="nubes.png" alt="nubes" />
    case 'Few Clouds':
    case 'Scattered Clouds':
      return <img src="pocas-nubes.png" alt="nubesConSol" />
    case 'Rain':
    case 'Drizzle':
      return <img src="lluvia.png" alt="lluvia" />
    case 'Thunderstorm':
      return <img src="truenos.png" alt="rayoMCqueen" />
    default:
      return <img src="pocas-nubes.png" alt="nubesConSol" />
  }
}