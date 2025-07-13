import React, { useState } from "react";
import '../styles/App.css';


const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({ err: '' });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({ err: '' });

    // Validate form fields
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      setErrors({ err: 'All fields are mandatory' });
      setSubmitted(false);
      return;
    }

    if (!/^[a-zA-Z0-9 ]+$/.test(formData.name)) {
      setErrors({ err: 'Name is not alphanumeric' });
      setSubmitted(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setErrors({ err: 'email must contain @' });
      setSubmitted(false);
      return;
    }

    if (!/^\d+$/.test(formData.phoneNumber)) {
      setErrors({ err: 'Phone Number must contain only numbers' });
      setSubmitted(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrors({ err: 'Password must contain atleast 6 letters' });
      setSubmitted(false);
      return;
    }

    if (![].includes(formData.gender)) {
      setErrors({ err: 'Please identify as male, female or others' });
      setSubmitted(false);
    }

    // Extract username from email
    const username = formData.email.split('@')[0];

    // Display welcome message
    setSubmitted(true);
    alert(`Hello ${username}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ err: '' }); // Clear the error when the user starts typing
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span style={{ color: 'red' }}>{errors.err}</span>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name"
          />
        </label>
        <br />

        <label>
          Email address:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email"
          />
        </label>
        <br />

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            data-testid="gender"
          >
            <option value="">Please select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            data-testid="phoneNumber"
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password"
          />
        </label>
        <br />

        <button type="submit" data-testid="submit">
          Submit
        </button>
      </form>

      {submitted && <h2>Hello {formData.name}</h2>}
    </div>
  );
}


export default App;
