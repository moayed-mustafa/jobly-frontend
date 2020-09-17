import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import Search from "./Search";
import JoblyApi from "./JoblyApi";


/*
        * The same flow of Jobs component
        * set state for the companies
        * contact the api once to get all the companeis
        * makes a search function to get companies by search term
        * returns the Search component and the CardList
*/
function Companies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }

    getCompanies();
  }, []);

  async function handleSearch(search) {
    let companies = await JoblyApi.getCompanies(search);
    setCompanies(companies);
  }

  return (
    <div className="col-md-8 offset-md-2">
      <Search endpoint="companies" searchFor={handleSearch} />
      <CardList cards={companies} />
    </div>
  );
}

export default Companies;
