package com.jobportal.service;

import com.jobportal.dto.JobRequest;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public Job postJob(JobRequest request, String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("Employer not found"));
        Job job = Job.builder()
                .title(request.getTitle())
                .company(request.getCompany())
                .location(request.getLocation())
                .description(request.getDescription())
                .salary(request.getSalary())
                .employerId(employer.getId())
                .employerName(employer.getName())
                .build();
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getJobsByEmployer(String employerEmail) {
        User employer = userRepository.findByEmail(employerEmail)
                .orElseThrow(() -> new RuntimeException("Employer not found"));
        return jobRepository.findByEmployerId(employer.getId());
    }

    public Job getJobById(String id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public void deleteJob(String jobId) {
        jobRepository.deleteById(jobId);
    }
}
