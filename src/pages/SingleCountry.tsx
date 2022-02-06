import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import data from "../data/Countries.json";
import {ICountry} from "../data/interface";
import Card from '../components/Card/Card';
import CustomButton from "../components/CustomButton/CustomButton";

const SingleCountry = () => {
    const {country} = data.countries;
    const [singleCountry, setSingleCountry] = useState<ICountry>({} as ICountry);
    let {id} = useParams();

    const findCountry = () => {
        const foundCountry = country.find((item) => {
            return item.countryCode === id;
        });
        foundCountry && setSingleCountry(foundCountry);
    }

    useEffect(() => {
        findCountry();
    }, []);

    return (
        <div>
            <Link to='/'>
                <CustomButton>Go home</CustomButton>
            </Link>
            <Card singleCountry={singleCountry}/>
        </div>
    );
}

export default SingleCountry;
