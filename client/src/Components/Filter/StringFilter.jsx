import React from 'react'

function StringFilter({ displayName, filterValue, onChange , onClick}) {
  return (
    <div>
    
        <input

            type="text"
            placeholder={`Filter by ${displayName}`}
            onChange={(e) => onChange({ ...filterValue, value: e.target.value })}
            onClick={onClick}
            className="p-2 border rounded w-full text-base"
        />
    </div>
  )
}

export default StringFilter
