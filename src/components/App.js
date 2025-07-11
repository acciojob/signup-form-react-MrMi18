import React, {Component, useState} from "react";
import '../styles/App.css';
import { isNumber } from "cypress/types/lodash";

const App = () => {
  const [formData,setFormData] = useState({name:"",email:"",password:"",gender:"",phoneNumber:0})
  const [errorMessage, setErrorMessage] = useState();
  const [user,setUser] = useState();
  const onSubmit = (e) =>{
    e.preventDefault();
    for(let value in formData){
     if(!formData[value]) {
      setErrorMessage(formData[value]+"Error: " + "All fields are mandatory.");
      return;
     }
   }
    if(/^[a-zA-Z0-9]+$/.test(formData.name)){
      setErrorMessage("Name is not alphanumeric.");
      return;
    }else if (!formData.email.includes("@")) {
      setErrorMessage("Email must contain @.");
      return ;
    }else if(!formData.gender.includes("male"||"femail"||"others")){
      setErrorMessage("Please identify as male, female or others.");
      return ;
    }else if(!isNumber(formData.phoneNumber)){
      setErrorMessage("Phone Number must contain only numbers.");
      return;
    }else if(formData.password.length<6){
      setErrorMessage("Password must contain atleast 6 letters");
      return;
    }
    setUser(formData.email.split('@')[0]);
    setErrorMessage("") 
setFormData({name:"",email:"",password:"",gender:"",phoneNumber:0});

  }
  if(user) return <h1> Hello {user}</h1>
  return (
    <div id="main">
      <form onSubmit = {onSubmit}>
        <label htmlFor ="name">name</label>
        <input type = "text" data-testid = 'name' value={formData.name} onChange={(e) => setFormData((pre) => ({...pre, name:e.target.value}))}></input>
      <br></br>
        <label htmlFor ="email">Email</label>
        <input type = "text" data-testid = 'email' value={formData.email} onChange={(e) => setFormData((pre) => ({...pre, email:e.target.value}))}></input>
      <br></br>
        <label htmlFor ="password">password</label>
        <input type = "text" data-testid = 'password' value={formData.password} onChange={(e) => setFormData((pre) => ({...pre, password:e.target.value}))}></input>
      <br></br>
        
        <select data-testid = 'gender' defaultValue="male" value={formData.gender} onChange={(e) => setFormData((pre) => ({...pre, gender:e.target.value}))}>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
            <option value={"other"}>others</option>
        </select>
      <br></br>
        <label htmlFor ="phoneNumber">Phone Number</label>
        <input type = "text" data-testid = 'phoneNumber' value={formData.phoneNumber} onChange={(e) => setFormData((pre) => ({...pre, phoneNumber:e.target.value}))}></input>
      <br></br>
      <button type="submit" data-testid = 'submit'> Submit</button>
     </form>
     {errorMessage && <p>errorMessage</p>}
    </div>
  )
}


export default App;
