import React from "react";
import "../App.css";

export var Docs = [];

const Table = ({ data }) => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [numberOfCopies, setNumberOfCopies] = React.useState({});
  const [selectedItems, setSelectedItems] = React.useState({});
  // First, handle the empty data case outside the component, to prevent the hook from being called conditionally
  if (!data || !Array.isArray(data) || !data.length) {
    return <p>No data to display.</p>;
  }
  // Maintain state for selected items and their copies

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevRows) =>
      prevRows.includes(index)
        ? prevRows.filter((row) => row !== index)
        : [...prevRows, index]
    );
    console.log(getSelectedDocuments());
  };

  const handleInputChange = (index, value) => {
    setNumberOfCopies((prevCopies) => ({ ...prevCopies, [index]: value }));
    console.log(getSelectedDocuments());
  };

  const getSelectedDocuments = () => {
    const selectedDocs = [];
    for (let i = 0; i < data.length; i++) {
      if (selectedRows.includes(i)) {
        const doc = {
          documentId: data[i].documentId, // assuming there's a documentId property
          documentName: data[i].documentName,
          noOfCopies: numberOfCopies[i] || 0, // handle missing values
        };
        selectedDocs.push(doc);
      }
    }
    Docs = selectedDocs;
    return selectedDocs;
  };

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>
            Select
            <hr style={{ margin: "5px 0 10px 0" }} />
          </th>
          <th>
            Name
            <hr style={{ margin: "5px 0 10px 0" }} />
          </th>
          <th>
            Cost
            <hr style={{ margin: "5px 0 10px 0" }} />
          </th>
          <th>
            No. of copies
            <hr style={{ margin: "5px 0 10px 0" }} />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.uniqueId || index}>
            <td>
              <input
                type="checkbox"
                style={{ marginBottom: "10px" }}
                checked={selectedRows.includes(index)} // Use uniqueId if applicable
                onChange={() => handleCheckboxChange(index)}
              />
            </td>
            <td>
              <p style={{ marginBottom: "10px" }}>{row.documentName}</p>
            </td>
            <td>
              <p style={{ marginBottom: "10px" }}>{row.documentCost}</p>
            </td>
            <td>
              <input
                className="tableInputField"
                type="number"
                placeholder="0"
                value={numberOfCopies[index]}
                style={{ width: "1.5rem", marginBottom: "10px" }}
                // value={} // Use uniqueId if applicable
                onChange={(e) =>
                  handleInputChange(index, e.target.value)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
