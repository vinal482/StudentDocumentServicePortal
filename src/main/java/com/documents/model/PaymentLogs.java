package com.documents.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table(name = "payment_logs")
public class PaymentLogs {
    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "Merchant_id")
    private String merchantId;

    @Column(name = "Interchange_Value")
    private String interchangeValue;

    @Column(name = "mandatory_fields")
    private String mandatoryFields;

    @Column(name = "RS")
    private String RS;

    @Column(name = "TDR")
    private String TDR;

    @Column(name = "SubMerchantId")
    private String subMerchantId;

    @Column(name = "RSV")
    private String RSV;

    @Column(name = "Payment_Mode")
    private String paymentMode;

    @Column(name = "TPS")
    private String TPS;

    @Column(name = "optional_fields")
    private String optionalFields;

    @Column(name = "Response_Code")
    private String responseCode;

    @Column(name = "ReferenceNo")
    private String referenceNo;

    @Column(name = "response_message")
    private String responseMessage;

    @Column(name = "studentId")
    private String studentId;

    @Column(name = "Service_Tax_Amount")
    private  String serviceTaxAmount;

    @Column(name = "Transaction_Amount")
    private String transactionAmount;

    @Column(name = "Total_Amount")
    private String totalAmount;

    @Column(name = "Transaction_Date")
    private String transactionDate;

    @Column(name = "Processing_Fee_Amount")
    private String processingFeeAmount;

    @Column(name = "Unique_Ref_Number")
    private String uniqueRefNumber;
}
