import React, { useState } from "react";
import "../App.css";

const Table = ({ data }) => {
  // First, handle the empty data case outside the component, to prevent the hook from being called conditionally
  if (!data || !Array.isArray(data) || !data.length) {
    return <p>No data to display.</p>;
  }

  const columnNames = Object.keys(data[0]);

  // Now, call the useState hook outside any conditional blocks
  //   const [selectedItems, setSelectedItems] = useState({});

  //   const handleCheckboxChange = (id, checked) => {
  //     setSelectedItems({ ...selectedItems, [id]: checked });
  //   };

  //   const handleInputChange = (id, value) => {
  //     setSelectedItems({ ...selectedItems, [id]: value });
  //   };

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Select</th>
          {columnNames.map((heading) => (
            <th key={heading}>{heading}</th>
          ))}
          <th>No. of copies</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.uniqueId || index} >
            <td>
              <input
                type="checkbox"
                // checked={selectedItems[row.uniqueId || index]} // Use uniqueId if applicable
                // onChange={() => handleCheckboxChange(row.uniqueId || index, !selectedItems[row.uniqueId || index])}
              />
            </td>
            {columnNames.map((heading) => (
              <td key={`${heading}-${index}`}>{row[heading]}</td>
            ))}
            <td>
              <input
              className='tableInputField'
                type="text"
                placeholder="0"
                style={{ width: '1.5rem'}}
                // value={selectedItems[row.uniqueId || index] || ""} // Use uniqueId if applicable
                // onChange={(e) => handleInputChange(row.uniqueId || index, e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
