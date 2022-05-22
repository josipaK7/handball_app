package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Coach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoachRepository extends JpaRepository<Coach, Long> {
    Coach findByCoachId(Long coachId);
    List<Coach> findAllByClubIsNull();
}
