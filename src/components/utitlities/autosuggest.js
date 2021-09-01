import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest';

export default function autosuggest(props) {
    const [seriesInputSuggestions, setSeriesInputSuggestions] = useState([])

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length

        return inputLength === 0 ? [] : props.suggestions.filter(suggestion =>
            suggestion.name.toLowerCase().includes(inputValue)
        )
    }

    return (
        <Autosuggest
            suggestions={seriesInputSuggestions}
            onSuggestionsFetchRequested={({ value }) => setSeriesInputSuggestions(getSuggestions(value))}
            onSuggestionsClearRequested={() => setSeriesInputSuggestions([])}
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={suggestion => <div>{suggestion.name}</div>}
            inputProps={{
                placeholder: props.placeholder,
                value: props.input,
                onChange: (event, { newValue }) => props.setInput(newValue)
            }}
        />
    )
}