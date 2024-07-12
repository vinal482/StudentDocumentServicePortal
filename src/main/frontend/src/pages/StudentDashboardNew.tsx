import React, { useEffect } from "react";
import StudentNavBar from "../components/StudentNavBar.tsx";
import "../App.css";
import { Link } from "react-router-dom";
// import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";

// student Document Service Dashboard
const StudentDSD = () => {
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectedItems, setSelectedItems] = React.useState([]); // Use this to store the selected items
    const [numberOfCopies, setNumberOfCopies] = React.useState([]);
    const [studentId, setStudentId] = React.useState<number>(0);
    const [email, setEmail] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [data, setDocs] = React.useState<string>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [nextPressed, setNextPressed] = React.useState<boolean>(false);
    const [totalCost, setTotalCost] = React.useState<number>(0);
    const [modeOfDelivery, setModeOfDelivery] = React.useState<string>("");
    const [deliveryCharges, setDeliveryCharges] = React.useState<number>(0);
    const [contactNo, setContactNo] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [studentType, setStudentType] = React.useState<string>("");
    const [selectedProducts, setSelectedProducts] = React.useState(null);
    var noOfCopiesNew = new Object([]);
    var totalAmountPaid = 0;

    // const handleCheckboxChange = (index) => {
    //     setSelectedRows((prevRows) =>
    //         prevRows.includes(index)
    //             ? prevRows.filter((row) => row !== index)
    //             : [...prevRows, index]
    //     );
    // };

    const handleInputChange = async (index, value) => {
        // setNumberOfCopies((prevCopies) => ({ ...prevCopies, [index]: value }));
        // var tempData = data;
        // tempData[index].noOfCopies = value;
        // await setDocs(tempData)
        noOfCopiesNew[index] = value;
    };


    const getSelectedDocuments = async () => {
        const selectedDocs = [];
        var cost = 0;
        for (let i = 0; i < selectedProducts.length; i++) {
            const doc = {
                documentId: selectedProducts[i].documentId, // assuming there's a documentId property
                documentName: selectedProducts[i].documentName,
                documentCost: selectedProducts[i].documentCost,
                noOfCopies: noOfCopiesNew[selectedProducts[i].documentId] || 0, // handle missing values
            };
            console.log("doc", doc);
            
            cost += doc.noOfCopies * doc.documentCost;
            selectedDocs.push(doc);
        }
        // for (let i = 0; i < data.length; i++) {
        //     if (selectedRows.includes(i)) {
        //         const doc = {
        //             documentId: data[i].documentId, // assuming there's a documentId property
        //             documentName: data[i].documentName,
        //             documentCost: data[i].documentCost,
        //             noOfCopies: numberOfCopies[i] || 0, // handle missing values
        //         };
        //         cost += doc.noOfCopies * doc.documentCost;
        //         selectedDocs.push(doc);
        //     }
        // }
        totalAmountPaid = cost;
        console.log("Total amount paid:", totalAmountPaid);

        setTotalCost(totalAmountPaid);

        setSelectedItems(selectedDocs);
        console.log(selectedDocs);
        
        // window.location.href = `/student/dsd/${selectedItems}`;
        setNextPressed(true);

        // return selectedDocs;
    };

    const retriveData = async () => {
        const studentId = localStorage.getItem("studentId");
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const studentType = localStorage.getItem("studentType");
        if (studentId && email && name && studentType) {
            await setStudentId(parseInt(studentId));
            await setEmail(email);
            await setName(name);
            await setStudentType(studentType);
        }
        console.log("Student ID:", studentId);
        console.log("Email:", email);
        console.log("Name:", name);
        console.log("Student:", studentType);
        setIsLoading(true);
        try {
            const response = await axios.get(
                "https://documents.daiict.ac.in/document/getall",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
            var tempDocData = new Object([]);
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].enabled === true && (response.data[i].visibleTo === 1 || response.data[i].visibleTo == studentType)) {
                    tempDocData[response.data[i].documentId] = (response.data[i]);
                    tempDocData[response.data[i].documentId].noOfCopies = 0;
                }
            }
            console.log("Response:", response.data);
            await setDocs(tempDocData);
        } catch (error) {
            console.error("Error fetching documents:", error);
            alert(
                "There was an error trying to fetch documents. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Dashboard";
        const studentId = localStorage.getItem("studentId");
        if (!studentId) {
            window.location.href = "/student/login";
        }
        else {
            retriveData();
        }
    }, []);

    const handleModeOfDeliveryChange = async (value) => {
        var cost = -1;
        totalAmountPaid = totalCost;
        if (value === "On Campus") {
            document.getElementById("address").disabled = true;
            if (modeOfDelivery === "Inside India") {
                // If mode of delivery was previously inside India
                totalAmountPaid -= 130;
                // await setTotalCost(TotalCost);
                console.log(totalCost);
            } else if (modeOfDelivery === "Outside India") {
                // If mode of delivery was previously outside India
                totalAmountPaid -= 2500;
                // await setTotalCost(TotalCost);
                console.log(totalAmountPaid);
            }

            cost = 0;
        } else if (value === "Inside India") {
            document.getElementById("address").disabled = false;
            if (modeOfDelivery === "On Campus") {
                // If mode of delivery was previously on campus
                totalAmountPaid -= 0;
                // await setTotalCost(totalCost - 0);
                console.log(totalAmountPaid);
            } else if (modeOfDelivery === "Outside India") {
                // If mode of delivery was previously outside India
                totalAmountPaid -= 2500;
                // const TotalCost = totalCost - 2500;
                // await setTotalCost(tota);
                console.log(totalAmountPaid);
            }

            cost = 130;
        } else if (value === "Outside India") {
            document.getElementById("address").disabled = false;
            if (modeOfDelivery === "On Campus") {
                // If mode of delivery was previously on campus
                // await setTotalCost(totalCost - 0);
                console.log(totalCost);
            } else if (modeOfDelivery === "Inside India") {
                // If mode of delivery was previously inside India
                totalAmountPaid -= 130;
                /// const TotalCost = totalCost - 130;
                // await setTotalCost(TotalCost);
                console.log(totalAmountPaid);
            }
            cost = 2500;
        }
        if (cost === -1) {
            if (modeOfDelivery === "Inside India") {
                await setTotalCost(totalCost - 130);
            } else if (modeOfDelivery === "Outside India") {
                await setTotalCost(totalCost - 2500);
            }
            await setModeOfDelivery("");
            return;
        }
        // await setTotalCost(totalCost + cost);
        totalAmountPaid += cost;
        setTotalCost(totalAmountPaid);
        await setModeOfDelivery(value);
        if (value === "On Campus") {
            setDeliveryCharges(0);
        } else if (value === "Inside India") {
            setDeliveryCharges(130);
        } else if (value === "Outside India") {
            setDeliveryCharges(2500);
        }
        console.log("Mode of delivery:", value);
    };

    const handlePayment = async () => {
        if (modeOfDelivery === "" || modeOfDelivery === "Select") {
            alert("Please select mode of delivery");
            return;
        } else if (contactNo === "") {
            alert("Please enter contact number");
            return;
        } else if (contactNo.length !== 10) {
            alert("Please enter a valid contact number");
            return;
        } else if (
            modeOfDelivery !== "On Campus" &&
            document.getElementById("address").value === ""
        ) {
            alert("Please enter address");
            return;
        }
        // else {
        //   console.log("I am here");
        //   // try {
        //   //   const response = await axios.get('https://eazypayuat.icicibank.com/EazyPG?merchantid=139054&mandatory fields=rhuzNZ47lV8vqa4rRzVjoxDRSunzX9RmnvytvBQFpRJzgzToDysKzFtcAniRVduc&optional fields=&returnurl=FGnFH+KY+Zk5YNhQ4jUZO/NjR1A+t6X95XVll1ON8Ko=&Reference No=rIKYnKh49gysE+XYa24nnA==&submerchantid=4zXT1IznVg4igY5YcjVIMg==&transaction amount=cz/ijwQQl3pWtYKlVuD74g==&paymode=2EaaNnmZtpuhDkJT/xurQg==', {
        //   //     headers: {
        //   //       'Referer': 'https://documents.daiict.ac.in/',
        //   //       // Add any additional headers here
        //   //     },
        //   //   });

        //   // } catch (error) {
        //   //   console.error('Error fetching data:', error);
        //   // }
        //   window.location.href = 'https://eazypayuat.icicibank.com/EazyPG?merchantid=139054&mandatory fields=rhuzNZ47lV8vqa4rRzVjoxDRSunzX9RmnvytvBQFpRJzgzToDysKzFtcAniRVduc&optional fields=&returnurl=FGnFH+KY+Zk5YNhQ4jUZO/NjR1A+t6X95XVll1ON8Ko=&Reference No=rIKYnKh49gysE+XYa24nnA==&submerchantid=4zXT1IznVg4igY5YcjVIMg==&transaction amount=cz/ijwQQl3pWtYKlVuD74g==&paymode=2EaaNnmZtpuhDkJT/xurQg==';
        // }

        try {
            setIsLoading(true);
            const response = await axios.post("https://documents.daiict.ac.in/request/add", {
                studentId: studentId,
                deliveryMod: modeOfDelivery,
                contactNo: contactNo,
                amountPaid: totalCost,
                email: email,
            });
            for (let i = 0; i < selectedItems.length; i++) {
                const response1 = await axios.post(
                    "https://documents.daiict.ac.in/requestedDocuments/add",
                    {
                        requestId: response.data.requestId,
                        documentId: selectedItems[i].documentId,
                        no_of_copies: selectedItems[i].noOfCopies,
                    }
                );
            }
            const tempCostResponse = await axios.post(`https://documents.daiict.ac.in/getEncryptedURL`, { documentName: `${totalCost}`, });
            const MendatoryField = `${response.data.requestId}|45|${totalCost}|x|x|x|${contactNo}|${email}|x`;
            const tempMendatoryField = await axios.post(`https://documents.daiict.ac.in/getEncryptedURL`, { documentName: `${MendatoryField}` });
            const tempReferenceNo = await axios.post("https://documents.daiict.ac.in/getEncryptedURL", { documentName: `${response.data.requestId}` });
            // const tempSubMerchantNo = await axios.post("https://documents.daiict.ac.in/getEncryptedURL", {documentName: `78`});
            // const tempReturnURL = await axios.post("https://documents.daiict.ac.in/getEncryptedURL", {documentName: `https://documents.daiict.ac.in`})
            console.log(tempCostResponse, tempMendatoryField, tempReferenceNo);
            if (modeOfDelivery === "On Campus") {
                // alert("Request placed successfully. You can collect the documents from the college office.");
            } else {
                const response2 = await axios.post("https://documents.daiict.ac.in/post/add", {
                    requestId: response.data.requestId,
                    address: address,
                });
                // alert("Request placed successfully. You will receive the documents at the given address.");
            }
            window.location.href = `https://eazypay.icicibank.com/EazyPG?merchantid=380933&mandatory fields=${tempMendatoryField.data}&optional fields=&returnurl=yF0FXqTdc5NFa8I1EpsdV/bToaEhM7eH06nfBM63TdU=&Reference No=${tempReferenceNo.data}&submerchantid=8t85t65Qw5+K72l18iDKFA==&transaction amount=${tempCostResponse.data}&paymode=7MfEN3aDFsTFlTxonBnDKw==`;
            // return;
        } catch (error) {
            console.error("Error sending payment request:", error);
            alert(
                "There was an error trying to make payment. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const noOfCopiesBody = (row) => {
        return (
            <>
                <input
                    className="tableInputField"
                    type="number"
                    placeholder="0"
                    value={numberOfCopies[row.documentId]}
                    style={{
                        width: "1.5rem",
                        marginBottom: "10px",
                    }}
                    // value={} // Use uniqueId if applicable
                    onChange={(e) =>
                        handleInputChange(row.documentId, e.target.value)
                    }
                />
            </>
        );
    }

    //  console.log(localStorage.getItem("name"));

    return (
        <>
            <StudentNavBar />
            <div className="container">
                <div className="studentDSDContainer">
                    <DataTable
                        selectionMode={'checkbox'}
                        value={data}
                        paginator
                        rows={50}
                        dataKey="documentId"
                        selection={selectedProducts}
                        onSelectionChange={(e) => {
                            setSelectedProducts(e.value); console.log(selectedProducts);
                        }}
                        //   filters={filters}
                        filterDisplay="row"
                        //   loading={loading}
                        rowsPerPageOptions={[50, 100, 150, 200]}
                        showGridlines
                        //   globalFilterFields={[
                        //     "studentId",
                        //     "contactNo",
                        //     "amountPaid",
                        //     "deliveryMod",
                        //     "status",
                        //     "transactionId"
                        //   ]}
                        emptyMessage="No Data found."
                    >
                        <Column
                            selectionMode="multiple"
                            style={{ minWidth: "3rem", padding: "5px", paddingRight: "5px" }}
                        ></Column>
                        <Column
                            sortable
                            field="documentName"
                            header="Document Name"
                            // filter
                            // filterPlaceholder="Search by student ID"
                            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
                        />
                        <Column
                            sortable
                            field="documentCost"
                            header="Cost"
                            // filter
                            // filterPlaceholder="Search by student ID"
                            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
                        />
                        <Column
                            body={noOfCopiesBody}
                            header="Copies"
                            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
                        />
                        {/* <Column
            sortable
            field="studentId"
            header="Student ID"
            filter
            filterPlaceholder="Search by student ID"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="email"
            header="Email"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="contactNo"
            header="Contact No"
            filter
            filterPlaceholder="Search by contact No"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="transactionId"
            header="Transaction ID"
            filter
            filterPlaceholder="Search"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            body={timeTodateBody}
            header="Requested time"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            field="amountPaid"
            header="Charges"
            style={{ minWidth: "5rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            field="deliveryMod"
            header="Delivery"
            filter
            filterPlaceholder="Search by Delivery"
            style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column
            sortable
            body={StatusBody}
            header="Status"
            filter
            filterPlaceholder="Search"
            style={{ minWidth: "5rem", padding: "5px", paddingRight: "5px" }}
          />
          <Column body={DocumentBody} header="Documents" style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }} />
          <Column body={PostBody} header="Post" style={{ minWidth: "7rem", padding: "5px", paddingRight: "5px" }} /> */}
                    </DataTable>

                    {nextPressed && !isLoading ? (
                        <>
                            <div className="deliveryContainer">
                                <div className="deliverySelectModeOfDelivery">
                                    <label htmlFor="modeOfDelivery">Mode of Delivery: </label>
                                    <select
                                        name="modeOfDelivery"
                                        id="modeOfDelivery"
                                        className="modeofDeliverySelect"
                                        onChange={(e) => handleModeOfDeliveryChange(e.target.value)}
                                    >
                                        <option value="Select">Select</option>
                                        <option value="On Campus">On Campus (0 INR)</option>
                                        <option value="Inside India">Inside India (130 INR)</option>
                                        <option value="Outside India">
                                            Outside India (2500 INR)
                                        </option>
                                    </select>
                                </div>
                                <div className="deliveryAddress">
                                    <label htmlFor="address">Address: </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="deliveryAddressInputBar"
                                        placeholder="Enter Address"
                                        disabled={true}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="deliveryAddress">
                                    <label htmlFor="contact">Contact number: </label>
                                    <input
                                        type="text"
                                        id="contact"
                                        name="contact"
                                        className="deliveryAddressInputBar"
                                        placeholder="Enter Contact Number"
                                        onChange={(e) => setContactNo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="selectedDocumentDetails">
                                <div className="selectedDocumentDetailsTitle">
                                    Selected Documents
                                </div>
                                <div className="selectedDocumentsTable">
                                    <table style={{ width: "100%" }}>
                                        <thead>
                                            <tr>
                                                <th>
                                                    Name
                                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                                </th>
                                                <th>
                                                    Cost
                                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                                </th>
                                                <th>
                                                    No of Copies
                                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                                </th>
                                                <th>
                                                    Total Cost
                                                    <hr style={{ margin: "5px 0 10px 0" }} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedItems.map((row, index) => (
                                                <tr key={row.documentId || index}>
                                                    <td>
                                                        <p style={{ marginBottom: "10px" }}>
                                                            {row.documentName}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p style={{ marginBottom: "10px" }}>
                                                            {row.documentCost}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p style={{ marginBottom: "10px" }}>
                                                            {row.noOfCopies}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p style={{ marginBottom: "10px" }}>
                                                            {row.noOfCopies * row.documentCost} INR
                                                        </p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="selectedDocumentTotalCost">
                                    (Including {modeOfDelivery}({deliveryCharges}))Total Cost: {totalCost} INR
                                </div>
                            </div>
                            <div className="studentDocumentSubmit">
                                <button
                                    type="button"
                                    className="studentSelectedDocsBackBtn"
                                    onClick={() => {
                                        setNextPressed(false);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    className="studentSelectedDocsPayBtn"
                                    onClick={() => handlePayment()}
                                >
                                    Pay
                                </button>
                            </div>
                        </>
                    ) : null}

                    {isLoading ? (
                        <TailSpin // Type of spinner
                            height="40"
                            width="40"
                            color="#007bff"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    ) : null}
                    {
                        !isLoading && !nextPressed ? (
                            <>
                                {/* <div className="studentDocumentDetails">
                                    <div className="studentDocument">
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
                                                            <p style={{ marginBottom: "10px" }}>
                                                                {row.documentName}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p style={{ marginBottom: "10px" }}>
                                                                {row.documentCost}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="tableInputField"
                                                                type="number"
                                                                placeholder="0"
                                                                value={numberOfCopies[index]}
                                                                style={{
                                                                    width: "1.5rem",
                                                                    marginBottom: "10px",
                                                                }}
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
                                    </div>
                                </div> */}
                                <div className="studentDocumentSubmit">
                                    <button
                                        type="button"
                                        className="studentDSDBtn"
                                        onClick={() => getSelectedDocuments()}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : null // Add a spinner here
                    }
                </div>
            </div>
        </>
    );
};

export default StudentDSD;
