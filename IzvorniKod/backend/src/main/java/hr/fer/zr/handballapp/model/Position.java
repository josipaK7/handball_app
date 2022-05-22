package hr.fer.zr.handballapp.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Position {

    @Id
    @Column(name = "position_id")
    private Long positionId;

    private String name;

    @ManyToMany(mappedBy = "playerPositions")
    List<Player> players;

    public Position() {

    }

    public Position(Long positionId, String name) {
        super();
        this.positionId = positionId;
        this.name = name;
    }

    public Long getPositionId() {
        return positionId;
    }

    public void setPositionId(Long positionId) {
        this.positionId = positionId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
