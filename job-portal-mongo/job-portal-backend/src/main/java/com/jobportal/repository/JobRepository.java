package com.jobportal.repository;

import com.jobportal.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findByEmployerId(String employerId);
    List<Job> findByTitleContainingIgnoreCase(String keyword);
}
