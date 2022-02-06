import React, {useContext, useEffect, useState} from 'react';
import styles from './table.module.scss';
import Context from "../../context/Context";
import data from '../../data/Countries.json';
import {ICountry} from "../../data/interface";
import CustomButton from "../CustomButton/CustomButton";
import {Link} from "react-router-dom";
import {convertToObject} from "../../helpers";

const Table: React.FC = () => {
    const {selectedCountries} = useContext(Context);
    const {country} = data.countries;
    const [tableData, setTableData] = useState<ICountry[]>([]);
    
    const countriesFilter = () => {
        let list: ICountry[] = tableData;
        if (selectedCountries?.length) {
            if (selectedCountries.length === country.length) {
                list = country
            } else {
                const selectedCountriesSet = convertToObject(selectedCountries);
                list = country.filter(c => selectedCountriesSet[c.countryName]);
            }
        }
        setTableData(list);
    }

    const deleteCountry = (code: string) => {
        const newData = tableData.filter((item) => {
            return item.countryCode !== code;
        });
        setTableData(newData);
    }

    useEffect(() => {
        countriesFilter();
    }, [selectedCountries]);

    useEffect(() => {
        setTableData(JSON.parse(localStorage.getItem('countries') as string));
    }, []);

    useEffect(() => {
        localStorage.setItem("countries", JSON.stringify(tableData));
    }, [tableData]);

    return (
        <>
            {tableData.length ?
                <div className={styles.tableBlock}>
                    <table >
                        <tr className={styles.header}>
                            <th>Country name</th>
                            <th>Capital</th>
                            <th>Continent name</th>
                            <th/>
                        </tr>
                        {tableData.map((item) => <tr key={item.countryCode}>
                                <td>{item.countryName}</td>
                                <td>{item.capital}</td>
                                <td>{item.continentName}</td>
                                <td>
                                    <Link to={`country/${item.countryCode}`}> <CustomButton
                                        color='#5691c6'><i className="fa fa-eye"/></CustomButton></Link>
                                    <CustomButton color='#ed5351' onClick={() => deleteCountry(item.countryCode)}> <i
                                        className="fa fa-trash"/></CustomButton>
                                </td>
                            </tr>
                        )}
                    </table>
                </div>
                : null}
        </>
    );
};

export default Table;
