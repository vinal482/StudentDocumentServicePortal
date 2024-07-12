package com.documents.controller;

// import java.security.Timestamp;

// import org.hibernate.mapping.Set;
// import org.hibernate.mapping.Set;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.documents.model.DocumentCostLog;
import com.documents.repository.DocumentCostLogRepo;

@Controller
@RestController
public class DocumentCostLogController {
    @Autowired
    DocumentCostLogRepo documentCostLogRepo;

    @GetMapping("/documentCostLog/get")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity <?> getDocumentCostLog(@RequestParam int documentId) {
        return new ResponseEntity<>(documentCostLogRepo.findByDocumentId(documentId), null, HttpStatus.OK);
        // return "Document Cost Log";
    }

    @PostMapping("/documentCostLog/add")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity <?> addDocumentCostLog(@RequestBody DocumentCostLog request) {
        try {
            Timestamp time = new Timestamp(System.currentTimeMillis());
            request.setTime(time);
            documentCostLogRepo.save(request);
            return new ResponseEntity<>(request, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
