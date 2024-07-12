package com.documents.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Student_Details")
public class StudentDetails {

    @Id
    @Column(name = "Student_ID")
    private String studentId;
    @Column(name = "Email")
    private String emailId;
    @Column(name = "Student_Name")
    private String Name;
}
