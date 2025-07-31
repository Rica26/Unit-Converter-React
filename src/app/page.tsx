"use client";

import React, { useState } from 'react';
import './styles/global.css';
import UnitSelector from './components/UnitSelector';
import Converter from './components/Converter';


export default function HomePage() {

    const [selectedCategory, setSelectedCategory] = useState('Distancia');

    return (
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <UnitSelector selectedCategory={selectedCategory} onChange={setSelectedCategory} />
            <div>
                <Converter selectedCategory={selectedCategory} />
            </div>
        </div>
    );
}

