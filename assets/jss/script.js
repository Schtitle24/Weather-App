const mainDiv = document.querySelector("#current");
const form = document.querySelector('form');
const userSearch = document.querySelector('#input')

const mockData = [
  {
    city: 'Austin',
    date: new Date(),
    temp: '76.62 F',
    wind: "8.43 mph",
    humidity: "63%"
  }
]

function getCityLat(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=b9047678ef9479ef9ad4ca22e0b5c564`)
    .then(response => response.json())
    .then(data => {
      const forecastData = data.list;

      const indexes = [4, 12, 20, 28, 36];

      indexes.forEach(index => {
        const forecast = forecastData[index];
        const card = createWeatherCard(forecast);
        const container = document.querySelector('#fiveDay');
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function createWeatherCard(forecast) {
  const card = document.createElement("div");
  card.classList.add("card");

  const date = document.createElement("p");
  date.textContent = forecast.dt_txt;
  card.appendChild(date);

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${forecast.main.temp}°F`;
  card.appendChild(temperature);

  const wind = document.createElement("p");
  wind.textContent = `Wind: ${forecast.wind.speed} mph`;
  card.appendChild(wind);

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${forecast.main.humidity}%`;
  card.appendChild(humidity);

  return card;
}



function searchCity(city) {
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=b9047678ef9479ef9ad4ca22e0b5c564`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.length > 0) {
        const { lat, lon } = data[0];
        getCityLat(lat, lon);
      } else {
        console.log("No results found for the city");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}
function handleSearch (event) {
  event.preventDefault();

  const userInput = userSearch.value.trim();
  console.log(userInput);
  searchCity(userInput);
}

// getCityLat(); // delete this
form.addEventListener("submit", handleSearch);

function renderWeather () {
 for (let i = 0; i < mockData.length; i++) { 
  const forecast = mockData[i]



  const col = document.createElement("div");
  col.classList = "col-9 me-5 float-end";

  const card = document.createElement("div");
  card.classList = 'card';

  const image = document.createElement('img');
  image.classList = 'card-img-top';

  const cardBody = document.createElement('div');
  cardBody.classList = 'card-body';

  const city = document.createElement('h2');
  city.classList = 'card-title';
  city.textContent = forecast.city;


  const date = document.createElement('h5');
  date.classList = 'card-title';
  date.textContent = forecast.date;

  const temp = document.createElement('p');
  temp.classList = 'card-text';
  temp.textContent = forecast.temp;

 
  const wind = document.createElement('p');
  wind.classList = 'card-text';
  wind.textContent = forecast.wind;

  const humidity = document.createElement('p');
  humidity.classList = 'card-text';
  humidity.textContent = forecast.humidity;



  cardBody.appendChild(city)
  cardBody.appendChild(date)
  cardBody.appendChild(temp)
  cardBody.appendChild(wind)
  cardBody.appendChild(humidity)



  card.appendChild(image);
  card.appendChild(cardBody);

  col.appendChild(card);

  mainDiv.append(col);
 }
}

renderWeather();



//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col-2">
//     <div class="card">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col-2">
//     <div class="card">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col-2">
//     <div class="card">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
//   <div class="col-2">
//     <div class="card">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
// </div>











// <div class="btn-group-vertical " role="group" aria-label="Vertical button group">
//   <button type="button" class="btn btn-primary">Button</button>
//   <button type="button" class="btn btn-primary">Button</button>
//   <button type="button" class="btn btn-primary">Button</button>
//   <button type="button" class="btn btn-primary">Button</button>
//   <button type="button" class="btn btn-primary">Button</button>
// </div> */}