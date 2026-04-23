package com.jobportal.service;

import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;

    public Application applyForJob(String jobId, String seekerEmail, String resumeUrl) {
        User seeker = userRepository.findByEmail(seekerEmail)
                .orElseThrow(() -> new RuntimeException("Seeker not found"));
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (applicationRepository.existsBySeekerIdAndJobId(seeker.getId(), job.getId())) {
            throw new RuntimeException("Already applied for this job");
        }

        Application application = Application.builder()
                .seekerId(seeker.getId())
                .seekerName(seeker.getName())
                .seekerEmail(seeker.getEmail())
                .jobId(job.getId())
                .jobTitle(job.getTitle())
                .jobCompany(job.getCompany())
                .jobLocation(job.getLocation())
                .resumeUrl(resumeUrl)
                .status("PENDING")
                .build();

        return applicationRepository.save(application);
    }

    public List<Application> getMyApplications(String seekerEmail) {
        User seeker = userRepository.findByEmail(seekerEmail)
                .orElseThrow(() -> new RuntimeException("Seeker not found"));
        return applicationRepository.findBySeekerId(seeker.getId());
    }

    public List<Application> getApplicationsForJob(String jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public Application updateStatus(String applicationId, String status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return applicationRepository.save(application);
    }
}
