import React from 'react';

import './weather.css'

const Weather = ({ data }) => {

    return (
        <div className={data.temp > 18 ? 'weather hotBackground' : 'weather coldBackground'} >
            <div className='top'>
                <div>
                    <p className='city'>{data.name}</p>
                </div>
                <img
                    alt='weather'
                    src={`http://openweathermap.org/img/w/${data.icon}.png`}
                />
            </div>
            <div className='bottom'>
                <p className='temperature'>{Math.round(data.temp)}°C</p>
                <div className='details'>
                    <div className='infoRow'>
                        <span className='infoLabel'>Details</span>
                    </div>
                    <div className='infoRow'>
                        <span className='infoLabel'>Feels like</span>
                        <span className='infoValue'>
                            {Math.round(data.feels_like)}°C
                        </span>
                    </div>
                    <div className='infoRow'>
                        <span className='infoLabel'>Temp min</span>
                        <span className='infoValue'>{Math.round(data.temp_min)}°C</span>
                    </div>
                    <div className='infoRow'>
                        <span className='infoLabel'>Temp max</span>
                        <span className='infoValue'>{Math.round(data.temp_max)}°C</span>
                    </div>
                    <div className='infoRow'>
                        <span className='infoLabel'>Humidity</span>
                        <span className='infoValue'>{data.humidity}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Weather;