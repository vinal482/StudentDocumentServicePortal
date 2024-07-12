package com.documents.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.documents.model.RequestUpdateLog;

public interface RequestUpdateRepo extends JpaRepository<RequestUpdateLog, Integer>{
    public List<RequestUpdateLog> findByRequestId(String requestId);
    
}
