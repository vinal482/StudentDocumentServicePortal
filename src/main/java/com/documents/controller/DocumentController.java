package com.documents.controller;

// import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import com.documents.model.DocumentDetails;
import com.documents.model.DocumentDetailsDTO;
import com.documents.repository.DocumentRepo;

@Controller
@RestController
public class DocumentController {

    @Autowired
    DocumentRepo documentRepository;

    @PostMapping("/document/add")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public String addDocument(@RequestBody DocumentDetails documentDetails) {
        boolean f = documentRepository.existsById(documentDetails.getDocumentId());
        if (f) {
            return "Document already exists";
        } else {
            // Timestamp timestamp1 = new Timestamp(System.currentTimeMillis());
            // documentDetails.setAddedDate(timestamp1);
            documentRepository.save(documentDetails);
            return "Document added successfully";
        }
    }

    @GetMapping("/document/getall")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getAllDocuments() {
        try {
            List<DocumentDetails> documentDetails = documentRepository.findAll();
            return new ResponseEntity<>(documentDetails, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/document/update")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> updateDocument(@RequestBody DocumentDetails documentDetails) {
        try {
            DocumentDetails doc = documentRepository.findById(documentDetails.getDocumentId()).orElse(null);
            if (doc != null) {
                doc.setEnabled(documentDetails.isEnabled());
                doc.setDocumentCost(documentDetails.getDocumentCost());
                doc.setVisibleTo(documentDetails.getVisibleTo());
                if(documentDetails.getDocumentName() != null) {
                    doc.setDocumentName(documentDetails.getDocumentName());
                } else {
                    doc.setDocumentName(doc.getDocumentName());
                }
                documentRepository.save(doc);
                return new ResponseEntity<>(doc, null, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Document does not exist", null, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/document/getallwithoutdate")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getAllDocumentsWithoutDate() {
        try {
            List<DocumentDetailsDTO> documentDetailsDTOs = documentRepository.findAll().stream()
                    .map(document -> new DocumentDetailsDTO(document.getDocumentName(),
                            document.getDocumentCost()))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(documentDetailsDTOs, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/document/get")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getDocument(@RequestParam int documentId) {
        try {
            DocumentDetails document = documentRepository.findByDocumentId(documentId);
            if (document != null) {
                return new ResponseEntity<>(document, null, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Document does not exist", null, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
