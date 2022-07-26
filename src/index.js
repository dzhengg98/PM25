import { ARRAY_OF_COUNTRIES } from './scripts/countries';
import countryCase from './scripts/countryCases';
import sleep from './scripts/sleep';

document.addEventListener("DOMContentLoaded", () => {
  let myChart;
  let countriesInnerContainer = document.getElementById('countries-inner-container');

  function createCountries() {
    ARRAY_OF_COUNTRIES.forEach((country) => {
      let countryContainer = document.createElement('div');
      countryContainer.classList.add('country-container');
      countriesInnerContainer.appendChild(countryContainer);
      
      let countries = document.createElement('div');
      countries.classList.add('countries');
      countries.setAttribute('id', country.replace(/ /g, ''));
      countryContainer.appendChild(countries);
      
      let countryImage = document.createElement('img');
      countryImage.title = country;
      countryImage.src = `./src/assets/${country}.svg`;
      // countryImage.srcset = `./src/assets/${country}.svg`;
      countryImage.alt = country;
      countries.appendChild(countryImage);
      
      let countryName = document.createElement('div');
      countryName.classList.add('country-name');
      countries.appendChild(countryName);
      countryName.textContent += country;
    })
  }

  function createChartForCountry() {
    ARRAY_OF_COUNTRIES.forEach(country => document.getElementById(country.replace(/ /g, '')).addEventListener("click", (e) => {
      e.preventDefault();
      if (myChart) {
        myChart.destroy();
      }
      createChart(country)
        .then(window.scrollTo(0, 0))
        .then(document.querySelector('.searchbar').value = '')
        .then(countryContainerElement.forEach(e => e.style.display = 'block'))
    }));
  }


  async function createChart(field) {
    const data = await getData(field);
    const ctx = document.getElementById('canvasChart').getContext('2d');

    createCountryInfoContainer(field, data);

    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.xlabels,
        datasets: [{
          label: 'Concentrations of air pollution (µg/m³) in ' + data.countryName[0],
          data: data.ypm25,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)',
          borderColor:
            'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Exposure to air pollution with fine particulate matter, 1990 to 2017'
          },
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value, index, values) {
                return value.toFixed(3) + 'µg'
              }
            }
          }
        }
      }
    });
  }

  function createCountryInfoContainer(field, data) {
    const countryInfo = document.getElementById('countryInfo');
    countryInfo.innerHTML = '';

    const countryInfoInner1 = document.createElement('div');
    const countryInfoInner2 = document.createElement('div');
    countryInfo.appendChild(countryInfoInner1);
    countryInfoInner1.classList.add('country-info-inner-1');
    countryInfo.appendChild(countryInfoInner2);
    countryInfoInner2.classList.add('country-info-inner-2');
    
    createGlobeMap(field, data, countryInfoInner1);
    createCountryTitle(field, countryInfoInner2);

    const countryDataInfo = document.createElement('div');
    countryDataInfo.classList.add('country-data-info');
    countryInfoInner2.appendChild(countryDataInfo);

    generate1990Data(data, countryDataInfo);
    generate2017Data(data, countryDataInfo);
    calculateAbsoluteChange(data, countryDataInfo);
    calculateRelativeChange(data, countryDataInfo);
  }

  function createGlobeMap(field, data, countryInfoInner1) {
    const countryGlobeMap = document.createElement('img');
    countryGlobeMap.classList.add('country-map');
    countryGlobeMap.title = field;
    countryGlobeMap.src = data.countryMap;
    countryGlobeMap.srcset = data.countryMap;
    countryGlobeMap.alt = field;
    countryInfoInner1.appendChild(countryGlobeMap);
  };

  function createCountryTitle(field, countryInfoInner2) {
    const countryTitle = document.createElement('h2')
    countryTitle.classList.add('country-title');
    countryTitle.textContent = field;
    countryInfoInner2.appendChild(countryTitle);
  };

  function generate1990Data(data, countryDataInfo) {
    const country1990 = document.createElement('div');
    country1990.classList.add('country1990');
    countryDataInfo.appendChild(country1990);
    const country1990title = document.createElement('h4');
    country1990title.textContent = "1990";
    country1990.appendChild(country1990title);
    const country1990info = document.createElement('div');
    country1990info.textContent = data.ninety.toFixed(2) + 'μg';
    country1990.appendChild(country1990info);
  };

  function generate2017Data(data, countryDataInfo) {
    const country2017 = document.createElement('div');
    country2017.classList.add('country2017');
    countryDataInfo.appendChild(country2017);
    const country2017title = document.createElement('h4');
    country2017title.textContent = "2017";
    country2017.appendChild(country2017title);
    const country2017info = document.createElement('div');
    country2017info.textContent = data.seventeen.toFixed(2) + 'μg';
    country2017.appendChild(country2017info);
  };

  function calculateAbsoluteChange(data, countryDataInfo) {
    const absoluteChange = document.createElement('div');
    absoluteChange.classList.add('absoluteChange');
    countryDataInfo.appendChild(absoluteChange);
    const absoluteChangeTitle = document.createElement('h4');
    absoluteChangeTitle.textContent = "Absolute Change";
    absoluteChange.appendChild(absoluteChangeTitle);
    const absoluteChangeInfo = document.createElement('div');
    absoluteChangeInfo.textContent = (data.seventeen - data.ninety).toFixed(2) + 'μg';
    (data.seventeen - data.ninety).toFixed(2) > 0 ? absoluteChangeInfo.classList.add('red-marker') : absoluteChangeInfo.classList.add('green-marker');
    absoluteChange.append(absoluteChangeInfo)
  };

  function calculateRelativeChange(data, countryDataInfo) {
    const relativeChange = document.createElement('div');
    relativeChange.classList.add('relativeChange');
    countryDataInfo.appendChild(relativeChange);
    const relativeChangeTitle = document.createElement('h4');
    relativeChangeTitle.textContent = "Relative Change";
    relativeChange.appendChild(relativeChangeTitle);
    const relativeChangeInfo = document.createElement('div')
    relativeChangeInfo.textContent = ((data.seventeen - data.ninety)/(data.ninety)*(100)).toFixed(2) + '%';
    ((data.seventeen - data.ninety)/(data.ninety)*(100)).toFixed(2) > 0 ? relativeChangeInfo.classList.add('red-marker') : relativeChangeInfo.classList.add('green-marker');
    relativeChange.append(relativeChangeInfo);
  }
    
  async function getData(field) {
    const xlabels = [];
    const ypm25 = [];
    const countryName = [];
    let ninety = [];
    let seventeen = [];
    let countryMap;
    let table;
    const response = await fetch('./src/PM25-air-pollution.csv');
    const data = await response.text();

    const countryCases = countryCase(data, field, table, countryMap);
    table = countryCases.table;
    countryMap = countryCases.countryMap;

    table.forEach((row, i) => {
      const columns = row.split(',');
      const country = columns[0];
      countryName.push(country);
      const abv = columns[1];
      const year = columns[2];
      xlabels.push(year);
      const pm25 = columns[3];
      ypm25.push(pm25);

      if (i === 0) {
        ninety.push(columns[3])
      } else if (i === table.length - 1) {
        seventeen.push(columns[3])
      }
    });

    ninety = parseFloat(ninety);
    seventeen = parseFloat(seventeen);

    return { xlabels, ypm25, countryName, ninety, seventeen, countryMap };
  };

  createChart('Afghanistan');
  createCountries();
  createChartForCountry();

  const searchBox = document.querySelector('.searchbox');

  const countryElement = document.querySelectorAll('.country-container div div');
  const countryContainerElement = document.querySelectorAll('.country-container');

  function search(e) {
    countryElement.forEach((ele, i) => {
      if (!ele.innerHTML.toLowerCase().includes(e.target.value)) {
        countryContainerElement[i].style.display = 'none';
      } else {
        countryContainerElement[i].style.display = 'block';
      }
    })
  }

  searchBox.addEventListener("keyup", search);
});