import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';

function Filter(props) {
  const { changeFilter, filterValue, applyFilter, createList } = props;


  return (
    <div className="card">
      <h1>List of Shopping Lists</h1>
      <label>
        Show archived lists: <input
          type="checkbox"
          checked={filterValue.showArchived}
          onChange={() => changeFilter({ showArchived: !filterValue.showArchived })}
        />
      </label>
      <label>
        Show only own lists: <input
          type="checkbox"
          checked={filterValue.showOnlyOwned}
          onChange={() => changeFilter({ showOnlyOwned: !filterValue.showOnlyOwned })}
        />
      </label>
      <div className="buttonContrainer">
        <Button className="filterButton" variant="primary" onClick={applyFilter}>
          Filter Data
        </Button>
        <Button className="createButton" variant="primary" onClick={createList}>
          Create New Shopping List
        </Button>
      </div>
    </div>
  );
}

export default Filter;
