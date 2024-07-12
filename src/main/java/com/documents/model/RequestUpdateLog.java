package com.documents.model;

import java.sql.Timestamp;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Request_Update_Log")
public class RequestUpdateLog {
    @Id
    @Column(name = "request_update_id")
    @Generated(value = "auto")
    private int requestUpdateId;
    @Column(name = "request_id")
    private String requestId;
    @Column(name = "admin_name")
    private String adminName;
    @Column(name = "time")
    private Timestamp time;
    @Column(name = "old_status")
    private String oldStatus;
    @Column(name = "new_status")
    private String newStatus;
}
