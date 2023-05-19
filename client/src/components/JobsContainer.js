import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import PageBtnContainer from './PageBtnContainer';
import Alert from './Alert';

function JobsContainer() {
  const {
    jobs,
    getJobs,
    numOfPages,
    isLoading,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
    page,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchType, searchStatus, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
}
export default JobsContainer;
