import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import { useLang } from "../helpers/LangContext.js"

function Filter(props) {
  const { getLsi } = useLang()
  const { changeFilter, filterValue, applyFilter, createList } = props;


  return (
    <div className="card">
      <h1>{getLsi("listHeader")}</h1>
      <label>
        {getLsi("listSwitchArchived")}: <input
          type="checkbox"
          checked={filterValue.showArchived}
          onChange={() => changeFilter({ showArchived: !filterValue.showArchived })}
        />
      </label>
      <label>
        {getLsi("listSwitchOwn")}: <input
          type="checkbox"
          checked={filterValue.showOnlyOwned}
          onChange={() => changeFilter({ showOnlyOwned: !filterValue.showOnlyOwned })}
        />
      </label>
      <div className="buttonContrainer">
        <Button className="filterButton" variant="primary" onClick={applyFilter}>
          {getLsi("listButtonFilter")}
        </Button>
        <Button className="createButton" variant="primary" onClick={createList}>
          {getLsi("listButtonCreate")}
        </Button>
      </div>
    </div>
  );
}

export default Filter;
