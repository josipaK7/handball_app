package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.CompetitionSaveRequestDto;
import hr.fer.zr.handballapp.dto.CompetitionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CompetitionService {
    List<CompetitionDto> getAllCompetitions();

    CompetitionDto getCompetitionById(Long competitionId);

    CompetitionDto saveCompetition(CompetitionSaveRequestDto competitionSaveRequestDto);

    void deleteCompetition(Long competitionId);
}
