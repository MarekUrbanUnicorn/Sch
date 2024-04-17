import react from 'react';
import '../App.css';
import Button from "react-bootstrap/Button";
import { useState, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

function ItemList(props) {
  const { listItems } = props;
  let navigate = useNavigate();


  return (
    <div style={{ display: 'flex' }}>
      {listItems.map((item) => {
        const archived = item.archived ?? false;
        return <div className="card" style={{ width: '20%' }}>
          <h4>{item.name}</h4>
          <p>{item.ownerName}</p>
          {
            <p style={{ color: archived && 'orange' }}>{"Archived: " + (archived ? "Ano" : "Ne")}</p>
          }
          <p>ItemCount (done / total): {item.doneParts}/{item.totalParts}</p>
          <Button className="" variant="primary" onClick={() => { navigate("/detail/" + item.id)}}>
            Show Detail 
          </Button>
        </div>
      })}
    </div>
  );
}

export default ItemList;
