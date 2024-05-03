import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Detail from './Detail/Detail.js';
import List from './List/List.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "./helpers/UserContext.js"
import { LangProvider } from "./helpers/LangContext.js"
import { ModeProvider } from "./helpers/ModeContext.js"
import { SizeProvider } from "./helpers/SizeContext.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SizeProvider>
        <LangProvider>
          <ModeProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} >
                  <Route path="" element={<List />} />
                  <Route path="detail/:id" element={<Detail />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ModeProvider>
        </LangProvider>
      </SizeProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
