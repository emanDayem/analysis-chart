import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolDetails from './routes/SchoolDetails';
import ThemeContextWrapper from './theme/ThemeContextWrapper';

ReactDOM.render(
  <ThemeContextWrapper>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="schooldetails" element={<SchoolDetails />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </ThemeContextWrapper>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
