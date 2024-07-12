package com.documents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.documents.model.DocumentDetails;

public interface DocumentRepo extends JpaRepository<DocumentDetails, Integer>{
    public boolean existsById(int documentId);
    public DocumentDetails findByDocumentId(int documentId);
    // public DocumentDetails findByDocumentName(String documentName);
    // public DocumentDetails findByDocumentNameAndDocumentCost(String documentName, String documentCost);
}
