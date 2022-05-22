package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.CompetitionSelectDto;
import hr.fer.zr.handballapp.model.Competition;
import org.springframework.stereotype.Component;

@Component
public class CompetitionSelectMapper implements DefaultMapper<Competition, CompetitionSelectDto> {

    @Override
    public CompetitionSelectDto map(Competition competition) {
        CompetitionSelectDto competitionSelectDto = new CompetitionSelectDto();
        competitionSelectDto.setCompetitionId(competition.getCompetitionId());
        competitionSelectDto.setName(competition.getName());
        return competitionSelectDto;
    }
}
