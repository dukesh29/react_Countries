import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import Countries from "./components/Countries/Countries";
import {CountryName} from "./type";
import Country from "./components/Country/Country";

function App() {

  const [countries, setCountries] = useState<CountryName[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<CountryName[]>('/v2/all?fields=alpha3Code,name');
    const countriesData = countriesResponse.data;
    setCountries(countriesData);
  }, []);


  useEffect(() => {
    fetchData().catch(console.error);
  }, [fetchData]);

  const countriesEl = countries.map(country => {
    return (
      <Countries countryName={country.name}
                 key={Math.random()} findCountry={()=>setSelectedCountryCode(country.alpha3Code)}/>
    )
  });


  return (
    <div className="App d-flex gap-2 justify-content-between">
      <div className="d-flex flex-column align-items-start p-3 gap-2" style={{maxHeight: '700px', overflow: 'auto', minWidth:'300px'}}>
        {countriesEl}
      </div>
       <div className="flex-grow-1 p-5">
         <Country alpha3code={selectedCountryCode}/>
       </div>
    </div>
  );
}

export default App;
