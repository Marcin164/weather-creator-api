import { Schema } from 'mongoose';

const WeatherDetailsSchema = new Schema({
    day:String,
    city:String,
    data:[{
        hour:Number,
        humidity:Number,
        temperature:Number
        }
    ],
    windStrength: Number,
    windDirection: String,
    pressure:Number,
    sunRiseTime:String,
    moonRiseTime:String,
    weatherType:String
});

const WeatherDetails = mongoose.model('WeatherDetails', WeatherDetailsSchema);

export default WeatherDetails;