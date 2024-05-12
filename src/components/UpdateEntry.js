import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function UpdateEntry() {
    const { entityName, id } = useParams();
    const [entryData, setEntryData] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchEntry = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/entity/${entityName}/${id}`);
                setEntryData(response.data);
            } catch (error) {
                alert('Error fetching entry data');
            }
        };
        fetchEntry();
    }, [entityName, id]);

    const updateEntry = async () => {
        try {
            await axios.put(`http://localhost:3000/entity/${entityName}/${id}`, entryData);
            alert('Entry updated successfully');
            history.push(`/entity/${entityName}`);
        } catch (error) {
            alert('Error updating entry');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEntryData({ ...entryData, [name]: value });
    };

    return (
        <div>
            <h2>Update Entry</h2>
            {Object.keys(entryData).map((key) => (
                <div key={key}>
                    <label>{key}:</label>
                    <input
                        type="text"
                        name={key}
                        value={entryData[key]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button onClick={updateEntry}>Update</button>
        </div>
    );
}

export default UpdateEntry;
