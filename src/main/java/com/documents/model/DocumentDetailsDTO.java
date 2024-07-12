package com.documents.model;

import lombok.Data;

@Data
public class DocumentDetailsDTO  {
    private String Name;
    private double Cost;

    public DocumentDetailsDTO() {
    }

    public DocumentDetailsDTO(String documentName, double documentCost) {
        this.Name = documentName;
        this.Cost = documentCost;
    }
}
