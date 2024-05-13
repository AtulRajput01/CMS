import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateEntry() {
    const { entityName, id } = useParams();
    const [entryData, setEntryData] = useState({});
    const [formData, setFormData] = useState({});

    // Fetch entry details
    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/entity/${entityName}/${id}`);
                setEntryData(response.data);
                // Initialize form data with current entry values
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching entry:', error);
            }
        };

        fetchEntry();
    }, [entityName, id]);

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
            // Send PUT request to update entry
            await axios.put(`http://localhost:3000/entity/${entityName}/${id}`, formData);
            alert('Entry updated successfully!');
        } catch (error) {
            console.error('Error updating entry:', error);
            alert('Error updating entry. Please try again.');
        }
    };

    return (
        <div>
            <h2>Update Entry</h2>
            <form onSubmit={handleSubmit}>
                {/* Display form fields for each attribute */}
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                </div>
                {/* Add additional fields for other attributes */}
                <button type="submit">Update Entry</button>
            </form>
        </div>
    );
}

export default UpdateEntry;
