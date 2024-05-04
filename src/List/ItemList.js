import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useLang } from "../helpers/LangContext.js"
import { useMode } from "../helpers/ModeContext.js"
import { useSize } from "../helpers/SizeContext.js"
import Box from '@mui/material/Box';

function ItemList(props) {
  const { getLsi } = useLang()
  const { getMsi } = useMode()
  const { width } = useSize()
  const { listItems } = props;
  let navigate = useNavigate();
  
  var size;
  if (width >= 1800) {
    size = 20
  }
  else if (width >= 750) {
    size = 50
  }
  else {
    size = 100
  }


  return (
    <div class="sizeContrainer">
      {listItems.map((item) => {
        const archived = item.archived ?? false;
        return <Box width={`${size}%`} component="section" sx={getMsi("listBox")}>
          <h4>{item.name}</h4>
          <p>{getLsi("listItemOwner")}: {item.ownerName}</p>
          {
            <p style={{ color: archived && 'orange' }}>{getLsi("listItemArchived") + ": " + (archived ? getLsi("yes") : getLsi("no"))}</p>
          }
          <p>{getLsi("listItemCount")}: {item.doneParts}/{item.totalParts}</p>
          <Button variant={getMsi("button")} onClick={() => { navigate("/detail/" + item.id) }}>
            {getLsi("listButtonDetail")}
          </Button>
        </Box>
      })}
    </div>
  );
}

export default ItemList;
