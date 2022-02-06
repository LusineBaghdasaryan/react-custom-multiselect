import React, {useState} from 'react';
import './App.scss';
import Context from "./context/Context";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";


function App() {
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const value = { selectedCountries, setSelectedCountries};
    return (
    <Context.Provider value={value}>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="country/:id" element={<SingleCountry />} />
            </Routes>
        </div>
    </Context.Provider>
    );
}

export default App;
