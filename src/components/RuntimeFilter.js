import React from 'react';



function RuntimeFilter({ handleRuntimeChange }) {
    return (
        <div className="runtime-filter">
        <select name="runtime-filter" id="runtime-filter" onChange={handleRuntimeChange}>
        <option value='null'>Select Movie Length</option>
        <option value="short">Less than 90 minutes</option>
        <option value="medium">90-100 minutes</option>
        <option value="mediumish">100 minutes-2 hours</option>
        <option value="long">Over 2 hours</option>
      </select>
        </div>
        
    );
}

export default RuntimeFilter;