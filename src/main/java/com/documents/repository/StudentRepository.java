package com.documents.repository;

import com.documents.model.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface StudentRepository extends JpaRepository<StudentDetails, String> {

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM StudentDetails s WHERE s.studentId = ?1")
    public boolean existsById(String studentId);


}
