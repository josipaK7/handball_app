package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.RefereeDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RefereeService {
    List<RefereeDto> getAllReferees();
    RefereeDto getReferee(Long refereeId);

}
