package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.RefereeDto;
import hr.fer.zr.handballapp.mapper.RefereeMapper;
import hr.fer.zr.handballapp.model.Referee;
import hr.fer.zr.handballapp.repository.RefereeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RefereeServiceImpl implements RefereeService {
    private final RefereeRepository refereeRepository;
    private final RefereeMapper refereeMapper;

    public RefereeServiceImpl(RefereeRepository refereeRepository, RefereeMapper refereeMapper) {
        this.refereeRepository = refereeRepository;
        this.refereeMapper = refereeMapper;
    }

    @Override
    public List<RefereeDto> getAllReferees() {
        List<Referee> referees = this.refereeRepository.findAll();
        return this.refereeMapper.mapToList(referees);
    }

    @Override
    public RefereeDto getReferee(Long refereeId) {
        Referee referee = this.refereeRepository.findByRefereeId(refereeId);
        return this.refereeMapper.map(referee);
    }
}
