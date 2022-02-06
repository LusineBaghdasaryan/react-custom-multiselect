import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './multiselectSearch.module.scss';
import CustomButton from "../CustomButton/CustomButton";
import data from '../../data/Countries.json';
import {useContext} from 'react';
import Context from "../../context/Context";

const MultiselectSearch: React.FC = (): JSX.Element => {
    const [showOptions, setShowOptions] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');
    const multiSelectSearch = useRef<HTMLDivElement | null>(null);

    const {setSelectedCountries} = useContext(Context);

    const {country} = data.countries;
    const countryNames = country.map((item) => {
        const {countryName} = item;
        return countryName;
    }).sort();

    const show = () => {
        setShowOptions(true);
    };

    const hide = (event: MouseEvent) => {
        if (multiSelectSearch && !multiSelectSearch.current?.contains(event.target as Node)) {
            setShowOptions(false);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    };

    const addTag = (element: string) => {
        if (!selected.includes(element)) {
            setSelected([element, ...selected]);
            setUserInput('');
        } else {
            let current = selected.filter((item) => {
                return item !== element;
            });
            setSelected(current);
            setUserInput('');
        }
    };

    const removeTag = (i: number) => {
        let current = selected.filter((item, index) => {
            return index !== i;
        });
        setSelected(current);
    };

    const selectAll = () => {
        setSelected(countryNames);
    };

    const unselectAll = () => {
        setSelected([]);
    };

    useEffect(() => {
        setSelected(JSON.parse(localStorage.getItem('selectedCountryNames') as string));
        document.addEventListener("mousedown", hide);
        return () => document.removeEventListener("mousedown", hide);
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedCountryNames', JSON.stringify(selected));
    }, [selected]);

    return (
        <div ref={multiSelectSearch} className={styles.multiselectSearch}>
            <div className={styles.inputArea}
            >
                <div className={styles.selectedTagsArea}>
                    {selected.map((item, i) => {
                        return (
                            <div className={styles.tags}
                                 key={i}
                            >
                                {item}
                                <span onClick={event => {
                                    event.preventDefault();
                                    removeTag(i);
                                }}
                                >x</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.inputAndButton}>
                    <input
                        onFocus={show}
                        type="text"
                        value={userInput}
                        onChange={handleChange}
                        placeholder='Search by country name'
                        className={styles.inputBox}

                    />
                    <CustomButton
                        onClick={() => {
                            setShowOptions(false);
                            setSelectedCountries(selected)
                        }}
                        disabled={!selected.length}
                    >
                        Submit
                    </CustomButton>
                </div>
            </div>
            {showOptions && (
                <div className={styles.optionArea}>
                    <div className={styles.buttonsArea}>
                        <CustomButton
                            onClick={selectAll}
                        >
                            Select All
                        </CustomButton>
                        <CustomButton
                            onClick={unselectAll}
                        >
                            Unselect All
                        </CustomButton>
                    </div>
                    {countryNames.map((item, index) => {
                        if (item.toLowerCase().includes(userInput.toLowerCase())) {
                            return (
                                <p className={(selected.includes(item) ? `${styles.active} ${styles.option}` : `${styles.option}`)}
                                   key={index}
                                   onClick={event => {
                                       event.preventDefault();
                                       addTag(item);
                                   }}
                                >
                                    {item} <span>&#10003;</span>
                                </p>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default MultiselectSearch;
