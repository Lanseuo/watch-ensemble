import React from 'react';
import './App.css';

import MainPart from './components/MainPart'
import SideBar from './components/SideBar'

function App() {
    return (
        <div style={styles.container}>
            <MainPart />
            <SideBar />
        </div>
    );
}

let styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr'
    }
}

export default App;
