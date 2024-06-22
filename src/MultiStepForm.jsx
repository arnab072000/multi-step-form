import React, { useState, useEffect } from 'react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    } 
    else if (step === 2) {
      if (!formData.address1) newErrors.address1 = 'Address Line 1 is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'Zip Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      localStorage.removeItem('formData');
      console.log('Form submitted', formData);
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Multi-Step Form</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className={`nav-link ${step === 1 ? 'active' : ''}`}>Step 1: Personal Information</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${step === 2 ? 'active' : ''}`}>Step 2: Address Information</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${step === 3 ? 'active' : ''}`}>Step 3: Confirmation</a>
        </li>
      </ul>
      <form onSubmit={handleSubmit} className="mt-3">
        {step === 1 && (
          <div>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleChange} />
              <div className="invalid-feedback">{errors.name}</div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name="phone" value={formData.phone} onChange={handleChange} />
              <div className="invalid-feedback">{errors.phone}</div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="form-group">
              <label>Address Line 1</label>
              <input type="text" className={`form-control ${errors.address1 ? 'is-invalid' : ''}`} name="address1" value={formData.address1} onChange={handleChange} />
              <div className="invalid-feedback">{errors.address1}</div>
            </div>
            <div className="form-group">
              <label>Address Line 2</label>
              <input type="text" className="form-control" name="address2" value={formData.address2} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" className={`form-control ${errors.city ? 'is-invalid' : ''}`} name="city" value={formData.city} onChange={handleChange} />
              <div className="invalid-feedback">{errors.city}</div>
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" className={`form-control ${errors.state ? 'is-invalid' : ''}`} name="state" value={formData.state} onChange={handleChange} />
              <div className="invalid-feedback">{errors.state}</div>
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input type="text" className={`form-control ${errors.zip ? 'is-invalid' : ''}`} name="zip" value={formData.zip} onChange={handleChange} />
              <div className="invalid-feedback">{errors.zip}</div>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h4>Confirm your details</h4>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address Line 1:</strong> {formData.address1}</p>
            <p><strong>Address Line 2:</strong> {formData.address2}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>State:</strong> {formData.state}</p>
            <p><strong>Zip Code:</strong> {formData.zip}</p>
          </div>
        )}
        <div className="mt-3">
          {step > 1 && <button type="button" className="btn btn-secondary mr-2" onClick={handlePrev}>Back</button>}
          {step < 3 && <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>}
          {step === 3 && <button type="submit" className="btn btn-success">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
