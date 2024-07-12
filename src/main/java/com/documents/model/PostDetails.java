package com.documents.model;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Post_Details")
public class PostDetails {
    @Id
    @Column(name = "request_id")
    private String requestId;
    @Column(name = "agency_name")
    private String agencyName;
    @Column(name = "post_time")
    private Date postTime;
    @Column(name = "address")
    private String address;
    @Column(name = "tracking_id")
    private String trackingId;
}
