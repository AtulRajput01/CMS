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

    return (
        <div>
            <h2>{entityName} Entries</h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>
                        <Link to={`/entity/${entityName}/form/${entry.id}`}>
                            {JSON.stringify(entry)}
                        </Link>
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
