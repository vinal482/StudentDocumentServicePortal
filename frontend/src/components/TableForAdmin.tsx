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
          {columnNames.map((heading) => (
            <th key={heading}>{heading}<hr style={{margin: "5px 0 10px 0"}} /></th>
          ))}
          <th>Documents<hr style={{margin: "5px 0 10px 0"}} /></th>
          <th>Post<hr style={{margin: "5px 0 10px 0"}} /></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.uniqueId || index}>
            {columnNames.map((heading) => (
              <td key={`${heading}-${index}`}>{row[heading]}<div style={{marginBottom: '10px'}} /></td>
            ))}
            <td><button className="adminDocsBtn">Docs</button></td>
            <td><button className="adminDocsBtn">Post</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
