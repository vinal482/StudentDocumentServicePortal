package com.documents.repository;

import com.documents.model.PaymentLogs;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentLogsRepo extends JpaRepository<PaymentLogs, Integer> {

    public boolean existsById(int id);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM PaymentLogs r WHERE r.referenceNo = ?1")
    public boolean existsByReferenceNo(String refNumber);
}
