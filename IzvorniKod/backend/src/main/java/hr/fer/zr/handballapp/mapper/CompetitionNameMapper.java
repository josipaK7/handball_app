package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.CompetitionDto;
import hr.fer.zr.handballapp.model.Competition;
import org.springframework.stereotype.Component;

@Component
public class CompetitionNameMapper implements DefaultMapper<Competition, CompetitionDto>{

    @Override
    public CompetitionDto map(Competition competition) {
        CompetitionDto competitionDto = new CompetitionDto();
        competitionDto.setCompetitionId(competition.getCompetitionId());
        competitionDto.setName(competition.getName());
        return competitionDto;
    }
}
