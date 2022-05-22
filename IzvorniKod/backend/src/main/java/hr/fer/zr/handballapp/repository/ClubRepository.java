package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    List<Club> findAll();

    List<Club> findAllByClubCompetitionsCompetitionId(Long competitionId);

    Optional<Club> findByClubId(Long clubId);
}
