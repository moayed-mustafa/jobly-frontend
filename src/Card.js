import React from "react";
// import "./Card.scss";
import CompanyCard from "./CompanyCard";
import JobCard from "./JobCard";

// * this component makes a decision when its called, render a company card or a job card?

// * item is a job/company object
function Card({ item = {}, apply = () => null, idx }) {
    if (item.handle) {
    return <CompanyCard item={item} />;
  } else {
    return <JobCard item={item} handleApply={() => apply(idx)} />;
  }
}

export default Card;
