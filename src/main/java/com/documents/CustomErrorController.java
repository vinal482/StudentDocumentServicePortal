package com.documents;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

//import org.apache.maven.model.Model;
import com.documents.model.PaymentLogs;
import com.documents.model.RequestsDetails;
import com.documents.model.TempRequestDetails;
import com.documents.repository.PaymentLogsRepo;
import com.documents.repository.RequestRepo;
import com.documents.repository.TempRequestRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
public class CustomErrorController  implements ErrorController {



    @Autowired
    PaymentLogsRepo paymentLogsRepo;

    @Autowired
    TempRequestRepo tempRequestRepo;

    @Autowired
    RequestRepo requestRepo;
    private static final Logger logger = LoggerFactory.getLogger(CustomErrorController.class);
    @PostMapping("/error")
    public String handleError(HttpServletRequest request, Model model) {
        // Get the POST request body
        String requestBody = getRequestBody(request);
        // Parse the request body into key-value pairs
        Map<String, String> fields = parseRequestBody(requestBody);
        System.out.println("ID" + fields.get("ID"));
//        // Iterate over the map and print each key-value pair (for demonstration)
        for (Map.Entry<String, String> entry : fields.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            System.out.println("Key: " + key + ", Value: " + value);
        }

        // Create a new instance of TempRequestDetails
        RequestsDetails tempRequestDetails = new RequestsDetails();

        if(fields.get("ID") != null) {
            PaymentLogs paymentLogs = new PaymentLogs();

            paymentLogs.setMerchantId(fields.get("ID"));
            paymentLogs.setRS(fields.get("RS"));
            paymentLogs.setInterchangeValue(fields.get("Interchange+Value"));
            paymentLogs.setMandatoryFields(fields.get("mandatory+fields"));
            paymentLogs.setTDR(fields.get("TDR"));
            paymentLogs.setSubMerchantId(fields.get("SubMerchantId"));
            paymentLogs.setRSV((fields.get("RSV")));
            paymentLogs.setPaymentMode(fields.get("Payment+Mode"));
            paymentLogs.setTPS(fields.get("TPS"));
            paymentLogs.setOptionalFields(fields.get("optional+fields"));
            paymentLogs.setResponseCode(fields.get("Response+Code"));
            paymentLogs.setReferenceNo(fields.get("ReferenceNo"));
            paymentLogs.setTotalAmount(fields.get("Total+Amount"));
            paymentLogs.setTransactionAmount(fields.get("Transaction+Amount"));
            paymentLogs.setTransactionDate(fields.get("Transaction+Date"));
            paymentLogs.setProcessingFeeAmount(fields.get("Processing+Fee+Amount"));
            paymentLogs.setServiceTaxAmount(fields.get("Service+Tax+Amount"));
            paymentLogs.setUniqueRefNumber(fields.get("Unique+Ref+Number"));

            paymentLogs.setResponseMessage(getErrorMessage(paymentLogs.getResponseCode()));
            TempRequestDetails oldRequest = tempRequestRepo.findByRequestId(paymentLogs.getReferenceNo());
            paymentLogs.setStudentId(oldRequest.getStudentId());
            if(!paymentLogsRepo.existsByReferenceNo(paymentLogs.getReferenceNo())) {
                paymentLogsRepo.save(paymentLogs);
            }
//            RestTemplate restTemplate = new RestTemplate();
//            String result = restTemplate.postForObject("https://documents.daiict.ac.in/paymentLogs/add", paymentLogs, String.class);
//            System.out.println(result);
//
////            try {
////                jsonResponse = new (result);
////            } catch (JSONException e) {
////                e.printStackTrace();
////            }

            if(Objects.equals(fields.get("Response+Code"), "E000") || Objects.equals(fields.get("Response+Code"), "E006") || Objects.equals(fields.get("Response+Code"), "E008") ) {
                RequestsDetails requestsDetails = new RequestsDetails();
                requestsDetails.setRequestId(oldRequest.getRequestId());
                requestsDetails.setTime(oldRequest.getTime());
                requestsDetails.setStatus("Pending");
                requestsDetails.setDeliveryMod(oldRequest.getDeliveryMod());
                requestsDetails.setContactNo(oldRequest.getContactNo());
                requestsDetails.setTransactionId(paymentLogs.getUniqueRefNumber());
                oldRequest.setTransactionId(paymentLogs.getUniqueRefNumber());
                requestsDetails.setAmountPaid(oldRequest.getAmountPaid());
                requestsDetails.setStudentId(oldRequest.getStudentId());
                requestsDetails.setEmail(oldRequest.getEmail());
                LocalDateTime now = LocalDateTime.now();
                Timestamp time = Timestamp.valueOf(now);
                requestsDetails.setTransactionTime(time);
                if(!requestRepo.existsById(requestsDetails.getRequestId())) {
                    requestRepo.save(requestsDetails);
                }
                oldRequest.setStatus("Successful");
                tempRequestRepo.save(oldRequest);
            }
        }

        // Add the fields to the model
        model.addAttribute("fields", fields);

        return "error";
    }

    public String getErrorMessage(String code) {
        Map<String, String> errorCodeMap = new HashMap<>();

        errorCodeMap.put("E000", "Received successful confirmation in real time for the transaction. Settlement process is initiated for the transaction.");
        errorCodeMap.put("E001", "Unauthorized Payment Mode");
        errorCodeMap.put("E002", "Unauthorized Key");
        errorCodeMap.put("E003", "Unauthorized Packet");
        errorCodeMap.put("E004", "Unauthorized Merchant");
        errorCodeMap.put("E005", "Unauthorized Return URL");
        errorCodeMap.put("E006", "Transaction is already paid");
        errorCodeMap.put("E007", "Transaction Failed");
        errorCodeMap.put("E008", "Failure from Third Party due to Technical Error");
        errorCodeMap.put("E009", "Bill Already Expired");
        errorCodeMap.put("E0031", "Mandatory fields coming from merchant are empty");
        errorCodeMap.put("E0032", "Mandatory fields coming from database are empty");
        errorCodeMap.put("E0033", "Payment mode coming from merchant is empty");
        errorCodeMap.put("E0034", "PG Reference number coming from merchant is empty");
        errorCodeMap.put("E0035", "Sub merchant id coming from merchant is empty");
        errorCodeMap.put("E0036", "Transaction amount coming from merchant is empty");
        errorCodeMap.put("E0037", "Payment mode coming from merchant is other than 0 to 9");
        errorCodeMap.put("E0038", "Transaction amount coming from merchant is more than 9 digit length");
        errorCodeMap.put("E0039", "Mandatory value Email in wrong format");
        errorCodeMap.put("E00310", "Mandatory value mobile number in wrong format");
        errorCodeMap.put("E00311", "Mandatory value amount in wrong format");
        errorCodeMap.put("E00312", "Mandatory value Pan card in wrong format");
        errorCodeMap.put("E00313", "Mandatory value Date in wrong format");
        errorCodeMap.put("E00314", "Mandatory value String in wrong format");
        errorCodeMap.put("E00315", "Optional value Email in wrong format");
        errorCodeMap.put("E00316", "Optional value mobile number in wrong format");
        errorCodeMap.put("E00317", "Optional value amount in wrong format");
        errorCodeMap.put("E00318", "Optional value pan card number in wrong format");
        errorCodeMap.put("E00319", "Optional value date in wrong format");
        errorCodeMap.put("E00320", "Optional value string in wrong format");
        errorCodeMap.put("E00321", "Request packet mandatory columns is not equal to mandatory columns set in enrolment or optional columns are not equal to optional columns length set in enrolment");
        errorCodeMap.put("E00322", "Reference Number Blank");
        errorCodeMap.put("E00323", "Mandatory Columns are Blank");
        errorCodeMap.put("E00324", "Merchant Reference Number and Mandatory Columns are Blank");
        errorCodeMap.put("E00325", "Merchant Reference Number Duplicate");
        errorCodeMap.put("E00326", "Sub merchant id coming from merchant is non numeric");
        errorCodeMap.put("E00327", "Cash Challan Generated");
        errorCodeMap.put("E00328", "Cheque Challan Generated");
        errorCodeMap.put("E00329", "NEFT Challan Generated");
        errorCodeMap.put("E00330", "Transaction Amount and Mandatory Transaction Amount mismatch in Request URL");
        errorCodeMap.put("E00331", "UPI Transaction Initiated Please Accept or Reject the Transaction");
        errorCodeMap.put("E00332", "Challan Already Generated, Please re-initiate with unique reference number");
        errorCodeMap.put("E00333", "Referer is null/invalid Referer");
        errorCodeMap.put("E00334", "Mandatory Parameters Reference No and Request Reference No parameter values are not matched");
        errorCodeMap.put("E00335", "Transaction Cancelled By User");
        errorCodeMap.put("E0801", "FAIL");
        errorCodeMap.put("E0802", "User Dropped");
        errorCodeMap.put("E0803", "Canceled by user");
        errorCodeMap.put("E0804", "User Request arrived but card brand not supported");
        errorCodeMap.put("E0805", "Checkout page rendered Card function not supported");
        errorCodeMap.put("E0806", "Forwarded / Exceeds withdrawal amount limit");
        errorCodeMap.put("E0807", "PG Fwd Fail / Issuer Authentication Server failure");
        errorCodeMap.put("E0808", "Session expiry / Failed Initiate Check, Card BIN not present");
        errorCodeMap.put("E0809", "Reversed / Expired Card");
        errorCodeMap.put("E0810", "Unable to Authorize");
        errorCodeMap.put("E0811", "Invalid Response Code or Guide received from Issuer");
        errorCodeMap.put("E0812", "Do not honor");
        errorCodeMap.put("E0813", "Invalid transaction");
        errorCodeMap.put("E0814", "Not Matched with the entered amount");
        errorCodeMap.put("E0815", "Not sufficient funds");
        errorCodeMap.put("E0816", "No Match with the card number");
        errorCodeMap.put("E0817", "General Error");
        errorCodeMap.put("E0818", "Suspected fraud");
        errorCodeMap.put("E0819", "User Inactive");
        errorCodeMap.put("E0820", "ECI 1 and ECI6 Error for Debit Cards and Credit Cards");
        errorCodeMap.put("E0821", "ECI 7 for Debit Cards and Credit Cards");
        errorCodeMap.put("E0822", "System error. Could not process transaction");
        errorCodeMap.put("E0823", "Invalid 3D Secure values");
        errorCodeMap.put("E0824", "Bad Track Data");
        errorCodeMap.put("E0825", "Transaction not permitted to cardholder");
        errorCodeMap.put("E0826", "RuPay timeout from issuing bank");
        errorCodeMap.put("E0827", "OCEAN for Debit Cards and Credit Cards");
        errorCodeMap.put("E0828", "E-commerce decline");
        errorCodeMap.put("E0829", "This transaction is already in process or already processed");
        errorCodeMap.put("E0830", "Issuer or switch is inoperative");
        errorCodeMap.put("E0831", "Exceeds withdrawal frequency limit");
        errorCodeMap.put("E0832", "Restricted card");
        errorCodeMap.put("E0833", "Lost card");
        errorCodeMap.put("E0834", "Communication Error with NPCI");
        errorCodeMap.put("E0835", "The order already exists in the database");
        errorCodeMap.put("E0836", "General Error Rejected by NPCI");
        errorCodeMap.put("E0837", "Invalid credit card number");
        errorCodeMap.put("E0838", "Invalid amount");
        errorCodeMap.put("E0839", "Duplicate Data Posted");
        errorCodeMap.put("E0840", "Format error");
        errorCodeMap.put("E0841", "SYSTEM ERROR");
        errorCodeMap.put("E0842", "Invalid expiration date");
        errorCodeMap.put("E0843", "Session expired for this transaction");
        errorCodeMap.put("E0844", "FRAUD - Purchase limit exceeded");
        errorCodeMap.put("E0845", "Verification decline");
        errorCodeMap.put("E0846", "Compliance error code for issuer");
        errorCodeMap.put("E0847", "Caught ERROR of type:[ System.Xml.XmlException ] . strXML is not a valid XML string Failed in Authorize - I");
        errorCodeMap.put("E0848", "Incorrect personal identification number");
        errorCodeMap.put("E0849", "Stolen card");
        errorCodeMap.put("E0850", "Transaction timed out, please retry");
        errorCodeMap.put("E0851", "Failed in Authorization - PE");
        errorCodeMap.put("E0852", "Cardholder did not return from Rupay");
        errorCodeMap.put("E0853", "Missing Mandatory Field(s)The field card_number has exceeded the maximum length of 19");
        errorCodeMap.put("E0854", "Exception in CheckEnrollmentStatus: Data at the root level is invalid. Line 1, position 1.");
        errorCodeMap.put("E0855", "CAF status = 0 or 9");
        errorCodeMap.put("E0856", "412");
        errorCodeMap.put("E0857", "Allowable number of PIN tries exceeded");
        errorCodeMap.put("E0858", "No such issuer");
        errorCodeMap.put("E0859", "Invalid Data Posted");
        errorCodeMap.put("E0860", "PREVIOUSLY AUTHORIZED");
        errorCodeMap.put("E0861", "Cardholder did not return from ACS");
        errorCodeMap.put("E0862", "Duplicate transmission");
        errorCodeMap.put("E0863", "Wrong transaction state");
        errorCodeMap.put("E0864", "Card acceptor contact acquirer");

        return errorCodeMap.get(code);
    }

    // Helper method to read the request body
    private String getRequestBody(HttpServletRequest request) {
        StringBuilder requestBody = new StringBuilder();
        try {
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                requestBody.append(line);
            }
        } catch (IOException e) {
            logger.error("Error reading request body", e);
        }
        return requestBody.toString();
    }

    // Helper method to parse request body into key-value pairs
    private Map<String, String> parseRequestBody(String requestBody) {
        Map<String, String> fields = new HashMap<>();
        String[] keyValuePairs = requestBody.split("&");
        for (String pair : keyValuePairs) {
            String[] keyValue = pair.split("=");
            String key = keyValue[0];
            String value = keyValue.length > 1 ? keyValue[1] : "";
            fields.put(key, value);
        }
        return fields;
    }

}
