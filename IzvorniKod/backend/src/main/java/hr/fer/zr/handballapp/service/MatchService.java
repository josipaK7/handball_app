package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.MatchSaveRequestDto;
import hr.fer.zr.handballapp.dto.MatchDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MatchService {
    List<MatchDto> getPlayedMatchesByCompetitionId(Long competitionId);

    List<MatchDto> getScheduledMatchesByCompetitionId(Long competitionId);

    MatchDto savePlayedMatch(MatchSaveRequestDto matchSaveRequestDto);

    void deleteMatch(Long matchId);

    MatchDto saveScheduledMatch(MatchSaveRequestDto matchSaveRequestDto);

    List<MatchDto> getMatchesByReferee(Long matchRefereeId);

}
