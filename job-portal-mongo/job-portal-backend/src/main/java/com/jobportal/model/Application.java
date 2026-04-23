package com.jobportal.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    private String id;

    // Seeker info
    private String seekerId;
    private String seekerName;
    private String seekerEmail;

    // Job info
    private String jobId;
    private String jobTitle;
    private String jobCompany;
    private String jobLocation;

    private String status = "PENDING"; // PENDING, ACCEPTED, REJECTED
    private String resumeUrl;

    private LocalDateTime appliedAt = LocalDateTime.now();
}
