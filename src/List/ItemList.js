import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { useLang } from "../helpers/LangContext.js"

function ItemList(props) {
  const { getLsi } = useLang()
  const { listItems } = props;
  let navigate = useNavigate();


  return (
    <div style={{ display: 'flex' }}>
      {listItems.map((item) => {
        const archived = item.archived ?? false;
        return <div className="card" style={{ width: '20%' }}>
          <h4>{item.name}</h4>
          <p>{getLsi("listItemOwner")}: {item.ownerName}</p>
          {
            <p style={{ color: archived && 'orange' }}>{getLsi("listItemArchived") + ": " + (archived ? getLsi("yes") : getLsi("no"))}</p>
          }
          <p>{getLsi("listItemCount")}: {item.doneParts}/{item.totalParts}</p>
          <Button className="" variant="primary" onClick={() => { navigate("/detail/" + item.id) }}>
            {getLsi("listButtonDetail")}
          </Button>
        </div>
      })}
    </div>
  );
}

export default ItemList;
