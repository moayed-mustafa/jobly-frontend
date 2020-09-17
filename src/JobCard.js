import React from "react";

function JobCard({ item = {}, handleApply }) {
  // * destructring the data from item prop
  const { title, salary, equity } = item;

  return (
    <div className="Card card">
      <div className="card-body">
        <h6 className="card-title d-flex justify-content-between">
          <span className="text-capitalize">{title}</span>
        </h6>
        <div>Salary: {salary}</div>
        <div>Equity: {equity}</div>
        <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          //* */ handleApply is the apply method that is drilled all the way from Jobs --> CardList ---> Card to be used here
          onClick={handleApply}
          // * each item has an inner state that this button will cause it to change in case it's null
          disabled={item.state}
        >
          {item.state ? "Applied" : "Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
