import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../context/appContext';
import { FormRow, FormRowSelect } from './index';

function SearchContainer() {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    jobTypeOptions,
    statusOptions,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) {
      return;
    }
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        {/* search position */}
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* rest of the inputs */}
        </div>
      </form>
    </Wrapper>
  );
}
export default SearchContainer;
