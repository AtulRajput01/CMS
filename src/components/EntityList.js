import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EntityList() {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const response = await axios.get('http://localhost:3000/entities');
                setEntities(response.data);
            } catch (error) {
                console.error('Error fetching entities:', error);
            }
        };

        fetchEntities();
    }, []);

    return (
        <div>
            <h2>Entities</h2>
            <ul>
                {entities.map((entity) => (
                    <li key={entity}>
                        <Link to={`/entity/${entity}`}>{entity}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EntityList;
