document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOMContentLoaded");
  let myChart;

  const arrayOfCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 
    'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 
    'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus',
    'Czechia', 'Democratic Republic of Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
    'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Guam', 'Guatemala',
    'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', "Iceland", 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 
    'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
    'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia (country)', 'Moldova', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'New Zealand', 'Nicaragua',
    'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea',
    'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Lucia', 'Saint Vincent and the Grenadines',
    'Samoa', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan',
    'Tanzania', 'Thailand', 'Timor', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'United States Virgin Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ]

  let countriesInnerContainer = document.getElementById('countries-inner-container')

  function createCountries() {
    arrayOfCountries.forEach((country) => {
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
      countryImage.srcset = `./src/assets/${country}.svg`;
      countryImage.alt = country;
      countries.appendChild(countryImage);
      
      let countryName = document.createElement('div');
      countryName.classList.add('country-name');
      countries.appendChild(countryName);
      countryName.textContent += country;
    })
  }

  function createChartForCountry() {
    arrayOfCountries.forEach(country => document.getElementById(country.replace(/ /g, '')).addEventListener("click", (e) => {
      // debugger
      e.preventDefault();
      if (myChart) {
        myChart.destroy();
      }
      createChart(country);
    }));
  }

  async function createChart(field) {
    const data = await getData(field);
    // debugger
    const ctx = document.getElementById('canvasChart').getContext('2d');

    const countryInfo = document.getElementById('countryInfo')
    countryInfo.innerHTML = '';

    const countryInfoInner1 = document.createElement('div');
    const countryInfoInner2 = document.createElement('div');
    countryInfo.appendChild(countryInfoInner1);
    countryInfoInner1.classList.add('country-info-inner-1');
    countryInfo.appendChild(countryInfoInner2);
    countryInfoInner2.classList.add('country-info-inner-2');
    
    const countryGlobeMap = document.createElement('img');
    countryGlobeMap.classList.add('country-map');
    countryGlobeMap.title = field;
    countryGlobeMap.src = data.countryMap;
    countryGlobeMap.srcset = data.countryMap;
    countryGlobeMap.alt = field;
    countryInfoInner1.appendChild(countryGlobeMap);

    const countryTitle = document.createElement('h2')
    countryTitle.classList.add('country-title');
    countryTitle.textContent = field;
    countryInfoInner2.appendChild(countryTitle);

    const countryDataInfo = document.createElement('div');
    countryDataInfo.classList.add('country-data-info');
    countryInfoInner2.appendChild(countryDataInfo);

    const country1990 = document.createElement('div');
    country1990.classList.add('country1990');
    countryDataInfo.appendChild(country1990);
    const country1990title = document.createElement('h4');
    country1990title.textContent = "1990";
    country1990.appendChild(country1990title);
    const country1990info = document.createElement('div');
    country1990info.textContent = data.ninety.toFixed(2) + 'μg';
    country1990.appendChild(country1990info);

    const country2017 = document.createElement('div');
    country2017.classList.add('country2017');
    countryDataInfo.appendChild(country2017);
    const country2017title = document.createElement('h4');
    country2017title.textContent = "2017";
    country2017.appendChild(country2017title);
    const country2017info = document.createElement('div');
    country2017info.textContent = data.seventeen.toFixed(2) + 'μg';
    country2017.appendChild(country2017info);

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
                return value + 'µg'
              }
            }
          }
        }
      }
    });
  }
    
  async function getData(field) {
    const xlabels = [];
    const ypm25 = [];
    const countryName = [];
    let ninety = [];
    let seventeen = [];
    let countryMap;
    const response = await fetch('./src/PM25-air-pollution.csv');
    const data = await response.text();

    let table;
    switch (field) {
      case 'Afghanistan':
        table = data.split(/\n/).slice(1,13);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/19/Afghanistan_%28orthographic_projection%29.svg';
        break;
      case 'Albania':
        table = data.split(/\n/).slice(13,25);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Location_Albania_Europe.png';
        break;
      case 'Algeria':
        table = data.split(/\n/).slice(25, 37);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Algeria_%28centered_orthographic_projection%29.svg';
        break;
      case 'American Samoa':
        table = data.split(/\n/).slice(37, 49);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/99/American_Samoa_on_the_globe_%28Polynesia_centered%29.svg';
        break;
      case 'Andorra':
        table = data.split(/\n/).slice(49, 61);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/00/Location_Andorra_Europe1.png';
        break;
      case 'Angola':
        table = data.split(/\n/).slice(61, 73);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Angola_%28orthographic_projection%29.svg';
        break;
      case 'Antigua and Barbuda':
        table = data.split(/\n/).slice(73, 85);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/21/ATG_orthographic.svg';
        break;
      case 'Argentina':
        table = data.split(/\n/).slice(85, 97);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/ARG_orthographic_%28%2Ball_claims%29.svg';
        break;
      case 'Armenia':
        table = data.split(/\n/).slice(97, 109);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Armenia_%28orthographic_projection%29.svg';
        break;
      case 'Australia':
        table = data.split(/\n/).slice(109, 121);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/da/Australia_with_AAT_%28orthographic_projection%29.svg';
        break;
      case 'Austria':
        table = data.split(/\n/).slice(121, 133);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9d/EU-Austria.svg';
        break;
      case 'Azerbaijan':
        table = data.split(/\n/).slice(133, 145);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Azerbaijan_with_Nagorno_Karabakh_region.svg';
        break;
      case 'Bahamas':
        table = data.split(/\n/).slice(145, 157);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/de/The_Bahamas_on_the_globe_%28Americas_centered%29.svg';
        break;
      case 'Bahrain':
        table = data.split(/\n/).slice(157, 169);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/83/Map_of_Bahrain.svg';
        break;
      case 'Bangladesh':
        table = data.split(/\n/).slice(169, 182);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Bangladesh_%28orthographic_projection%29.svg';
        break;
      case 'Barbados':
        table = data.split(/\n/).slice(182, 193);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a1/BRB_orthographic.svg';
        break;
      case 'Belarus':
        table = data.split(/\n/).slice(193, 205);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Europe-Belarus_%28orthographic_projection%29.svg';
        break;
      case 'Belgium':
        table = data.split(/\n/).slice(205, 217);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/67/EU-Belgium.svg';
        break;
      case 'Belize':
        table = data.split(/\n/).slice(217, 229);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/43/BLZ_orthographic.svg';
        break;
      case 'Benin':
        table = data.split(/\n/).slice(229, 241);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/01/Benin_%28orthographic_projection_with_inset%29.svg';
        break;
      case 'Bermuda':
        table = data.split(/\n/).slice(241, 253);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/32/Bermuda_in_United_Kingdom.svg';
        break;
      case 'Bhutan':
        table = data.split(/\n/).slice(253, 265);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Bhutan_%28orthographic_projection%29.svg';
        break;
      case 'Bolivia':
        table = data.split(/\n/).slice(265, 277);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/83/BOL_orthographic.svg';
        break;
      case 'Bosnia and Herzegovina':
        table = data.split(/\n/).slice(277, 289);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/94/Europe-Bosnia_and_Herzegovina.svg';
        break;
      case 'Botswana':
        table = data.split(/\n/).slice(289, 301);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/79/Botswana_%28centered_orthographic_projection%29.svg';
        break;
      case 'Brazil':
        table = data.split(/\n/).slice(301, 313);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bc/BRA_orthographic.svg';
        break;
      case 'Brunei':
        table = data.split(/\n/).slice(313, 325);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Brunei_%28orthographic_projection%29.svg';
        break;
      case 'Bulgaria':
        table = data.split(/\n/).slice(325, 337);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e9/EU-Bulgaria.svg';
        break;
      case 'Burkina Faso':
        table = data.split(/\n/).slice(337, 349);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/86/Burkina_Faso_%28orthographic_projection%29.svg';
        break;
      case 'Burundi':
        table = data.split(/\n/).slice(349, 361);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/27/Burundi_%28orthographic_projection%29.svg';
        break;
      case 'Cambodia':
        table = data.split(/\n/).slice(361, 373);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Cambodia_on_the_globe_%28Cambodia_centered%29.svg';
        break;
      case 'Cameroon':
        table = data.split(/\n/).slice(373, 385);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Cameroon_%28orthographic_projection%29.svg';
        break;
      case 'Canada':
        table = data.split(/\n/).slice(385, 397);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/67/CAN_orthographic.svg';
        break;
      case 'Cape Verde':
        table = data.split(/\n/).slice(397, 409);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Cape_Verde_%28orthographic_projection%29.svg';
        break;
      case 'Central African Republic':
        table = data.split(/\n/).slice(409, 421);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Central_African_Republic_%28centered_orthographic_projection%29.svg';
        break;
      case 'Chad':
        table = data.split(/\n/).slice(421, 433);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/46/Chad_%28orthographic_projection%29.svg';
        break;
      case 'Chile':
        table = data.split(/\n/).slice(433, 445);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/cc/CHL_orthographic_%28%2Ball_claims%29.svg';
        break;
      case 'China':
        table = data.split(/\n/).slice(445, 457);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a4/CHN_orthographic.svg';
        break;
      case 'Colombia':
        table = data.split(/\n/).slice(457, 469);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/COL_orthographic_%28San_Andr%C3%A9s_and_Providencia_special%29.svg';
        break;
      case 'Comoros':
        table = data.split(/\n/).slice(469, 481);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Comoros_%28orthographic_projection%29.svg';
        break;
      case 'Congo':
        table = data.split(/\n/).slice(481, 493);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Republic_of_the_Congo_%28orthographic_projection%29.svg';
        break;
      case 'Costa Rica':
        table = data.split(/\n/).slice(493, 505);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/89/CRI_orthographic.svg';
        break;
      case "Cote d'Ivoire":
        table = data.split(/\n/).slice(505, 517);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/C%C3%B4te_d%27Ivoire_%28orthographic_projection%29.svg';
        break;
      case 'Croatia':
        table = data.split(/\n/).slice(517, 529);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/EU-Croatia_%28orthographic_projection%29.png';
        break;
      case 'Cuba':
        table = data.split(/\n/).slice(529, 541);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/16/CUB_orthographic.svg';
        break;
      case 'Cyprus':
        table = data.split(/\n/).slice(541, 553);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/EU-Cyprus.svg';
        break;
      case 'Czechia':
        table = data.split(/\n/).slice(553, 565);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/31/EU-Czech_Republic.svg';
        break;
      case 'Democratic Republic of Congo':
        table = data.split(/\n/).slice(565, 577);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Democratic_Republic_of_the_Congo_%28orthographic_projection%29.svg';
        break;
      case 'Denmark':
        table = data.split(/\n/).slice(577, 589);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/EU-Denmark.svg';
        break;
      case 'Djibouti':
        table = data.split(/\n/).slice(589, 601);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Djibouti_%28orthographic_projection%29.svg';
        break;
      case 'Dominica':
        table = data.split(/\n/).slice(601, 613);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Dominica_on_the_globe_%28Americas_centered%29.svg';
        break;
      case 'Dominican Republic':
        table = data.split(/\n/).slice(613, 625);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/95/Dominican_Republic_%28orthographic_projection%29.svg';
        break;
      // case 'East Asia and Pacific': 
      //   table = data.split(/\n/).slice(625, 637);
      //   break;
      case 'Ecuador':
        table = data.split(/\n/).slice(637, 649);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/ECU_orthographic.svg';
        break;
      case 'Egypt':
        table = data.split(/\n/).slice(649, 661);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a1/EGY_orthographic.svg';
        break;
      case 'El Salvador':
        table = data.split(/\n/).slice(661, 673);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e3/El_Salvador_%28orthographic_projection%29.svg';
        break;
      case 'Equatorial Guinea':
        table = data.split(/\n/).slice(673, 685);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b9/GNQ_orthographic.svg';
        break;
      case 'Eritrea': 
        table = data.split(/\n/).slice(685, 697);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/43/Eritrea_%28Africa_orthographic_projection%29.svg';
        break;
      case 'Estonia':
        table = data.split(/\n/).slice(697, 709);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a2/EU-Estonia.svg';
        break;
      case 'Eswatini': 
        table = data.split(/\n/).slice(709, 721);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Location_Eswatini_AU_Africa.svg';
        break;
      case 'Ethiopia':
        table = data.split(/\n/).slice(721, 732);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Ethiopia_%28Africa_orthographic_projection%29.svg';
        break;
      // case 'Europe and Central Asia':
      //   table = data.split(/\n/).slice(732, 745);
      //   break;
      // case 'European Union':
      //   table = data.split(/\n/).slice(745, 757);
      //   break;
      case 'Fiji':
        table = data.split(/\n/).slice(757, 769);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Fiji_on_the_globe_%28small_islands_magnified%29_%28Polynesia_centered%29.svg';
        break;
      case 'Finland':
        table = data.split(/\n/).slice(769, 781);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/6e/EU-Finland.svg';
        break;
      case 'France':
        table = data.split(/\n/).slice(781, 793);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a4/EU-France_%28orthographic_projection%29.svg';
        break;
      case 'Gabon':
        table = data.split(/\n/).slice(793, 805);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Gabon_%28orthographic_projection%29.svg';
        break;
      case 'Gambia':
        table = data.split(/\n/).slice(805, 817);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/16/Gambia_%28orthographic_projection_with_inset%29.svg';
        break;
      case 'Georgia':
        table = data.split(/\n/).slice(817, 829);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/67/Georgia_%28orthographic_projection_with_inset%29.svg';
        break;
      case 'Germany':
        table = data.split(/\n/).slice(829, 841);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/af/EU-Germany_%28orthographic_projection%29.svg';
        break;
      case 'Ghana':
        table = data.split(/\n/).slice(841, 853);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ghana_%28orthographic_projection%29.svg';
        break;
      case 'Greece':
        table = data.split(/\n/).slice(853, 865);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/21/EU-Greece.svg';
        break;
      case 'Greenland':
        table = data.split(/\n/).slice(865, 877);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Greenland_%28orthographic_projection%29.svg';
        break;
      case 'Grenada':
        table = data.split(/\n/).slice(877, 889);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Grenada_on_the_globe_%28Americas_centered%29.svg';
        break;
      case 'Guam':
        table = data.split(/\n/).slice(889, 901);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Guam_on_the_globe_%28Southeast_Asia_centered%29_%28small_islands_magnified%29.svg';
        break;
      case 'Guatemala':
        table = data.split(/\n/).slice(901, 913);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Guatemala_%28orthographic_projection%29.svg';
        break;
      case 'Guinea':
        table = data.split(/\n/).slice(913, 925);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Guinea_%28orthographic_projection%29.svg';
        break;
      case 'Guinea-Bissau':
        table = data.split(/\n/).slice(925, 937);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Location_Guinea_Bissau_AU_Africa.svg';
        break;
      case 'Guyana':
        table = data.split(/\n/).slice(937, 949);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/21/GUY_orthographic.svg';
        break;
      case 'Haiti':
        table = data.split(/\n/).slice(949, 961);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Haiti_%28orthographic_projection%29.svg';
        break;
      // case 'High income':
      //   table = data.split(/\n/).slice(961, 973);
      //   break;
      case 'Honduras':
        table = data.split(/\n/).slice(973, 985);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/0c/HND_orthographic.svg';
        break;
      case 'Hungary':
        table = data.split(/\n/).slice(985, 997);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/60/EU-Hungary.svg';
        break;
      case 'Iceland':
        table = data.split(/\n/).slice(997, 1009);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Iceland_%28orthographic_projection%29.svg';
        break;
      case 'India':
        table = data.split(/\n/).slice(1009, 1021);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bb/India_%28orthographic_projection%29.svg';
        break;
      case 'Indonesia':
        table = data.split(/\n/).slice(1021, 1033);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Indonesia_%28orthographic_projection%29.svg';
        break;
      case 'Iran':
        table = data.split(/\n/).slice(1033, 1045);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Iran_%28orthographic_projection%29.svg';
        break;
      case 'Iraq':
        table = data.split(/\n/).slice(1045, 1057);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Iraq_%28orthographic%29.svg';
        break;
      case 'Ireland':
        table = data.split(/\n/).slice(1057, 1069);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/2a/EU-Ireland.svg';
        break;
      case 'Israel':
        table = data.split(/\n/).slice(1069, 1081);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Israel_%28orthographic_projection%29_with_occupied_territories.svg';
        break;
      case 'Italy':
        table = data.split(/\n/).slice(1081, 1093);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/EU-Italy_%28orthographic_projection%29.svg';
        break;
      case 'Jamaica':
        table = data.split(/\n/).slice(1093, 1105);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Jamaica_%28orthographic_projection%29.svg';
        break;
      case 'Japan':
        table = data.split(/\n/).slice(1105, 1117);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/62/Japan_%28orthographic_projection%29.svg';
        break;
      case 'Jordan':
        table = data.split(/\n/).slice(1117, 1129);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Jordan_%28orthographic_projection%29.svg';
        break;
      case 'Kazakhstan':
        table = data.split(/\n/).slice(1129, 1141);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Kazakhstan_%28orthographic_projection%29.svg';
        break;
      case 'Kenya':
        table = data.split(/\n/).slice(1141, 1153);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Kenya_%28orthographic_projection%29.svg';
        break;
      case 'Kiribati':
        table = data.split(/\n/).slice(1153, 1165);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Kiribati_on_the_globe_%28Polynesia_centered%29.svg';
        break;
      case 'Kuwait':
        table = data.split(/\n/).slice(1165, 1177);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/41/KWT_orthographic.svg';
        break;
      case 'Kyrgyzstan':
        table = data.split(/\n/).slice(1177, 1189);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Kyrgyzstan_%28orthographic_projection%29.svg';
        break;
      case 'Laos':
        table = data.split(/\n/).slice(1189, 1201);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Laos_%28orthographic_projection%29.svg';
        break;
      // case 'Latin America and Caribbean':
      //   table = data.split(/\n/).slice(1201, 1213);
      //   break;
      case 'Latvia':
        table = data.split(/\n/).slice(1213, 1225);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/32/EU-Latvia.svg';
        break;
      case 'Lebanon': 
        table = data.split(/\n/).slice(1225, 1237);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Lebanon_%28orthographic_projection%29.svg';
        break;
      case 'Lesotho':
        table = data.split(/\n/).slice(1237, 1249);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Lesotho_%28orthographic_projection%29.svg';
        break;
      case 'Liberia':
        table = data.split(/\n/).slice(1249, 1261);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/91/Liberia_%28orthographic_projection%29.svg';
        break;
      case 'Libya':
        table = data.split(/\n/).slice(1261, 1273);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Libya_%28centered_orthographic_projection%29.svg';
        break;
      case 'Lithuania':
        table = data.split(/\n/).slice(1273, 1285);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/EU-Lithuania.svg';
        break;
      // case 'Low and middle income':
      //   table = data.split(/\n/).slice(1285, 1297);
      //   break;
      // case 'Low income':
      //   table = data.split(/\n/).slice(1297, 1309);
      //   break;
      // case 'Lower middle income':
      //   table = data.split(/\n/).slice(1309, 1321);
      //   break;
      case 'Luxembourg':
        table = data.split(/\n/).slice(1321, 1333);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/c3/EU-Luxembourg.svg';
        break;
      case 'Madagascar':
        table = data.split(/\n/).slice(1333, 1345);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Madagascar_%28centered_orthographic_projection%29.svg';
        break;
      case 'Malawi':
        table = data.split(/\n/).slice(1345, 1357);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Malawi_%28orthographic_projection%29.svg';
        break;
      case 'Malaysia':
        table = data.split(/\n/).slice(1357, 1369);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/23/Malaysia_%28orthographic_projection%29.svg';
        break;
      case 'Maldives':
        table = data.split(/\n/).slice(1369, 1381);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Maldives_%28orthographic_projection%29.svg';
        break;
      case 'Mali':
        table = data.split(/\n/).slice(1381, 1393);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Mali_%28orthographic_projection%29.svg';
        break;
      case 'Malta':
        table = data.split(/\n/).slice(1393, 1405);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/63/EU-Malta.svg';
        break;
      case 'Marshall Islands':
        table = data.split(/\n/).slice(1405, 1417);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Marshall_Islands_on_the_globe_%28small_islands_magnified%29_%28Polynesia_centered%29.svg';
        break;
      case 'Mauritania':
        table = data.split(/\n/).slice(1417, 1429);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Mauritania_%28orthographic_projection%29.svg';
        break;
      case 'Mauritius':
        table = data.split(/\n/).slice(1429, 1441);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Mauritius_%28orthographic_projection_with_inset%29.svg';
        break;
      case 'Mexico':
        table = data.split(/\n/).slice(1441, 1453);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/06/MEX_orthographic.svg';
        break;
      case 'Micronesia (country)':
        table = data.split(/\n/).slice(1453, 1465);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Micronesia_on_the_globe_%28small_islands_magnified%29_%28Polynesia_centered%29.svg';
        break;
      // case 'Middle East and North Africa':
      //   table = data.split(/\n/).slice(1465, 1477);
      //   break;
      // case 'Middle income':
      //   table = data.split(/\n/).slice(1477, 1489);
      //   break;
      case 'Moldova':
        table = data.split(/\n/).slice(1489, 1501);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Location_Moldova_Europe.png';
        break;
      case 'Mongolia':
        table = data.split(/\n/).slice(1501, 1513);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Mongolia_%28orthographic_projection%29.svg';
        break;
      case 'Montenegro':
        table = data.split(/\n/).slice(1513, 1525);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Europe-Montenegro.svg';
        break;
      case 'Morocco':
        table = data.split(/\n/).slice(1525, 1537);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/78/Morocco_%28orthographic_projection%2C_WS_claimed%29.svg';
        break;
      case 'Mozambique':
        table = data.split(/\n/).slice(1537, 1549);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/84/Mozambique_%28orthographic_projection%29.svg';
        break;
      case 'Myanmar':
        table = data.split(/\n/).slice(1549, 1561);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Myanmar_%28orthographic_projection%29.svg';
        break;
      case 'Namibia':
        table = data.split(/\n/).slice(1561, 1573);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Namibia_%28orthographic_projection%29.svg';
        break;
      case 'Nepal': 
        table = data.split(/\n/).slice(1573, 1585);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Nepal_%28orthographic_projection%29.svg';
        break;
      case 'Netherlands':
        table = data.split(/\n/).slice(1585, 1597);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/27/EU-Netherlands.svg';
        break;
      case 'New Zealand':
        table = data.split(/\n/).slice(1597, 1609);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/46/New_Zealand_on_the_globe_%28New_Zealand_centered%29.svg';
        break;
      case 'Nicaragua':
        table = data.split(/\n/).slice(1609, 1621);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/34/NIC_orthographic.svg';
        break;
      case 'Niger':
        table = data.split(/\n/).slice(1621, 1633);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/88/Niger_%28orthographic_projection%29.svg';
        break;
      case 'Nigeria':
        table = data.split(/\n/).slice(1633, 1645);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Nigeria_%28orthographic_projection%29.svg';
        break;
      // case 'North America':
      //   table = data.split(/\n/).slice(1645, 1657);
      //   break;
      case 'North Korea':
        table = data.split(/\n/).slice(1657, 1669);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Democratic_People%27s_Republic_of_Korea_%28orthographic_projection%29.svg';
        break;
      case 'North Macedonia':
        table = data.split(/\n/).slice(1669, 1681);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Europe-Republic_of_North_Macedonia.svg';
        break;
      case 'Northern Mariana Islands':
        table = data.split(/\n/).slice(1681, 1693);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Northern_Mariana_Islands_on_the_globe_%28Southeast_Asia_centered%29_%28small_islands_magnified%29.svg';
        break;
      case 'Norway':
        table = data.split(/\n/).slice(1694, 1705);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Europe-Norway_%28orthographic_projection%29.svg';
        break;
      case 'Oman': 
        table = data.split(/\n/).slice(1705, 1717);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Oman_%28better%29_%28orthographic_projection%29.svg';
        break;
      case 'Pakistan':
        table = data.split(/\n/).slice(1717, 1729);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/ea/PAK_orthographic.svg';
        break;
      case 'Palestine':
        table = data.split(/\n/).slice(1729, 1741);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/ad/State_of_Palestine_%28orthographic_projection%29.svg';
        break;
      case 'Panama':
        table = data.split(/\n/).slice(1741, 1753);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/39/PAN_orthographic.svg';
        break;
      case 'Papua New Guinea':
        table = data.split(/\n/).slice(1753, 1765);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/79/Papua_New_Guinea_%28orthographic_projection%29.svg';
        break;
      case 'Paraguay':
        table = data.split(/\n/).slice(1765, 1777);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/PRY_orthographic.svg';
        break;
      case 'Peru':
        table = data.split(/\n/).slice(1777, 1789);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/07/PER_orthographic.svg';
        break;
      case 'Philippines':
        table = data.split(/\n/).slice(1789, 1801);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/PHL_orthographic.svg';
        break;
      case 'Poland':
        table = data.split(/\n/).slice(1801, 1813);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/5/57/EU-Poland_%28orthographic_projection%29.svg';
        break;
      case 'Portugal':
        table = data.split(/\n/).slice(1813, 1825);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a5/EU-Portugal_%28orthographic_projection%29.svg';
        break;
      case 'Puerto Rico':
        table = data.split(/\n/).slice(1825, 1837);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Puerto_Rico_%28orthographic_projection%29.svg';
        break;
      case 'Qatar':
        table = data.split(/\n/).slice(1837, 1849);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d4/QAT_orthographic.svg';
        break;
      case 'Romania':
        table = data.split(/\n/).slice(1849, 1861);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/13/EU-Romania.svg';
        break;
      case 'Russia':
        table = data.split(/\n/).slice(1861, 1873);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Russian_Federation_%28orthographic_projection%29_-_Crimea_disputed.svg';
        break;
      case 'Rwanda':
        table = data.split(/\n/).slice(1873, 1885);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/60/Location_Rwanda_AU_Africa.svg';
        break;
      case 'Saint Lucia':
        table = data.split(/\n/).slice(1885, 1897);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/97/Saint_Lucia_on_the_globe_%28Americas_centered%29.svg';
        break;
      case 'Saint Vincent and the Grenadines':
        table = data.split(/\n/).slice(1897, 1909);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/70/VCT_orthographic.svg';
        break;
      case 'Samoa':
        table = data.split(/\n/).slice(1909, 1921);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/74/Samoa_on_the_globe_%28Polynesia_centered%29.svg';
        break;
      case 'Sao Tome and Principe':
        table = data.split(/\n/).slice(1921, 1933);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/35/Location_S%C3%A3o_Tom%C3%A9_and_Pr%C3%ADncipe_AU_Africa.svg';
        break;
      case 'Saudi Arabia':
        table = data.split(/\n/).slice(1933, 1945);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Saudi_Arabia_%28orthographic_projection%29.svg';
        break;
      case 'Senegal':
        table = data.split(/\n/).slice(1945, 1957);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Senegal_%28orthographic_projection%29.svg';
        break;
      case 'Serbia':
        table = data.split(/\n/).slice(1957, 1969);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Serbia_%28orthographic_projection%29.svg';
        break;
      case 'Seychelles':
        table = data.split(/\n/).slice(1969, 1981);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Location_Seychelles_AU_Africa.svg';
        break;
      case 'Sierra Leone':
        table = data.split(/\n/).slice(1981, 1993);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/38/Sierra_Leone_%28orthographic_projection%29.svg';
        break;
      case 'Singapore':
        table = data.split(/\n/).slice(1993, 2005);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/37/Singapore_on_the_globe_%28Southeast_Asia_centered%29_zoom.svg';
        break;
      case 'Slovakia':
        table = data.split(/\n/).slice(2005, 2017);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/EU-Slovakia.svg';
        break;
      case 'Slovenia':
        table = data.split(/\n/).slice(2017, 2029);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/84/EU-Slovenia.svg';
        break;
      case 'Solomon Islands':
        table = data.split(/\n/).slice(2029, 2041);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Solomon_Islands_on_the_globe_%28Oceania_centered%29.svg';
        break;
      case 'Somalia':
        table = data.split(/\n/).slice(2041, 2053);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Somalia_%28orthographic_projection%29.svg';
        break;
      case 'South Africa':
        table = data.split(/\n/).slice(2053, 2065);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/6e/South_Africa_%28orthographic_projection%29.svg';
        break;
      // case 'South Asia': 
      //   table = data.split(/\n/).slice(2065, 2077);
      //   break;
      case 'South Korea':
        table = data.split(/\n/).slice(2077, 2089);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Republic_of_Korea_%28orthographic_projection%29.svg';
        break;
      case 'South Sudan':
        table = data.split(/\n/).slice(2089, 2101);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/South_Sudan_%28orthographic_projection%29_highlighted.svg';
        break;
      case 'Spain':
        table = data.split(/\n/).slice(2101, 2113);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/21/EU-Spain.svg';
        break;
      case 'Sri Lanka':
        table = data.split(/\n/).slice(2113, 2125);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/96/Sri_Lanka_%28orthographic_projection%29.svg';
        break;
      // case 'Sub-Saharan Africa':
      //   table = data.split(/\n/).slice(2125, 2137);
      //   break;
      case 'Sudan':
        table = data.split(/\n/).slice(2137, 2149);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sudan_%28orthographic_projection%29.svg';
        break;
      case 'Suriname':
        table = data.split(/\n/).slice(2149, 2161);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/72/SUR_orthographic.svg';
        break;
      case 'Sweden':
        table = data.split(/\n/).slice(2161, 2173);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/c2/EU-Sweden_%28orthographic_projection%29.svg';
        break;
      case 'Switzerland':
        table = data.split(/\n/).slice(2173, 2185);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/61/Europe-Switzerland.svg';
        break;
      case 'Syria':
        table = data.split(/\n/).slice(2185, 2197);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/11/Syria_%28orthographic_projection%29.svg';
        break;
      case 'Tajikistan':
        table = data.split(/\n/).slice(2197, 2209);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Tajikistan_%28orthographic_projection%29.svg';
        break;
      case 'Tanzania':
        table = data.split(/\n/).slice(2209, 2221);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Tanzania_%28orthographic_projection%29.svg';
        break;
      case 'Thailand':
        table = data.split(/\n/).slice(2221, 2233);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Thailand_%28orthographic_projection%29.svg';
        break;
      case 'Timor':
        table = data.split(/\n/).slice(2233, 2244);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Timor_Leste_%28orthographic_projection%29.svg';
        break;
      case 'Togo':
        table = data.split(/\n/).slice(2244, 2257);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Location_Togo_AU_Africa.svg';
        break;
      case 'Tonga':
        table = data.split(/\n/).slice(2257, 2269);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Tonga_on_the_globe_%28Polynesia_centered%29.svg';
        break;
      case 'Trinidad and Tobago':
        table = data.split(/\n/).slice(2269, 2281);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Trinidad_and_Tobago_%28orthographic_projection%29.svg';
        break;
      case 'Tunisia':
        table = data.split(/\n/).slice(2281, 2293);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Tunisia_location_%28orthographic_projection%29.svg';
        break;
      case 'Turkey':
        table = data.split(/\n/).slice(2293, 2305);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Turkey_%28orthographic_projection%29.svg';
        break;
      case 'Turkmenistan':
        table = data.split(/\n/).slice(2305, 2317);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Turkmenistan_on_the_globe_%28Afro-Eurasia_centered%29.svg';
        break;
      case 'Uganda':
        table = data.split(/\n/).slice(2317, 2329);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Uganda_%28orthographic_projection%29.svg';
        break;
      case 'Ukraine':
        table = data.split(/\n/).slice(2329, 2341);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Ukraine_-_disputed_%28orthographic_projection%29.svg';
        break;
      case 'United Arab Emirates':
        table = data.split(/\n/).slice(2341, 2353);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/United_Arab_Emirates_%28orthographic_projection%29.svg';
        break;
      case 'United Kingdom':
        table = data.split(/\n/).slice(2353, 2365);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/da/Europe-UK_%28orthographic_projection%29.svg';
        break;
      case 'United States':
        table = data.split(/\n/).slice(2365, 2377);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/dc/USA_orthographic.svg';
        break;
      case 'United States Virgin Islands':
        table = data.split(/\n/).slice(2377, 2389);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/United_States_Virgin_Islands_on_the_globe_%28Americas_centered%29.svg';
        break;
      // case 'Upper middle income':
      //   table = data.split(/\n/).slice(2389, 2401);
      //   break;
      case 'Uruguay':
        table = data.split(/\n/).slice(2401, 2413);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/4/43/URY_orthographic.svg';
        break;
      case 'Uzbekistan':
        table = data.split(/\n/).slice(2413, 2425);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/7/76/%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD_%D0%BD%D0%B0_%D0%B3%D0%BB%D0%BE%D0%B1%D1%83%D1%81%D0%B5.svg'
        break;
      case 'Vanuatu':
        table = data.split(/\n/).slice(2425, 2437);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Vanuatu_on_the_globe_%28Polynesia_centered%29.svg';
        break;
      case 'Venezuela':
        table = data.split(/\n/).slice(2437, 2449);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Venezuela_Orthographic_Map.svg';
        break;
      case 'Vietnam':
        table = data.split(/\n/).slice(2449, 2461);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/28/Vietnam_%28orthographic_projection%29.svg';
        break;
      // case 'World':
      //   table = data.split(/\n/).slice(2461, 2473);
      //   break;
      case 'Yemen':
        table = data.split(/\n/).slice(2473, 2485);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Yemen_%28orthographic_projection%29.svg';
        break;
      case 'Zambia':
        table = data.split(/\n/).slice(2485, 2497);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/2/26/Zambia_%28orthographic_projection%29.svg';
        break;
      case 'Zimbabwe':
        table = data.split(/\n/).slice(2497,2509);
        countryMap = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Zimbabwe_%28orthographic_projection%29.svg';
        break;
      default:
        null;
    }
    // console.log(table);

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

      // console.log(ninety, seventeen)
      console.log(country, year, pm25);
    });

    ninety = parseFloat(ninety);
    seventeen = parseFloat(seventeen);

    // console.log(ninety, seventeen)

    return { xlabels, ypm25, countryName, ninety, seventeen, countryMap };
  };

  createChart('Afghanistan');
  createCountries();
  createChartForCountry();

});