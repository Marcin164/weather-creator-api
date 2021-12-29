import express from "express"
import {createWeather} from "../controllers/weatherController"
const router = express.Router();


router.get('/', createWeather);

export default router;