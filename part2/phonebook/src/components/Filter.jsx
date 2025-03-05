const Filter = ({ filterByName, handleFilterInput }) => (
  <div className="filter">
    filter shown with{" "}
    <input value={filterByName} onChange={handleFilterInput} />
  </div>
);

export default Filter;
