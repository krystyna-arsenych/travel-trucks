'use client'

import React, { useState } from "react"

export default function Filters() {
    const [location, setLocation] = useState('')
    const [searchLocation, setSearchLocation] = useState('')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
    setLocation(value)
    }

    function handleClick() {
        setSearchLocation(location)
    }
    return (
        <div>
            <input type="text" value={location} onChange={handleChange}>
            </input>
            <h2>Filters</h2>
            <input type="radio"></input>
            <input type="radio"></input>
            <input type="radio"></input>
            <button type="submit" onClick={handleClick}>Search</button>
            <button>Clear filters</button>
        </div>
    )

}