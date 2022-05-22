package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.ClubDto;
import hr.fer.zr.handballapp.model.Club;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.NoSuchElementException;

@Component
public class ClubMapper implements DefaultMapper<Club, ClubDto> {
    private static final String DEFAULT_PROFILE_IMAGE = "/images/handballSports.jpg";
    private final CoachNameMapper coachMapper;
    private final CompetitionNameMapper competitionMapper;
    private final ClubPlayerMapper clubPlayerMapper;

    public ClubMapper(CoachNameMapper coachMapper, CompetitionNameMapper competitionMapper, ClubPlayerMapper clubPlayerMapper) {
        this.coachMapper = coachMapper;
        this.competitionMapper = competitionMapper;
        this.clubPlayerMapper = clubPlayerMapper;
    }

    @Override
    public ClubDto map(Club club) {
        if (club == null) {
            return null;
        }
        ClubDto clubDto = new ClubDto();
        clubDto.setClubId(club.getClubId());
        clubDto.setName(club.getName());
        clubDto.setDescription(club.getDescription());
        clubDto.setImage(club.getImage() == null ? getDefaultImage() : club.getImage());
        clubDto.setPlace(club.getPlace());
        clubDto.setEstablishmentDate(club.getEstablishmentDate());
        clubDto.setClubCoaches(coachMapper.mapToList(club.getClubCoaches()));
        //clubDto.setClubCoaches(new ArrayList<>());
        clubDto.setClubCompetitions(competitionMapper.mapToList(club.getClubCompetitions()));
        clubDto.setClubPlayers(clubPlayerMapper.mapToList(club.getClubPlayers()));
        return clubDto;
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
}
