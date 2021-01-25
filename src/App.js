import React from 'react'
import './App.css';

import NavBar from './components/NavBar';
import SimpleContainer from './components/SimpleContainer';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <SimpleContainer />
      <Footer />
    </>
  );
}