import React, {useState,useEffect,useRef} from 'react'
import mails from './providers.json'
import './App.css';
import * as EmailValidator from 'email-validator';

function App (){
  const [name, setName] = useState("")
  const [display, setDisplay] = useState(mails.slice(0,3))
  const emailInputRef = React.useRef(null);
  const regex = '([a-z0-9._-]+)@?(.*)'
  const match = name.match(regex)

  const change = (e) =>{ //handle name
    setName(e)
  }

  const complete = (mail) =>{ //complétion mail
    if(name.length>1) setName(match[1]+"@"+mail)
    emailInputRef.current.focus();
  }

  useEffect(()=>{ //affichage mails suggérés
    emailInputRef.current.focus()

    if(EmailValidator.validate(name)){
      setDisplay([])
    }else if(!(name.includes("@"))){
      setDisplay(mails.slice(0,3))

    }else{
      const newMails = mails.filter(mail=>mail.includes(match[2]))

      if(newMails.length<=3){
        setDisplay(newMails)
      }else{
        setDisplay(newMails.slice(0,3))
      }
    }
  },[name])
  
  return(
    <div className="flexbox-container">
    <input 
      ref={emailInputRef}
      style={{"margin":10,"padding":5}}
      type="text"
      value={name}
      onChange={e=>change(e.target.value)}
      >
    </input>
    {display.map((mail)=>{return(
      <p 
        onClick={()=>complete(mail)} 
        key={mail} 
        style={{"paddingLeft":5,"paddingRight":5}}
      >
        {mail}
      </p>
      )
      })}
    </div>
  )
}


export default App;
