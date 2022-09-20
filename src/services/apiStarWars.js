const urlPlanets = 'https://swapi.dev/api/planets';

const apiStarWars = async () => (
  fetch(urlPlanets)
    .then((response) => response.json())
    .then((data) => data.results.map((planet) => {
      const {
        climate, created, diameter, edited, films, gravity, name,
        orbital_period: orbitalPeriod, population, rotation_period: rotationPeriod,
        surfact_water: surfaceWater, terrain, url,
      } = planet;
      return {
        climate,
        created,
        diameter,
        edited,
        films,
        gravity,
        name,
        orbitalPeriod,
        population,
        rotationPeriod,
        surfaceWater,
        terrain,
        url,
      };
    }))
);

export default apiStarWars;
