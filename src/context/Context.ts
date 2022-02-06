import React, {createContext} from 'react';

type ContextProps = {
    selectedCountries: string[],
    setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
};

const Context = createContext<ContextProps>({
    selectedCountries: [],
    setSelectedCountries: function () {
        return [];
    },
});

export default Context;
