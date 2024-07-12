package com.documents.model;

import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "document_details")
public class DocumentDetails {
    
        @Id
        @Column(name = "document_id")
        private int documentId;
        @Column(name = "document_name")
        private String documentName;
        @Column(name = "document_cost")
        private double documentCost;
        @Column(name = "enabled")
        private boolean enabled;
        @Column(name = "visible_to")
        private short visibleTo;
}
