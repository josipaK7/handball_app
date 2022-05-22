package hr.fer.zr.handballapp.security;

public abstract class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final Long EXPIRATION_TIME = 10 * 24 * 60 * 60 * 1000L;
}
