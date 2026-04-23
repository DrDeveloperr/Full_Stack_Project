package com.jobportal.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    private String id;

    private String title;
    private String company;
    private String location;
    private String description;
    private String salary;

    // Store employer info directly (MongoDB style)
    private String employerId;
    private String employerName;

    private LocalDateTime postedAt = LocalDateTime.now();
}
