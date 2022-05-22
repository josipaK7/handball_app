package hr.fer.zr.handballapp.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * JWT authorization filter which checks for auth token and sets security context with it.
 */
public class JWTAuthTokenFilter extends BasicAuthenticationFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(JWTAuthTokenFilter.class);

    public JWTAuthTokenFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    public JWTAuthTokenFilter(AuthenticationManager authenticationManager, AuthenticationEntryPoint authenticationEntryPoint) {
        super(authenticationManager, authenticationEntryPoint);
    }

    private static UsernamePasswordAuthenticationToken getPasswordAuthenticationToken(String token) {
        UsernamePasswordAuthenticationToken passwordAuthenticationToken = null;

        try {
            if (token != null) {
                final String userAndRoleDecoded =
                        JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET.getBytes())).build()
                        .verify(token.replace("Bearer ", "")).getSubject();
                if (userAndRoleDecoded != null) {
                    String[] userAndRole = userAndRoleDecoded.split(" ");
                    String username = userAndRole[0];
                    String commaSeparatedListOfRoles = userAndRole[1];
                    passwordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                            username, null,
                            AuthorityUtils.commaSeparatedStringToAuthorityList(commaSeparatedListOfRoles));
                }
            }
        } catch (Exception ex) {
           LOGGER.info("Error while decrypting auth token" + ex.getMessage());
        }

        return passwordAuthenticationToken;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        final String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            final UsernamePasswordAuthenticationToken authenticationToken = getPasswordAuthenticationToken(header);
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(request, response);
    }
}
