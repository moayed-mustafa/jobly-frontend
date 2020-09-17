import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import Search from "./Search";
import JoblyApi from "./JoblyApi";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  // * this functino will fire on the search component
  // * the component takes an endpoint, I wonder if that is neccesary since when it fires, it will come back to this
  // * component to contact the Api!

  async function search(search) {
    // * everytime the user searchs a job, we make an api call, then update the state
    let jobs = await JoblyApi.getJobs(search);
    setJobs(jobs);
  }
  // * this will fire the first time we get here, it will get all the jobs from the backend, regardless of a search term being passed or not
  // * in other words, this is responsible for getting all the jobs, search(searchTerm) gets specific jobs from the api
  useEffect(function() {
    search();
  }, []);

  async function apply(idx) {
    let jobId = jobs[idx].id;
    let message = await JoblyApi.applyToJob(jobId);
    setJobs(j => j.map(job =>
      job.id === jobId ? { ...job, state: message} : job
    ));
  }

  return (
    <div className="Jobs col-md-8 offset-md-2">
      <Search endpoint="jobs" searchFor={search} />
      {/* cardList shows the data and has the ability to apply for jobs, albeit controlled by the main component that sends down the props */}
      <CardList cards={jobs} apply={apply} />
    </div>
  );
}

export default Jobs;
