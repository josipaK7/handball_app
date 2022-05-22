package hr.fer.zr.handballapp.mapper;

import hr.fer.zr.handballapp.dto.CompetitionDto;
import hr.fer.zr.handballapp.model.Competition;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.NoSuchElementException;

@Component
public class CompetitionLogoMapper implements DefaultMapper<Competition, CompetitionDto>{
    private static final String DEFAULT_PROFILE_IMAGE = "/images/handballSports.jpg";

    @Override
    public CompetitionDto map(Competition competition) {
        CompetitionDto competitionDto = new CompetitionDto();
        competitionDto.setCompetitionId(competition.getCompetitionId());
        competitionDto.setName(competition.getName());
        competitionDto.setImage(competition.getImage() == null ? getDefaultImage() : competition.getImage());
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
}
