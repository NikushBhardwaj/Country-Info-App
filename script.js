const countryInput = document.getElementById("country-input");
const searchBtn = document.getElementById("search-btn");
const errorMessage = document.getElementById("error-message");
const flag = document.getElementById("flag");
const countryName = document.getElementById("country-name");
const capitalName = document.getElementById("capital");
const populationValue = document.getElementById("population");
const regionName = document.getElementById("region");
const currency = document.getElementById("currency");
const countryCard = document.getElementById("country-card");

searchBtn.addEventListener("click", async () => {
  const country = countryInput.value.trim();
  if (!country) return;
  errorMessage.style.display = "none";
  countryCard.style.display = "none";
  try {
    const data = await fetchData(country);
    showData(data);
  } catch (error) {
    errorMessage.style.display = "block";
  }
});

async function fetchData(country) {
  const URL = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error("Countrynot found!");
  }
  const data = await response.json();
  console.log(data);
  return data;
}
function showData(data) {
  errorMessage.style.display = "none";
  countryCard.style.display = "block";
  const { flags, name, capital, population, region, currencies } = data[0];
  flag.src = flags.png;
  countryName.textContent = name.common;
  capitalName.textContent = capital?.[0] || "N/A";
  populationValue.textContent = population;
  regionName.textContent = region;
  const currencyKey = Object.keys(currencies)[0];
   currency.textContent = currencies[currencyKey].name;
}
