package com.documents.service;

import com.documents.model.StudentDetails;

public interface UserService{
    StudentDetails createUser(StudentDetails student);

    public boolean checkId(int studentId);
}
