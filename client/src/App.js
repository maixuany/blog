import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState("test");
  useEffect(()=>{
    fetch("http://alene.cf:3000",{method:"GET"})
    .then((response)=>{
      console.log(response)
      return response.json()
    })
    .then((data)=>{
      console.log(data)
      setText(data.message)
    })
    .catch((error)=>{

    })
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      </header>
    </div>
  );
}

export default App;
