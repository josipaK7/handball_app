package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.CoachDto;
import hr.fer.zr.handballapp.dto.CoachSelectDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CoachService {
    CoachDto getCoach(Long coachId);
    List<CoachSelectDto> getAllFreeCoaches();
}
