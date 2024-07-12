package com.documents.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.documents.model.PostDetails;

public interface PostRepo extends JpaRepository<PostDetails, String>{

    public PostDetails findByRequestId(String requestId);
    
}
