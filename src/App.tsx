import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import Countries from "./components/Countries/Countries";

interface Country {
  name: string;
  alpha3code: string;
}

function App() {

  const [countries, setCountries] = useState<Country[]>([]);

  const fetchData = useCallback(async () => {
    const countriesResponse = await axios.get<Country[]>('/v2/all?fields=alpha3Code,name');
    const countriesData = countriesResponse.data;
    setCountries(countriesData);
  }, []);


  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData]);

  const countriesEl = countries.map(country => {
    return (
      <Countries countryName={country.name} key={Math.random()}/>
    )
  });


  return (
    <div className="App d-flex gap-2">
      <div style={{maxHeight:'700px',overflow:'auto'}}>
        {countriesEl}
      </div>
    </div>
  );
}

export default App;
