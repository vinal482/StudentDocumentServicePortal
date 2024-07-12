package com.documents.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Admin_Details")
public class AdminDetails {
    
        @Id
        @Column(name = "Admin_ID")
        private int adminId;
        @Column(name = "Email")
        private String emailId;
        @Column(name = "Admin_Name")
        private String adminName;
        @Column(name = "Password")
        private String password;
    
}
