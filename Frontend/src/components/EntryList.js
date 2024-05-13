import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

function EntryList() {
    const { entityName } = useParams();
    const [entries, setEntries] = useState([]);
    const navigate = useNavigate();

    // Fetch all entries for the specified entity
    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/entity/${entityName}`);
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };

        fetchEntries();
    }, [entityName]);

    // Handle entry deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/entity/${entityName}/${id}`);
            // Update state to remove deleted entry
            setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    };

    // Handle entry update
    const handleUpdate = async (id) => {
        try {
            // Fetch the entry data based on its ID
            const response = await axios.get(`http://localhost:3000/entity/${entityName}/${id}`);
            const entryData = response.data;

            // Navigate to the update entry form with the entry data
            navigate(`/entity/${entityName}/form/${id}`, { state: { entryData } });
        } catch (error) {
            console.error('Error fetching entry data for update:', error);
        }
    };

    return (
        <div>
            <h2>{entityName} Entries</h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        {/* Link to update entry form */}
                        <Link to={`/entity/${entityName}/form/${entry.id}`}>
                            {JSON.stringify(entry)}
                        </Link>
                        {/* Button to trigger entry update */}
                        <button onClick={() => handleUpdate(entry.id)}>Update</button>
                        {/* Button to trigger entry deletion */}
                        <button onClick={() => handleDelete(entry.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(`/entity/${entityName}/form`)}>
                Create New Entry
            </button>
        </div>
    );
}

export default EntryList;
