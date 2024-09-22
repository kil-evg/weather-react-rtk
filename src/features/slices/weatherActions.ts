import { AppDispatch } from "../../app/store"
import { api_key, base_url } from "../../utils/constant";
import { putMessage } from "./messageSlice"
import { putWeatherInfo } from "./weatherSlice";


export const fetchWeather = (city: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(putMessage('Loading...'));
        try {
            const response = await fetch(`${base_url}?q=${city}&appid=${api_key}&units=metric`)
            const data = await response.json()
            const info = {
                city: data.name,
                country: data.sys.country,
                temp: data.main.temp,
                pressure: data.main.pressure,
                sunset: data.sys.sunset
            }
            dispatch(putWeatherInfo(info));
            dispatch(putMessage(''))
        } catch (e) {
            dispatch(putMessage('Enter correct city name'))
        }
    }
}


// const getWeather = async (city: string) => {
//     try {
//         const response = await fetch(`${base_url}?q=${city}&appid=${api_key}&units=metric`)
//         const data = await response.json()
//         const info = {
//             city: data.name,
//             country: data.sys.country,
//             temp: data.main.temp,
//             pressure: data.main.pressure,
//             sunset: data.sys.sunset
//         }
//         dispatch(putWeatherInfo(info));
//         dispatch(putMessage(''))
//     } catch (e) {
//         dispatch(putMessage('Enter correct city name'))
//     }

// }