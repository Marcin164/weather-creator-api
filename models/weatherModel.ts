import { Schema, model } from "mongoose";

const WeatherSchema:Schema = new Schema({
  date: String,
  city: String,
  data: [
    {
      hour: Number,
      humidity: Number,
      temperature: Number,
      windStrength: Number,
      windDirection: String,
      pressure: Number,
      weather: String,
      rainFall: Number,
    },
  ],
  airQuality: [
    {
      tag: String,
      value: Number,
    },
  ],
  sunRise: String,
  moonRise: String,
});

WeatherSchema.statics.checkIfWeatherExists = async function():Promise<Boolean | number> {
  const weather:Array<String | Number | Date | Array<Object>> = await this.find()
  console.log(weather.length)
  if(weather) return weather.length
  return false
};

WeatherSchema.statics.deleteWeather = function(condition: Object){
  this.deleteMany(condition)
}

WeatherSchema.statics.createWeather = function(weatherObject:Object){
  const weather = new this(weatherObject)

  weather.save((err:Error) => {
    if (err) return err
  })
}

const WeatherModel:any = model("weather", WeatherSchema);

export default WeatherModel;