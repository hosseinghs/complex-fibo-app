import React, { useState } from 'react'
import axios from 'axios'

const Fib = () => {
    const [index, setIndex] = useState('')

    const calculatedValues = () => {}
    const renderSeenIndexes = () => {}
    const submit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/values', {
                index
            })
            setIndex('');
        }
        catch(e) {
            console.error(e)
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <label>
                    enter your index:
                </label>
                <input type="number" value={index} onChange={e => setIndex(e.target.value)} />
                <button type="submit">submit</button>
            </form>
            <div>
                <h3>
                    Indexes I have seen: {renderSeenIndexes()}
                </h3> 
            </div>
            <h3>
                Calculated Values: {calculatedValues()}
            </h3>
        </div>
    )
}

export default Fib;