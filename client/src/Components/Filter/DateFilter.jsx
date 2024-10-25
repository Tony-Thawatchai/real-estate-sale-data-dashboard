import React from 'react'

function DateFilter({ displayName, filterValue, onChange , onClick}) {
  return (
    <div>
        <input
            type="date"
            placeholder={`Filter by ${displayName}`}
            defaultValue="2023-01-01"
            onChange={(e) => onChange({ ...filterValue, from: e.target.value })}
            onClick={onClick}
            className="p-2 border rounded w-full text-base"
            />
            <input
            type="date"
            placeholder={`Filter by ${displayName}`}
            defaultValue="2023-12-31"
            onChange={(e) => onChange({ ...filterValue, to: e.target.value })}
            onClick={onClick}
            className="p-2 border rounded w-full text-base"
        />
    </div>
  )
}

export default DateFilter
