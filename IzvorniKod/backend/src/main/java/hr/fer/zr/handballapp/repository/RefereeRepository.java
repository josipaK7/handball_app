package hr.fer.zr.handballapp.repository;

import hr.fer.zr.handballapp.model.Referee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefereeRepository extends JpaRepository<Referee, Long> {
    List<Referee> findAll();
    List<Referee> findAllByRefereeIdIn(List<Long> ids);
    Referee findByRefereeId(Long refereeId);
}
