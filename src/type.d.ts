
export interface CountryName {
  name: string;
  alpha3Code: string;
}

export interface CountryDetailed {
  id: number;
  name: string;
  capital: string;
  population: number;
  flag: string;
  borders: string[];
  currencies:[{
    name:string;
    symbol:string;
  }];
  languages:[{
    name:string;
  }];

}


