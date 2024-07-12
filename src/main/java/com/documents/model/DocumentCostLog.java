package com.documents.model;

import java.sql.*;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "document_cost_log")
public class DocumentCostLog {
    @Id
    @Column(name = "Document_cost_log_id")
    @Generated(value = "auto")
    private int documentCostLogId;
    @Column(name = "document_id")
    private int documentId;
    @Column(name = "time")
    private Timestamp time;
    @Column(name = "admin_name")
    private String adminName;
    @Column(name = "document_old_cost")
    private double documentOldCost;
    @Column(name = "document_new_cost")
    private double documentNewCost;
}
