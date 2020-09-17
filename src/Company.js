import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./JoblyApi";
import CardList from "./CardList";
import UserContext from "./UserContext";

function Company() {
    //  * this is the component that maps route for companies/company
  const { handle } = useParams();
  const { currentUser } = useContext(UserContext);

    //  * sets a state for the company
  const [company, setCompany] = useState(null);

  useEffect(() => {
      async function getCompanyAndJobs() {
        // * NICE: the currentUser has a bunch of jobs to his name, just destructure them out of the object!
          const { jobs } = currentUser;
        //   * use the params handle to get the company by handle
      const c = await JoblyApi.getCompany(handle);

      // grab a set of IDs of jobs applied to
        //   * I don't understand this line!
      const jobsIDsAppliedTo = new Set(jobs.map(job => job.id));

      // add key for each job in company if it is applied to ---
      // this let us handle the "apply/applied" button
      c.jobs = c.jobs.map(job => ({
        ...job,
        state: jobsIDsAppliedTo.has(job.id) ? "applied" : null
      }));

      setCompany(c);
    }

    getCompanyAndJobs();
  }, [handle, currentUser]);

  async function apply(idx) {
    if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
      let jobId = company.jobs[idx].id;
      let message = await JoblyApi.applyToJob(jobId);
      setCompany(c => {
        let newCompany = { ...c };
        newCompany.jobs = newCompany.jobs.map(job =>
          job.id === jobId ? { ...job, state: message } : job
        );
        return newCompany;
      });
    }
  }

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-md-8 offset-md-2">
      <h5 className="text-capitalize">{company.name}</h5>
      <p>{company.description}</p>
      <CardList cards={company.jobs} apply={apply} />
    </div>
  );
}

export default Company;
