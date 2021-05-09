import React, {useState,useEffect} from 'react'
import mails from './providers.json'
import './App.css';

function App (){
  const [name, setName] = useState("")

  const [display, setDisplay] = useState(mails)

  const change = (e) =>{
    console.log(e)
    setName(e)
  }
  useEffect(()=>{
    if(name.includes("@"))console.log('@')
  },[name])

  return(
    <div className="flexbox-container">
    <input 
      type="text"
      value={name}
      onChange={e=>change(e.target.value)}
      >
    </input>
    {display.map((mail)=>{return(
      <p key={mail} style={{"padding":5}}>
        {mail}
      </p>
      )
      })}
    </div>
  )
}


export default App;
