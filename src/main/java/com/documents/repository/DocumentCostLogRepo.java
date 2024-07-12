package com.documents.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.documents.model.DocumentCostLog;

public interface DocumentCostLogRepo extends JpaRepository<DocumentCostLog, Integer> {
    @Query("SELECT d FROM DocumentCostLog d WHERE d.documentId = ?1")
    public List <DocumentCostLog> findByDocumentId(int documentId);
}
