import { FormEvent, useState } from 'react';
import { api_key, base_url } from '../utils/constant';
import { useAppDispatch } from '../app/hooks';
import { putWeatherInfo } from '../features/slices/weatherSlice';
import { putMessage } from '../features/slices/messageSlice';

function Form() {
    const [city, setCity] = useState('');
    const dispatch = useAppDispatch();

    const getCity = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getWeather(city)
        setCity('')
    }

    const getWeather = async (city: string) => {
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

    return (
        <form onSubmit={getCity}>
            <input value={city} onChange={e => setCity(e.target.value)} type='text' name='city' />
            <button type='submit'>Get Weather</button>
        </form>
    )
}

export default Form