package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.CoachDto;
import hr.fer.zr.handballapp.dto.CoachSelectDto;
import hr.fer.zr.handballapp.mapper.CoachMapper;
import hr.fer.zr.handballapp.mapper.CoachSelectMapper;
import hr.fer.zr.handballapp.model.Coach;
import hr.fer.zr.handballapp.repository.CoachRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoachServiceImpl implements CoachService {
    private final CoachRepository coachRepository;
    private final CoachSelectMapper coachSelectMapper;
    private final CoachMapper coachMapper;

    public CoachServiceImpl(CoachRepository coachRepository, CoachSelectMapper coachSelectMapper, CoachMapper coachMapper) {
        this.coachRepository = coachRepository;
        this.coachSelectMapper = coachSelectMapper;
        this.coachMapper = coachMapper;
    }

    @Override
    public CoachDto getCoach(Long coachId) {
        Coach coach = coachRepository.findByCoachId(coachId);
        return this.coachMapper.map(coach);
    }

    @Override
    public List<CoachSelectDto> getAllFreeCoaches() {
        List<Coach> coaches = coachRepository.findAllByClubIsNull();
        return this.coachSelectMapper.mapToList(coaches);
    }
}
