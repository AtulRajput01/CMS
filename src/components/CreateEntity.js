import React, { useState } from 'react';
import axios from 'axios';


function CreateEntity() {
    const [entityName, setEntityName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [newAttributeName, setNewAttributeName] = useState('');
    const [newAttributeType, setNewAttributeType] = useState('');

    const handleAddAttribute = () => {
        setAttributes((prevAttributes) => [
            ...prevAttributes,
            { name: newAttributeName, type: newAttributeType },
        ]);
        setNewAttributeName('');
        setNewAttributeType('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedAttributes = attributes.map(attr => ({ name: attr.name, type: attr.type === 'date' ? 'DATE' : attr.type === 'number' ? 'BIGINT' : 'VARCHAR(255)' }));
            const response = await axios.post('http://localhost:3000/create-entity', {
                entityName: entityName,
                attributes: formattedAttributes,
            });
            alert('Entity created successfully');
            setEntityName('');
            setAttributes([]);
        } catch (error) {
            console.error('Error creating entity:', error);
        }
    };

    return (
        <div>
            <h2>Create Entity</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Entity Name:</label>
                    <input
                        type="text"
                        value={entityName}
                        onChange={(e) => setEntityName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Attribute Name:</label>
                    <input
                        type="text"
                        value={newAttributeName}
                        onChange={(e) => setNewAttributeName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Attribute Type:</label>
                    <select
                        value={newAttributeType}
                        onChange={(e) => setNewAttributeType(e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="date">Date</option>
                        <option value="boolean">Boolean</option>
                    </select>
                </div>
                <button type="button" onClick={handleAddAttribute}>
                    Add Attribute
                </button>
                <ul>
                    {attributes.map((attribute, index) => (
                        <li key={index}>
                            {attribute.name} - {attribute.type}
                        </li>
                    ))}
                </ul>
                <button type="submit">Create Entity</button>
            </form>
        </div>
    );
}

export default CreateEntity;
