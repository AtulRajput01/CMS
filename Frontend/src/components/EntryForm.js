import React, { useState } from 'react';
import axios from 'axios';

function EntryForm({ entityName }) {
    const [formData, setFormData] = useState({
        // Initialize form data with empty values for each attribute
        // Replace these with actual attribute names from your entity
        name: '',
        email: '',
        mobileNumber: '',
        dateOfBirth: ''
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend to create a new entry
            await axios.post(`http://localhost:3000/entity/Person
            `, formData);
            // Clear the form after successful submission
            setFormData({
                name: '',
                email: '',
                mobileNumber: '',
                dateOfBirth: ''
            });
            alert('Entry created successfully!');
        } catch (error) {
            console.error('Error creating entry:', error);
            alert('Error creating entry. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create New Entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Create Entry</button>
            </form>
        </div>
    );
}

export default EntryForm;
