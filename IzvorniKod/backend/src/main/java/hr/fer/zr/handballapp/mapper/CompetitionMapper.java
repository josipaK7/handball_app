package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.dto.CompetitionDto;
import hr.fer.zr.handballapp.model.Club;
import hr.fer.zr.handballapp.model.Competition;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Component
public class CompetitionMapper implements DefaultMapper<Competition, CompetitionDto> {
    private static final String DEFAULT_PROFILE_IMAGE = "/images/handballSports.jpg";

    @Override
    public CompetitionDto map(Competition competition) {
        CompetitionDto competitionDto = new CompetitionDto();
        competitionDto.setCompetitionId(competition.getCompetitionId());
        competitionDto.setName(competition.getName());
        competitionDto.setDescription(competition.getDescription());
        competitionDto.setDateFrom(competition.getDateFrom());
        competitionDto.setDateTo(competition.getDateTo());
        if (competition.getImage() != null) {
            System.out.println("Image: " + competition.getImage());
        }
        competitionDto.setImage(competition.getImage() == null ? getDefaultImage() : competition.getImage());
        competitionDto.setClubs(mapClubs(competition.getClubs()));
        return competitionDto;
    }


    public byte[] getDefaultImage() {
        try {
            BufferedImage bufferedImage = ImageIO.read(getClass().getResource(DEFAULT_PROFILE_IMAGE));
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "jpg", byteArrayOutputStream);
            byte[] bytesImage = byteArrayOutputStream.toByteArray();
            byteArrayOutputStream.close();
            return bytesImage;
        } catch (IOException exception) {
            throw new NoSuchElementException();
        }
    }

    private List<ClubDto> mapClubs(List<Club> clubs) {
        List<ClubDto> clubDtoList = new ArrayList<>();
        for (Club club : clubs) {
            ClubDto clubDto = new ClubDto();
            clubDto.setClubId(club.getClubId());
            clubDto.setName(club.getName());
            clubDtoList.add(clubDto);
        }
        return clubDtoList;
    }
}
