import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import { useLang } from "../helpers/LangContext.js"
import { useMode } from "../helpers/ModeContext.js"
import { useSize } from "../helpers/SizeContext.js"
import Box from '@mui/material/Box';

function Filter(props) {
  const { getLsi } = useLang()
  const { getMsi } = useMode()
  const { changeFilter, filterValue, applyFilter, createList } = props;


  return (
    <Box component="section" sx={getMsi("listBox")}>
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
        <Button className="filterButton" variant={getMsi("button")} onClick={applyFilter}>
          {getLsi("listButtonFilter")}
        </Button>
        <Button className="createButton" variant={getMsi("button")} onClick={createList}>
          {getLsi("listButtonCreate")}
        </Button>
      </div>
    </Box>
  );
}

export default Filter;
