document.addEventListener("DOMContentLoaded", () => {
  // console.log("DOMContentLoaded");
  let myChart;
  createChart('Afghanistan');

  const arrayOfCountries = [
    'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 
    'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 
    'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Cyprus',
    'Czechia', 'Democratic Republic of Congo', 'Denmark', 'Djibouti', 'Dominica'
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

  createCountries();
  createChartForCountry();

  function createChartForCountry() {
    arrayOfCountries.forEach(country => document.getElementById(country.replace(/ /g, '')).addEventListener("click", (e) => {
      e.preventDefault();
      if (myChart) {
        myChart.destroy();
      }
      createChart(country);
    }));
  }

  async function createChart(field) {
    const data = await getData(field);
    const ctx = document.getElementById('canvasChart').getContext('2d');
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
    const response = await fetch('./src/PM25-air-pollution.csv');
    const data = await response.text();

    let table;
    switch (field) {
      case 'Afghanistan':
        table = data.split(/\n/).slice(1,13);
        break;
      case 'Albania':
        table = data.split(/\n/).slice(13,25);
        break;
      case 'Algeria':
        table = data.split(/\n/).slice(25, 37);
        break;
      case 'American Samoa':
        table = data.split(/\n/).slice(37, 49);
        break;
      case 'Andorra':
        table = data.split(/\n/).slice(49, 61);
        break;
      case 'Angola':
        table = data.split(/\n/).slice(61, 73);
        break;
      case 'Antigua and Barbuda':
        table = data.split(/\n/).slice(73, 85);
        break;
      case 'Argentina':
        table = data.split(/\n/).slice(85, 97);
        break;
      case 'Armenia':
        table = data.split(/\n/).slice(97, 109);
        break;
      case 'Australia':
        table = data.split(/\n/).slice(109, 121);
        break;
      case 'Austria':
        table = data.split(/\n/).slice(121, 133);
        break;
      case 'Azerbaijan':
        table = data.split(/\n/).slice(133, 145);
        break;
      case 'Bahamas':
        table = data.split(/\n/).slice(145, 157);
        break;
      case 'Bahrain':
        table = data.split(/\n/).slice(157, 169);
        break;
      case 'Bangladesh':
        table = data.split(/\n/).slice(169, 182);
        break;
      case 'Barbados':
        table = data.split(/\n/).slice(182, 193);
        break;
      case 'Belarus':
        table = data.split(/\n/).slice(193, 205);
        break;
      case 'Belgium':
        table = data.split(/\n/).slice(205, 217);
        break;
      case 'Belize':
        table = data.split(/\n/).slice(217, 229);
        break;
      case 'Benin':
        table = data.split(/\n/).slice(229, 241);
        break;
      case 'Bermuda':
        table = data.split(/\n/).slice(241, 253);
        break;
      case 'Bhutan':
        table = data.split(/\n/).slice(253, 265);
        break;
      case 'Bolivia':
        table = data.split(/\n/).slice(265, 277);
        break;
      case 'Bosnia and Herzegovina':
        table = data.split(/\n/).slice(277, 289);
        break;
      case 'Botswana':
        table = data.split(/\n/).slice(289, 301);
        break;
      case 'Brazil':
        table = data.split(/\n/).slice(301, 313);
        break;
      case 'Brunei':
        table = data.split(/\n/).slice(313, 325);
        break;
      case 'Bulgaria':
        table = data.split(/\n/).slice(325, 337);
        break;
      case 'Burkina Faso':
        table = data.split(/\n/).slice(337, 349);
        break;
      case 'Burundi':
        table = data.split(/\n/).slice(349, 361);
        break;
      case 'Cambodia':
        table = data.split(/\n/).slice(361, 373);
        break;
      case 'Cameroon':
        table = data.split(/\n/).slice(373, 385);
        break;
      case 'Canada':
        table = data.split(/\n/).slice(385, 397);
        break;
      case 'Cape Verde':
        table = data.split(/\n/).slice(397, 409);
        break;
      case 'Central African Republic':
        table = data.split(/\n/).slice(409, 421);
        break;
      case 'Chad':
        table = data.split(/\n/).slice(421, 433);
        break;
      case 'Chile':
        table = data.split(/\n/).slice(433, 445);
        break;
      case 'China':
        table = data.split(/\n/).slice(445, 457);
        break;
      case 'Colombia':
        table = data.split(/\n/).slice(457, 469);
        break;
      case 'Comoros':
        table = data.split(/\n/).slice(469, 481);
        break;
      case 'Congo':
        table = data.split(/\n/).slice(481, 493);
        break;
      case 'Costa Rica':
        table = data.split(/\n/).slice(493, 505);
        break;
      case "Cote d'Ivoire":
        table = data.split(/\n/).slice(505, 517);
        break;
      case 'Croatia':
        table = data.split(/\n/).slice(517, 529);
        break;
      case 'Cuba':
        table = data.split(/\n/).slice(529, 541);
        break;
      case 'Cyprus':
        table = data.split(/\n/).slice(541, 553);
        break;
      case 'Czechia':
        table = data.split(/\n/).slice(553, 565);
        break;
      case 'Democratic Republic of Congo':
        table = data.split(/\n/).slice(565, 577);
        break;
      case 'Denmark':
        table = data.split(/\n/).slice(577, 589);
        break;
      case 'Djibouti':
        table = data.split(/\n/).slice(589, 601);
        break;
      case 'Dominica':
        table = data.split(/\n/).slice(601, 613);
        break;
      case 'Dominican Republic':
        table = data.split(/\n/).slice(613, 625);
        break;
      case 'East Asia and Pacific': 
        table = data.split(/\n/).slice(625, 637);
        break;
      case 'Ecuador':
        table = data.split(/\n/).slice(637, 649);
        break;
      case 'Egypt':
        table = data.split(/\n/).slice(649, 661);
        break;
      case 'El Salvador':
        table = data.split(/\n/).slice(661, 673);
        break;
      case 'Equatorial Guinea':
        table = data.split(/\n/).slice(673, 685);
        break;
      case 'Eritrea': 
        table = data.split(/\n/).slice(685, 697);
        break;
      case 'Estonia':
        table = data.split(/\n/).slice(697, 709);
        break;
      case 'Eswatini': 
        table = data.split(/\n/).slice(709, 721);
        break;
      case 'Ethiopia':
        table = data.split(/\n/).slice(721, 732);
        break;
      case 'Europe and Central Asia':
        table = data.split(/\n/).slice(732, 745);
        break;
      case 'European Union':
        table = data.split(/\n/).slice(745, 757);
        break;
      case 'Fiji':
        table = data.split(/\n/).slice(757, 769);
        break;
      case 'Finland':
        table = data.split(/\n/).slice(769, 781);
        break;
      case 'France':
        table = data.split(/\n/).slice(781, 793);
        break;
      case 'Gabon':
        table = data.split(/\n/).slice(793, 805);
        break;
      case 'Gambia':
        table = data.split(/\n/).slice(805, 817);
        break;
      case 'Georgia':
        table = data.split(/\n/).slice(817, 829);
        break;
      case 'Germany':
        table = data.split(/\n/).slice(829, 841);
        break;
      case 'Ghana':
        table = data.split(/\n/).slice(841, 853);
        break;
      case 'Greece':
        table = data.split(/\n/).slice(853, 865);
        break;
      case 'Greenland':
        table = data.split(/\n/).slice(865, 877);
        break;
      case 'Grenada':
        table = data.split(/\n/).slice(877, 889);
        break;
      case 'Guam':
        table = data.split(/\n/).slice(889, 901);
        break;
      case 'Guatemala':
        table = data.split(/\n/).slice(901, 913);
        break;
      case 'Guinea':
        table = data.split(/\n/).slice(913, 925);
        break;
      case 'Guinea-Bissau':
        table = data.split(/\n/).slice(925, 937);
        break;
      case 'Guyana':
        table = data.split(/\n/).slice(937, 949);
        break;
      case 'Haiti':
        table = data.split(/\n/).slice(949, 961);
        break;
      case 'High income':
        table = data.split(/\n/).slice(961, 973);
        break;
      case 'Honduras':
        table = data.split(/\n/).slice(973, 985);
        break;
      case 'Hungary':
        table = data.split(/\n/).slice(985, 997);
        break;
      case 'Iceland':
        table = data.split(/\n/).slice(997, 1009);
        break;
      case 'India':
        table = data.split(/\n/).slice(1009, 1021);
        break;
      case 'Indonesia':
        table = data.split(/\n/).slice(1021, 1033);
        break;
      case 'Iran':
        table = data.split(/\n/).slice(1033, 1045);
        break;
      case 'Iraq':
        table = data.split(/\n/).slice(1045, 1057);
        break;
      case 'Ireland':
        table = data.split(/\n/).slice(1057, 1069);
        break;
      case 'Israel':
        table = data.split(/\n/).slice(1069, 1081);
        break;
      case 'Italy':
        table = data.split(/\n/).slice(1081, 1093);
        break;
      case 'Jamaica':
        table = data.split(/\n/).slice(1093, 1105);
        break;
      case 'Japan':
        table = data.split(/\n/).slice(1105, 1117);
        break;
      case 'Jordan':
        table = data.split(/\n/).slice(1117, 1129);
        break;
      case 'Kazakhstan':
        table = data.split(/\n/).slice(1129, 1141);
        break;
      case 'Kenya':
        table = data.split(/\n/).slice(1141, 1153);
        break;
      case 'Kiribati':
        table = data.split(/\n/).slice(1153, 1165);
        break;
      case 'Kuwait':
        table = data.split(/\n/).slice(1165, 1177);
        break;
      case 'Kyrgyzstan':
        table = data.split(/\n/).slice(1177, 1189);
        break;
      case 'Laos':
        table = data.split(/\n/).slice(1189, 1201);
        break;
      case 'Latin America and Caribbean':
        table = data.split(/\n/).slice(1201, 1213);
        break;
      case 'Latvia':
        table = data.split(/\n/).slice(1213, 1225);
        break;
      case 'Lebanon': 
        table = data.split(/\n/).slice(1225, 1237);
        break;
      case 'Lesotho':
        table = data.split(/\n/).slice(1237, 1249);
        break;
      case 'Liberia':
        table = data.split(/\n/).slice(1249, 1261);
        break;
      case 'Libya':
        table = data.split(/\n/).slice(1261, 1273);
        break;
      case 'Lithuania':
        table = data.split(/\n/).slice(1273, 1285);
        break;
      case 'Low and middle income':
        table = data.split(/\n/).slice(1285, 1297);
        break;
      case 'Low income':
        table = data.split(/\n/).slice(1297, 1309);
        break;
      case 'Lower middle income':
        table = data.split(/\n/).slice(1309, 1321);
        break;
      case 'Luxembourg':
        table = data.split(/\n/).slice(1321, 1333);
        break;
      case 'Madagascar':
        table = data.split(/\n/).slice(1333, 1345);
        break;
      case 'Malawi':
        table = data.split(/\n/).slice(1345, 1357);
        break;
      case 'Malaysia':
        table = data.split(/\n/).slice(1357, 1369);
        break;
      case 'Maldives':
        table = data.split(/\n/).slice(1369, 1381);
        break;
      case 'Mali':
        table = data.split(/\n/).slice(1381, 1393);
        break;
      case 'Malta':
        table = data.split(/\n/).slice(1393, 1405);
        break;
      case 'Marshall Islands':
        table = data.split(/\n/).slice(1405, 1417);
        break;
      case 'Mauritania':
        table = data.split(/\n/).slice(1417, 1429);
        break;
      case 'Mauritius':
        table = data.split(/\n/).slice(1429, 1441);
        break;
      case 'Mexico':
        table = data.split(/\n/).slice(1441, 1453);
        break;
      case 'Micronesia (country)':
        table = data.split(/\n/).slice(1453, 1465);
        break;
      case 'Middle East and North Africa':
        table = data.split(/\n/).slice(1465, 1477);
        break;
      case 'Middle income':
        table = data.split(/\n/).slice(1477, 1489);
        break;
      case 'Moldova':
        table = data.split(/\n/).slice(1489, 1501);
        break;
      case 'Mongolia':
        table = data.split(/\n/).slice(1501, 1513);
        break;
      case 'Montenegro':
        table = data.split(/\n/).slice(1513, 1525);
        break;
      case 'Morocco':
        table = data.split(/\n/).slice(1525, 1537);
        break;
      case 'Mozambique':
        table = data.split(/\n/).slice(1537, 1549);
        break;
      case 'Myanmar':
        table = data.split(/\n/).slice(1549, 1561);
        break;
      case 'Namibia':
        table = data.split(/\n/).slice(1561, 1573);
        break;
      case 'Nepal': 
        table = data.split(/\n/).slice(1573, 1585);
        break;
      case 'Netherlands':
        table = data.split(/\n/).slice(1585, 1597);
        break;
      case 'New Zealand':
        table = data.split(/\n/).slice(1597, 1609);
        break;
      case 'Nicaragua':
        table = data.split(/\n/).slice(1609, 1621);
        break;
      case 'Niger':
        table = data.split(/\n/).slice(1621, 1633);
        break;
      case 'Nigeria':
        table = data.split(/\n/).slice(1633, 1645);
        break;
      case 'North America':
        table = data.split(/\n/).slice(1645, 1657);
        break;
      case 'North Korea':
        table = data.split(/\n/).slice(1657, 1669);
        break;
      case 'North Macedonia':
        table = data.split(/\n/).slice(1669, 1681);
        break;
      case 'Northern Mariana Islands':
        table = data.split(/\n/).slice(1681, 1693);
        break;
      case 'Norway':
        table = data.split(/\n/).slice(1694, 1705);
        break;
      case 'Oman': 
        table = data.split(/\n/).slice(1705, 1717);
        break;
      case 'Pakistan':
        table = data.split(/\n/).slice(1717, 1729);
        break;
      case 'Palestine':
        table = data.split(/\n/).slice(1729, 1741);
        break;
      case 'Panama':
        table = data.split(/\n/).slice(1741, 1753);
        break;
      case 'Papua New Guinea':
        table = data.split(/\n/).slice(1753, 1765);
        break;
      case 'Paraguay':
        table = data.split(/\n/).slice(1765, 1777);
        break;
      case 'Peru':
        table = data.split(/\n/).slice(1777, 1789);
        break;
      case 'Philippines':
        table = data.split(/\n/).slice(1789, 1801);
        break;
      case 'Poland':
        table = data.split(/\n/).slice(1801, 1813);
        break;
      case 'Portugal':
        table = data.split(/\n/).slice(1813, 1825);
        break;
      case 'Puerto Rico':
        table = data.split(/\n/).slice(1825, 1837);
        break;
      case 'Qatar':
        table = data.split(/\n/).slice(1837, 1849);
        break;
      case 'Romania':
        table = data.split(/\n/).slice(1849, 1861);
        break;
      case 'Russia':
        table = data.split(/\n/).slice(1861, 1873);
        break;
      case 'Rwanda':
        table = data.split(/\n/).slice(1873, 1885);
        break;
      case 'Saint Lucia':
        table = data.split(/\n/).slice(1885, 1897);
        break;
      case 'Saint Vincent and the Grenadines':
        table = data.split(/\n/).slice(1897, 1909);
        break;
      case 'Samoa':
        table = data.split(/\n/).slice(1909, 1921);
        break;
      case 'Sao Tome and Principe':
        table = data.split(/\n/).slice(1921, 1933);
        break;
      case 'Saudi Arabia':
        table = data.split(/\n/).slice(1933, 1945);
        break;
      case 'Senegal':
        table = data.split(/\n/).slice(1945, 1957);
        break;
      case 'Serbia':
        table = data.split(/\n/).slice(1957, 1969);
        break;
      case 'Seychelles':
        table = data.split(/\n/).slice(1969, 1981);
        break;
      case 'Sierra Leone':
        table = data.split(/\n/).slice(1981, 1993);
        break;
      case 'Singapore':
        table = data.split(/\n/).slice(1993, 2005);
        break;
      case 'Slovakia':
        table = data.split(/\n/).slice(2005, 2017);
        break;
      case 'Slovenia':
        table = data.split(/\n/).slice(2017, 2029);
        break;
      case 'Solomon Islands':
        table = data.split(/\n/).slice(2029, 2041);
        break;
      case 'Somalia':
        table = data.split(/\n/).slice(2041, 2053);
        break;
      case 'South Africa':
        table = data.split(/\n/).slice(2053, 2065);
        break;
      case 'South Asia': 
        table = data.split(/\n/).slice(2065, 2077);
        break;
      case 'South Korea':
        table = data.split(/\n/).slice(2077, 2089);
        break;
      case 'South Sudan':
        table = data.split(/\n/).slice(2089, 2101);
        break;
      case 'Spain':
        table = data.split(/\n/).slice(2101, 2113);
        break;
      case 'Sri Lanka':
        table = data.split(/\n/).slice(2113, 2125);
        break;
      case 'Sub-Saharan Africa':
        table = data.split(/\n/).slice(2125, 2137);
        break;
      case 'Sudan':
        table = data.split(/\n/).slice(2137, 2149);
        break;
      case 'Suriname':
        table = data.split(/\n/).slice(2149, 2161);
        break;
      case 'Sweden':
        table = data.split(/\n/).slice(2161, 2173);
        break;
      case 'Switzerland':
        table = data.split(/\n/).slice(2173, 2185);
        break;
      case 'Syria':
        table = data.split(/\n/).slice(2185, 2197);
        break;
      case 'Tajikistan':
        table = data.split(/\n/).slice(2197, 2209);
        break;
      case 'Tanzania':
        table = data.split(/\n/).slice(2209, 2221);
        break;
      case 'Thailand':
        table = data.split(/\n/).slice(2221, 2233);
        break;
      case 'Timor':
        table = data.split(/\n/).slice(2233, 2244);
        break;
      case 'Togo':
        table = data.split(/\n/).slice(2244, 2257);
        break;
      case 'Tonga':
        table = data.split(/\n/).slice(2257, 2269);
        break;
      case 'Trinidad and Tobago':
        table = data.split(/\n/).slice(2269, 2281);
        break;
      case 'Tunisia':
        table = data.split(/\n/).slice(2281, 2293);
        break;
      case 'Turkey':
        table = data.split(/\n/).slice(2293, 2305);
        break;
      case 'Turkmenistan':
        table = data.split(/\n/).slice(2305, 2317);
        break;
      case 'Uganda':
        table = data.split(/\n/).slice(2317, 2329);
        break;
      case 'Ukraine':
        table = data.split(/\n/).slice(2329, 2341);
        break;
      case 'United Kingdom':
        table = data.split(/\n/).slice(2341, 2365);
        break;
      case 'United States':
        table = data.split(/\n/).slice(2365, 2377);
        break;
      case 'United States Virgin Islands':
        table = data.split(/\n/).slice(2377, 2389);
        break;
      case 'Upper middle income':
        table = data.split(/\n/).slice(2389, 2401);
        break;
      case 'Uruguay':
        table = data.split(/\n/).slice(2401, 2413);
        break;
      case 'Uzbekistan':
        table = data.split(/\n/).slice(2413, 2425);
        break;
      case 'Vanuatu':
        table = data.split(/\n/).slice(2425, 2437);
        break;
      case 'Venezuela':
        table = data.split(/\n/).slice(2437, 2449);
        break;
      case 'Vietnam':
        table = data.split(/\n/).slice(2449, 2461);
        break;
      case 'World':
        table = data.split(/\n/).slice(2461, 2473);
        break;
      case 'Yemen':
        table = data.split(/\n/).slice(2473, 2485);
        break;
      case 'Zambia':
        table = data.split(/\n/).slice(2485, 2497);
        break;
      case 'Zimbabwe':
        table = data.split(/\n/).slice(2497,2509);
        break;
      default:
        null;
    }
    // console.log(table);

    table.forEach((row) => {
      const columns = row.split(',');
      const country = columns[0];
      countryName.push(country);
      const abv = columns[1];
      const year = columns[2];
      xlabels.push(year);
      const pm25 = columns[3];
      ypm25.push(pm25);
      // console.log(country, year, pm25);
    });

    return { xlabels, ypm25, countryName };
  };
});