import React, { useState } from 'react';
import './Planner.css'

const MonthlyInstallmentForm = () => {
  const [formData, setFormData] = useState({
    installDate: '',
    topic: '',
    monthlyInstallment: '',
    targetAmount: '',
    dueDate: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData);
    // You can send jsonData to your backend or perform any other desired action with it.
  };

  return (
    <div>
      <h2>Monthly Installment Form</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Install Date:
          <input
            type="date"
            name="installDate"
            value={formData.installDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Topic:
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Monthly Installment:
          <input
            type="number"
            name="monthlyInstallment"
            value={formData.monthlyInstallment}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Target Amount:
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Generate JSON</button>
      </form>
    </div>
  );
};

export default MonthlyInstallmentForm;
