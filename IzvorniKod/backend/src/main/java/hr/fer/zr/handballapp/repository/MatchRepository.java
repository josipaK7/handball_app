package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Club;
import hr.fer.zr.handballapp.model.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> findAllByCompetitionCompetitionIdAndDatePlayedBefore(Long competitionId, Timestamp timestamp);
    List<Match> findAllByCompetitionCompetitionIdAndDatePlayedAfter(Long competitionId, Timestamp timestamp);
    Optional<Match> findByMatchId(Long matchId);
    List<Match> findAllByClubOneInOrClubTwoIn(List<Club> clubOneList, List<Club> clubTwoList);
}
