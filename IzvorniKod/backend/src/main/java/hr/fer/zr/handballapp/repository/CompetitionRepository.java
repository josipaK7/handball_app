package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Competition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompetitionRepository extends JpaRepository<Competition, Long> {
    List<Competition> findAll();
    Optional<Competition> findByCompetitionId(Long competitionId);
}
