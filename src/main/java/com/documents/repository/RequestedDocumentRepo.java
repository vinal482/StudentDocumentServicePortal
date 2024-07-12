package com.documents.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.documents.model.RequestedDocuments;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestedDocumentRepo extends JpaRepository<RequestedDocuments, Integer>{
    public List <RequestedDocuments> findByRequestId(String requestId);
}
