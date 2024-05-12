import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateEntity from './components/CreateEntity';
import EntityList from './components/EntityList';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/create-entity">Create Entity</Link></li>
                        <li><Link to="/entity-list">Entities</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/create-entity" element={<CreateEntity />} />
                    <Route path="/entity-list" element={<EntityList />} />
                    <Route path="/entity/:entityName" element={<EntryList />} />
                    <Route path="/entity/:entityName/form/:id?" element={<EntryForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
