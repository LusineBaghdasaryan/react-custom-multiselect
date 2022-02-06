import React from 'react';
import styles from './card.module.scss';
import {ICountry} from "../../data/interface";

interface IProps{
    singleCountry:ICountry
}

const Card :React.FC<IProps> = (props): JSX.Element => {
    const {capital,countryCode,countryName,continentName,currencyCode,population} = props.singleCountry
    return (
        <div className={styles.card}>
            <h1>{countryName?.toUpperCase()}</h1>
            <p>Capital city: <span>{capital}</span></p>
            <p>Continent name: <span>{continentName}</span></p>
            <p>Country code city: <span>{countryCode}</span></p>
            <p>Currency code: <span>{currencyCode}</span></p>
            <p>Population city: <span>{population}</span></p>
        </div>
    );
};

export default Card;
