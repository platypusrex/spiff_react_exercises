import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { parseString } from './parseString';

export const ParserSolution = () => {
  const [value, setValue] = useState('');
  const [parsedData, setParsedData] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleReset = () => {
    setValue('');
    setParsedData(null);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setParsedData(parseString(value))
  };

  return (
    <div className="parser" style={{ gridTemplateColumns: 'repeat(2, 1fr)'}}>
      <form className="parser__form" onSubmit={handleSubmit} onReset={handleReset}>
        <label htmlFor="phrase">Phrase</label>
        <textarea
          name="phrase"
          id="phrase"
          cols="30"
          rows="10"
          value={value}
          onChange={handleChange}
        />
        <div className="parser__button-group">
          <Button variant="warning" type="reset">Reset</Button>
          <Button variant="success" type="submit">Start request</Button>
        </div>
      </form>
      <div className="parser__result">
        <h4>Result</h4>
        {parsedData ? (
          <ul className="parser__list">
            {Object.keys(parsedData).map(key => (
              <li>
                <p>{key}: {' '}</p>
                <p>{parsedData[key]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Enter text to see your alphabetic character count...</p>
        )}
      </div>
    </div>
  )
}
