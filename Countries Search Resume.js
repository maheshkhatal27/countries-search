let searchInputEl = document.getElementById("searchInput");
let loadingEl = document.getElementById("spinner");
let resulCountryEl = document.getElementById("resultCountries");

let searchInputVal = "";
let countryList = [];

function createCountries(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resulCountryEl.appendChild(countryEl);

    let countryFlag = document.createElement("img");
    countryFlag.src = country.flag;
    countryFlag.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlag);

    let countryInfo = document.createElement("div");
    countryInfo.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfo);

    let countryName = document.createElement("p");
    countryName.textContent = country.name;
    countryName.classList.add("country-name");
    countryInfo.appendChild(countryName);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfo.appendChild(countryPopulationEl);
}

function displayCountryInfo() {
    resulCountryEl.textContent = "";

    //let limitedCountries = countryList.slice(0,10); only 10 countries will be shown 


    for (let country of countryList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            createCountries(country);
        }
    }
}


function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET",
    };

    loadingEl.classList.remove("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            loadingEl.classList.add("d-none");
            countryList = jsonData;
            //console.log(countryList);
            displayCountryInfo();
        });
}

function onChangesSearchInput(event) {
    searchInputVal = event.target.value;
    console.log(event.target.value);
    displayCountryInfo();
}


getCountries();
searchInputEl.addEventListener("keyup", onChangesSearchInput);