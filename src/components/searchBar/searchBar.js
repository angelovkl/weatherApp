import React from 'react';
import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { WEATHER_API_KEY } from '../../config';

import './searchBar.css';

const SearchBar = ({ onSearch }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [lastSearches, setLastSearches] = useState([]);
    const [searchBarFocused, setSearchBarFocused] = React.useState(false);

    const handleSearch = () => {
        let existingElement = lastSearches?.find((e) => e.name.toLowerCase() === searchKeyword.toLowerCase());

        if (existingElement) {
            onSearch(existingElement);
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchKeyword}&appid=${WEATHER_API_KEY}&units=metric`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `This is an HTTP error: The status is ${response.status}`
                        );
                    }
                    return response.json();
                })
                .then((result) => {
                    let weatherData = { ...result.main, name: result.name, icon: result.weather[0].icon };

                    if (lastSearches?.length === 5) {
                        setLastSearches([weatherData, ...lastSearches.slice(0, -1)]);
                    } else {
                        setLastSearches([weatherData, ...lastSearches]);
                    }
                    onSearch(weatherData);
                })
                .catch((err) => {
                    alert(err.message);
                });

        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(searchKeyword);
        }
    }

    return (
        <div className='searchBarWrap'>
            <div className='inputWrap'>
                <input className='searchBarInput' placeholder='Search'
                    value={searchKeyword}
                    onChange={event => setSearchKeyword(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setSearchBarFocused(true)}
                    onBlur={(e) => {
                        setTimeout(function () {
                            setSearchBarFocused(false);
                        }, 200);
                    }}
                />
                <FontAwesomeIcon icon={faArrowRight} className={searchBarFocused ? 'inputIcon' : 'inputIconHide'} onClick={handleSearch} />
            </div>
            {
                searchBarFocused &&
                <div className='dropdown'>
                    {
                        lastSearches?.map((post, index) => (
                            <div className='dropdownElement' key={index} onClick={(e) => {
                                onSearch(lastSearches[index]);
                                setSearchKeyword(post.name);
                            }}>
                                {post.name}
                            </div>
                        ))
                    }
                </div>}
        </div>
    );
}

export default SearchBar;