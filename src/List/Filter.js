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
  const { width } = useSize()
  const { changeFilter, filterValue, applyFilter, createList } = props;

  var size;
  var override = null;
  if (width >= 1400) {
    size = 20
  }
  else if (width >= 600) {
    size = 50
  }
  else {
    size = 100
    override = 0
  }

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
      <div className="sizeContrainer">
        <Box width={`${size}%`}>
          <Button className="filterButton" variant={getMsi("button")} onClick={applyFilter}>
            {getLsi("listButtonFilter")}
          </Button>
        </Box>
        <Box width={`${size}%`} sx={{ marginLeft: `${override ?? (100 - 2 * size)}%` }}>
          <Button className="filterButton" variant={getMsi("button")} onClick={createList}>
            {getLsi("listButtonCreate")}
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default Filter;
