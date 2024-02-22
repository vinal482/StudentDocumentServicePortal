import React from "react";
import "../App.css";

const Table = ({ data }) => {
  const [selectedItems, setSelectedItems] = React.useState({}); 
  // First, handle the empty data case outside the component, to prevent the hook from being called conditionally
  if (!data || !Array.isArray(data) || !data.length) {
    return <p>No data to display.</p>;
  }

  const columnNames = Object.keys(data[0]);
// Maintain state for selected items and their copies

  const handleCheckboxChange = (uniqueId, isChecked) => {
    setSelectedItems({
      ...selectedItems,
      [uniqueId]: isChecked, // Track selection status for each item
    });
    console.log(selectedItems);
    
  };

  const handleInputChange = (uniqueId, value) => {
    setSelectedItems({
      ...selectedItems,
      [uniqueId]: {
        copies: value // Ensure valid number
      },
    });
    console.log(selectedItems);
    
  };

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Select<hr style={{margin: "5px 0 10px 0"}} /></th>
          <th>Name<hr style={{margin: "5px 0 10px 0"}} /></th>
          <th>Cost<hr style={{margin: "5px 0 10px 0"}} /></th>
          <th>No. of copies<hr style={{margin: "5px 0 10px 0"}} /></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.uniqueId || index} >
            <td>
              <input
                type="checkbox" style={{marginBottom: '10px'}}
                checked={selectedItems[row.uniqueId || index]} // Use uniqueId if applicable
                onChange={() => handleCheckboxChange(row.uniqueId || index, !selectedItems[row.uniqueId || index])}
              />
            </td>
            {columnNames.map((heading) => (
              <td key={`${heading}-${index}`}><p style={{marginBottom: '10px'}}>{row[heading]}</p></td>
            ))}
            <td>
              <input
              className='tableInputField'
                type="number"
                placeholder="0"
                style={{ width: '1.5rem', marginBottom: '10px'}}
                // value={} // Use uniqueId if applicable
                onChange={(e) => handleInputChange(row.uniqueId || index, e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
