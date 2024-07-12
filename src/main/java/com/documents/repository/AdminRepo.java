package com.documents.repository;

import com.documents.model.AdminDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<AdminDetails, Integer>{
    public boolean existsById(int adminId);
    public AdminDetails findByEmailId(String emailId);
    public AdminDetails findByEmailIdAndPassword(String emailId, String password);
}
