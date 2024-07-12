package com.documents.repository;

import com.documents.model.TempRequestDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TempRequestRepo extends JpaRepository<TempRequestDetails, String> {
    public TempRequestDetails findByRequestId(String requestId);
}
