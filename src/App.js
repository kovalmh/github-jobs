import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';
import useFetchJobs from './useFetchJobs';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const {
    jobs, loading, error, hasNextPage,
  } = useFetchJobs(params, page);

  function handleParamChange(e) {
    const param = e.target.name;
    const { value } = e.target;
    setPage(1);
    setParams((prevParams) => ({ ...prevParams, [param]: value }));
  }

  return (
      <Container className="my-4">
        <h1 className="mb-4">GitHub Jobs</h1>
        <SearchForm params={params} onParamChange={handleParamChange} />
        <JobsPagination page={page} setPage={setPage} hasNextPage={true} />
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error. Try Refreshing.</h1>}
        {jobs.map((job) => <Job key={job.id} job={job} />)}
        <JobsPagination page={page} setPage={setPage} hasNextPage={true} />
      </Container>
  );
}

export default App;
