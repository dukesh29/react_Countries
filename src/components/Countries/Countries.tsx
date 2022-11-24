import React from 'react';

interface Props {
  countryName:string;
}

const Countries:React.FC<Props> = ({countryName}) => {
  return (
    <>
      <p className="m-0">{countryName}</p>
    </>
  );
};

export default Countries;