import React from 'react';
import ProductComponent from './components/productShow';
import Header from './components/header';

function App() {
  return (
    <div className="App">
        <Header />
        <ProductComponent productId="B007TIE0GQ"/>
    </div>
  );
}

export default App;
