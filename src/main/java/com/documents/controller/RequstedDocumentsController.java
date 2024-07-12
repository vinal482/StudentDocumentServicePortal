package com.documents.controller;

import java.util.List;

import org.attoparser.dom.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.documents.model.DocumentDetails;
import com.documents.model.RequestedDocuments;
import com.documents.repository.DocumentRepo;
import com.documents.repository.RequestedDocumentRepo;

@Controller
@RestController
public class RequstedDocumentsController {
    @Autowired
    RequestedDocumentRepo requestedDocumentRepo;

    @GetMapping("/requestedDocuments/get")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> getRequestedDocuments(@RequestParam String requestId) {
        try {
            return new ResponseEntity<>(requestedDocumentRepo.findByRequestId(requestId), null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/requestedDocuments/add")
    @CrossOrigin(origins = "http://10.100.56.153:80")
    public ResponseEntity<?> addRequestedDocuments(@RequestBody RequestedDocuments request) {
        try {
            requestedDocumentRepo.save(request);
            return new ResponseEntity<>(request, null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("requestedDocs/delete")
    public ResponseEntity<?> deleteRequestedDocs(@RequestParam String requestId) {
        try {
            List <RequestedDocuments> list = requestedDocumentRepo.findByRequestId(requestId);
            for (RequestedDocuments document : list) {
                requestedDocumentRepo.deleteById(document.getId());
            }
//            return "Deleted Successfully";
            return new ResponseEntity<>("Deleted", null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", null, HttpStatus.EXPECTATION_FAILED);
        }
    }

}
