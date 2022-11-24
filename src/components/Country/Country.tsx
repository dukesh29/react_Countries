import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {CountryDetailed} from "../../type";

interface Props {
  alpha3code: string | null;
}

const Country: React.FC<Props> = ({alpha3code}) => {

  const [country, setCountry] = useState<CountryDetailed | null>(null);

  const fetchCountry = useCallback(async (alpha3code: string) => {
    const countryResponse = await axios.get<CountryDetailed>('/v2/alpha/' + alpha3code);
    const countryPost = countryResponse.data;
    if (countryPost.borders) {
      const promises = countryPost.borders.map(async border => {
        const borderResponse = await axios.get<CountryDetailed>('/v2/alpha/' + border);
        return borderResponse.data.name;
      });
      const borderChange = await Promise.all(promises);
      const countryFinal = {...countryPost, borders: borderChange};
      setCountry(countryFinal);
    } else {
      setCountry(countryPost);
    }
  }, []);

  useEffect(() => {
    if (alpha3code !== null) {
      fetchCountry(alpha3code).catch(console.error);
    }
  }, [alpha3code, fetchCountry]);

  return country && (
    <>
      <div className="d-flex justify-content-between" style={{minHeight: '300px'}}>
        <div className="fs-5 fw-bold">
          <h1 className="me-5 fs-1">{country.name}</h1>
          {country.capital ? (
            <p>Capital: {country.capital}</p>
          ) : country.capital}
          <p>Population: {country.population} people</p>
          {country.currencies ? (
            <ul>Currency: {country.currencies.map(currency => {
              return (<li key={currency.name}>{currency.name} <span className="text-danger ms-2"> {currency.symbol}</span></li>)
            })}</ul>
          ) : country.currencies}
          <ul>Languages: {country.languages.map(language => {
            return (<li key={language.name}>{language.name}</li>)
          })}</ul>
        </div>
        <div>
          <img src={country.flag} alt={country.name} width="300px"/>
        </div>
      </div>

      {country.borders ? (
        <div className="fs-5 fw-bold mt-3">
          Borders with:
          <ul>
            {country.borders.map(border => {
              return (
                <li key={Math.random()}>{border}</li>
              )
            })}
          </ul>
        </div>
      ) : country.borders}
    </>
  );
};

export default Country;