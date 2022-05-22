package hr.fer.zr.handballapp.service;

import hr.fer.zr.handballapp.dto.ClubTableEntryDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClubTableEntryService {
    List<ClubTableEntryDto> getTableEntries(Long competitionId);

}
