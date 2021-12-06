function fetchCountries(name) {
  if (name.length)
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags`,
    ).then(response => response.json());
}

export { fetchCountries };