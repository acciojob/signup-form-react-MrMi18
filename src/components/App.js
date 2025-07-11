import React, { useState } from "react";
import '../styles/App.css';


const App = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", gender: "", phoneNumber: "" })
  const [errorMessage, setErrorMessage] = useState();
  const [user, setUser] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    for (let key in formData) {
      if (!formData[key]) {
        setErrorMessage(`${key} Error: All fields are mandatory.`);
        return;
      }
    }
    if (/^[a-zA-Z0-9]+$/.test(formData.name)) {
      setErrorMessage("Name must be alphanumeric.");
      return;
    }

    else if (!formData.email.includes("@")) {
      setErrorMessage("Email must contain @.");
      return;
    } else if (!["male", "female", "other"].includes(formData.gender)) {
      setErrorMessage("Please identify as male, female or other.");
      return;
    }
    else if (!/^\d+$/.test(formData.phoneNumber)) {
      setErrorMessage("Phone Number must contain only digits.");
      return;
    }
    else if (formData.password.length < 6) {
      setErrorMessage("Password must contain atleast 6 letters");
      return;
    }
    setUser(formData.email.split('@')[0]);
    setErrorMessage("")
    setFormData({ name: "", email: "", password: "", gender: "", phoneNumber: "" });

  }
  if (user) return <h1> Hello {user}</h1>
  return (
    <div id="main">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" data-testid='name' value={formData.name}
          onChange={(e) => {
            e.persist();
            setFormData((pre) => ({ ...pre, name: e.target.value }));
          }}

        ></input>
        <br></br>
        <label htmlFor="email">Email</label>
        <input type="text" data-testid='email' value={formData.email} onChange={(e) => {
          e.persist();
          setFormData((pre) => ({ ...pre, email: e.target.value }));
        }}></input>
        <br></br>
        <label htmlFor="password">password</label>
        <input type="text" data-testid='password' value={formData.password}
          onChange={(e) => {
            e.persist();
            setFormData((pre) => ({ ...pre, password: e.target.value }));
          }}></input>
        <br></br>

        <select data-testid='gender'  value={formData.gender}
          onChange={(e) => {
            e.persist();
            setFormData((pre) => ({ ...pre, gender: e.target.value }));
          }}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">others</option>
        </select>
        <br></br>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" data-testid='phoneNumber' value={formData.phoneNumber}
          onChange={(e) => {
            e.persist();
            setFormData((pre) => ({ ...pre, phoneNumber: e.target.value }));
          }}></input>
        <br></br>
        <button type="submit" data-testid='submit'> Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}


export default App;
