package com.documents.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Data
@Entity
@Table(name = "temp_requests_details")
public class TempRequestDetails {
    @Id
    @Column(name = "request_id")
    private String requestId;

    @Column(name = "student_id")
    private String studentId;

    @Column(name = "contact_no")
    private String contactNo;

    @Column(name = "time")
    private Timestamp time;

    @Column(name = "amount_paid")
    private double amountPaid;

    @Column(name = "delivery_mod")
    private String deliveryMod;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "payment_status")
    private String status;

    @Column(name = "email")
    private String email;
}
