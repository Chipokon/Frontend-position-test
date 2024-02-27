import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import MainLayout from './views/MainLayout/MainLayout.tsx'
import Tablepage from "./views/TablePage/TablePage.tsx";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/products" element={<Tablepage />} />
        <Route path="/pricePlans" element={<Tablepage />} />
        <Route path="/pages" element={<Tablepage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)

