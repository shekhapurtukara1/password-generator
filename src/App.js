import React, { useState,useCallback, useEffect,useRef } from 'react'
import  './App.css';
const App = () => {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+=";_-~`@#$%^&*!";
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword]);


 const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='main-div'>
          <h1>Password Generator</h1>
          <div className='pwd-gnr-div'>
              <div className='inp-div'>
                  <input  type="text" value={password} placeholder='password'
                  className='pwd-input' ref={passwordRef} readOnly
                  />
                  <button className='copy-btn'onClick={
                    copyPasswordToClipboard
                  }>copy</button>
              </div>
              <div className='fields-div'>
              <div>
                  <input type="range" min="6" max="100" id="range" value={length} onChange={(e)=>{
                   setLength( e.target.value)
                  }} />
                  <label htmlFor="range" style={{color:"white"}}>Length {length}</label>
              </div>
              <div>
                  <input type="checkbox" 
                    name="checkbox" 
                    id="checkbox" 
                    defaultChecked={numberAllowed}
                    onChange={()=>{
                    setNumberAllowed((prev)=>!prev);
                  }}
                  />
                  <label htmlFor="checkbox" style={{color:"white"}}>Numbers</label>
              </div>
              <div>
                <input type="checkbox" 
                    name="checkbox" 
                    id="checkbox" 
                    defaultChecked={charAllowed}
                    onChange={()=>{
                    setCharAllowed((prev)=>!prev);
                }}
                />
                <label htmlFor="checkbox" style={{color:"white"}}>characters</label>
              </div>
              </div>
    </div>
      
    </div>
  )
}

export default App