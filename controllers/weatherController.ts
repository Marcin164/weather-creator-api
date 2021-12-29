import Weather from "../models/weatherModel";

const citiesArray = [
  "Warsaw",
  "Dubai",
  "Paris",
  "Moscow",
  "Sydney",
  "L.A.",
  "Rio de Janeiro",
  "Washington",
  "Amsterdam",
  "Athens",
  "Barcelona",
  "Berlin",
  "Genewa",
  "Copenhagen",
  "Lisbon",
  "London",
  "Madrid",
  "Cracow",
  "Wroclaw",
  "Oslo",
  "Rome",
  "Vienna",
  "Stockholm",
  "Venice",
  "Melbourne",
  "Shanghai",
  "Cairo",
  "Tel Aviv",
  "Chicago",
  "Las Vegas",
  "Quebec",
];

const windDirectionArray = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];

const weatherNameArray = [
  "Sunny",
  "Fog",
  "Rain",
  "Sleet",
  "Snow",
  "Thunderstorm",
  "Cloudy",
  "Hail",
  "Rain-Snow",
  "Sleet-Storm",
  "Sprinkle",
  "Windy",
];

const airTagArray = [
  "SO2",
  "NO2",
  "CO",
  "O3",
  "PM1",
  "PM2.5",
  "PM5",
  "PM7",
  "PM10",
];

let date: Date = new Date();

export const createWeather = async (req: any, res: any) => {
  const checkIfWeatherExists: Promise<Boolean | number> =
    await Weather.checkIfWeatherExists();

  if ((await checkIfWeatherExists) !== 217) {
    createSevenDaysWeather();
  }
};

const createSevenDaysWeather = () => {
  let day: number = date.getDate()-1;
  let month: number = date.getMonth()+1;
  let year: number = date.getFullYear();

  Weather.deleteWeather(undefined);
  for (let numberOfDay = 0; numberOfDay < 7; numberOfDay++) {
    for (let city = 0; city < citiesArray.length; city++) {
      day += 1
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31) {
          day = 1;
    
          if(month + 1 > 12){
            month = 1
            year += 1
          }else{
            month+=1
          }
    
        }
      }
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (day > 30) {
          day = 1;
          
          if(month + 1 > 12){
            month = 1
            year += 1
          }else{
            month+=1
          }
    
        }
      }
      if (month == 2) {
        if ((0 == year % 4 && 0 != year % 100) || 0 == year % 400) {
          if (day > 29) {
            day = 1;
    
            if(month + 1 > 12){
              month = 1
              year += 1
            }else{
              month+=1
            }
    
          }
        } else {
          if (day > 28) {
            day = 1;
    
            if(month + 1 > 12){
              month = 1
              year += 1
            }else{
              month+=1
            }
    
          }
        }
      }
      console.log(`Ilosc dni ${numberOfDay}, dzien: ${day}`)
      Weather.createWeather(createData(numberOfDay, city, day, month, year));
    }
  }
};
const createData = (numberOfDay: number, city: number, day:number, month:number, year:number): Object => {
  const weather = {
    date: setDate(day, month, year),
    city: setCity(city),
    data: setData(),
    airQuality: setAirQuality(),
    sunRise: setSunRise(),
    moonRise: setMoonRise(),
  };

  return weather;
};

const setDate = (day:number, month:number, year:number): String => {
  return `${day}.${month}.${year}`;
};

const setCity = (city: number): String => {
  return citiesArray[city];
};

const setData = (): Array<Object> => {
  const weatherArray: Array<Object> = [];
  for (let hour = 0; hour < 25; hour++) {
    const weatherObject: Object = {
      hour: hour,
      humidity: Math.floor(Math.random() * 40) + 1,
      temperature: Math.floor(Math.random() * 25) + -5,
      windStrength: Math.floor(Math.random() * 12) + 1,
      windDirection:
        windDirectionArray[
          Math.floor(Math.random() * windDirectionArray.length)
        ],
      pressure: Math.floor(Math.random() * 20) + 990,
      weather:
        weatherNameArray[Math.floor(Math.random() * weatherNameArray.length)],
      rainFall: Math.floor(Math.random() * 20) + 1,
    };

    weatherArray.push(weatherObject);
  }
  return weatherArray;
};

const setAirQuality = (): Array<Object> => {
  const airQualityArray = [];
  for (let airTag = 0; airTag < airTagArray.length; airTag++) {
    const airQualityObject: Object = {
      tag: airTagArray[airTag],
      value: (Math.floor(Math.random() * 20) + 1) / 100,
    };

    airQualityArray.push(airQualityObject);
  }

  return airQualityArray;
};

const setSunRise = (): String => {
  return "6:43";
};

const setMoonRise = (): String => {
  return "19:03";
};
