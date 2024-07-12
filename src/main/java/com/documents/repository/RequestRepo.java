package com.documents.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.documents.model.RequestsDetails;

public interface RequestRepo extends JpaRepository<RequestsDetails, String> {
    public RequestsDetails findByRequestId(String requestId);
    public List<RequestsDetails> findByStudentId(String studentId);
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RequestsDetails r WHERE r.studentId = ?1")
    public boolean existStudentId (String studentId);
//    @Query("SELECT r FROM RequestsDetails r WHERE r.status = ?1")
    public List<RequestsDetails> findByStatus(String status);
    public List<RequestsDetails> findByStudentIdAndStatus(String studentId, String status);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RequestsDetails r WHERE r.requestId = ?1")
    public boolean existsByRequestId(String requestId);
}
