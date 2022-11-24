import React from 'react';

interface Props {
  countryName:string;
  findCountry:React.MouseEventHandler;
}

const Countries:React.FC<Props> = ({countryName,findCountry}) => {
  return (
    <>
      <p className="m-0 text-black link-info"
         style={{cursor:'pointer', textDecoration:'underline'}}
         onClick={findCountry}>{countryName}</p>
    </>
  );
};

export default Countries;