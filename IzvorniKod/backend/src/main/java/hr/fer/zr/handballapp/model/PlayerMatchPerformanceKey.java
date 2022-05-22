package hr.fer.zr.handballapp.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlayerMatchPerformanceKey implements Serializable {
    @Column(name = "match_id")
    private Long matchId;

    @Column(name = "player_id")
    private Long playerId;

    public PlayerMatchPerformanceKey() {

    }

    public PlayerMatchPerformanceKey(Long matchId, Long playerId) {
        super();
        this.matchId = matchId;
        this.playerId = playerId;
    }

    public Long getMatchId() {
        return matchId;
    }

    public void setMatchId(Long matchId) {
        this.matchId = matchId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerMatchPerformanceKey that = (PlayerMatchPerformanceKey) o;
        return Objects.equals(getMatchId(), that.getMatchId()) && Objects.equals(getPlayerId(), that.getPlayerId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMatchId(), getPlayerId());
    }

}
