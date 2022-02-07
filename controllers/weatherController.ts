import Weather from "../models/weatherModel";
import Helper from "../helpers/dateHelper"

const citiesArray: Array<string> = [
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

const windDirectionArray: Array<string> = [
  "North",
  "North-East",
  "East",
  "South-East",
  "South",
  "South-West",
  "West",
  "North-West",
];

const weatherNameArray: Array<string> = [
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

const airTagArray: Array<string> = [
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

const airQualityStatusArray: Array<Object> = [
  {
    title: "Good",
    subTitle: "Take a deep breathe"
  },
  {
    title: "Not bad",
    subTitle: "It's safe to go outside"
  },
  {
    title: "Bad",
    subTitle: "Better stay home"
  },
  {
    title: "Terrible",
    subTitle: "Don't open the window"
  }
]

let date: Date = new Date();

export const createWeather = async (req: any, res: any) => {
    await Weather.deleteWeather();
    createSevenDaysWeather();
};

const createSevenDaysWeather = () => {
  let day: number = date.getDate();
  let month: number = date.getMonth()+1;
  let year: number = date.getFullYear();

  for (let numberOfDay:number = 0; numberOfDay < 7; numberOfDay++) {
    for (let city:number = 0; city < citiesArray.length; city++) {

      let dateHelper = new Helper(day, month, year, numberOfDay)
      let dateObject = dateHelper.changeMonthAndYear()
      
      Weather.createWeather(createData(city, dateObject.day, dateObject.month, dateObject.year));
    }
  }
};

const createData = (city: number, day:number, month:number, year:number): Object => {
  const weather = {
    date: setDate(day, month, year),
    city: setCity(city),
    data: setData(),
    airQuality: setAirQuality(),
    airQualityStatus: setAirQualityStatus(),
    sunRise: setSunRise(),
    moonRise: setMoonRise(),
  };

  return weather;
};

const setDate = (day:number, month:number, year:number): string => {
  return `${day}.${month}.${year}`;
};

const setCity = (city: number): string => {
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

const setAirQualityStatus = () => {
  return airQualityStatusArray[(Math.floor(Math.random() * airQualityStatusArray.length))]
}

const setSunRise = (): String => {
  return "6:43";
};

const setMoonRise = (): String => {
  return "19:03";
};
