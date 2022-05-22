package hr.fer.zr.handballapp.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurity extends WebSecurityConfigurerAdapter {

    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public WebSecurity(UserDetailsServiceImpl userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/competitions").permitAll()
                .antMatchers("/competitions/all").permitAll()
                .antMatchers("/competitions/**").permitAll()
                .antMatchers("/matches/competition/**").permitAll()
                .antMatchers("/images/**").permitAll()
                .antMatchers("/coaches/**").permitAll()
                .antMatchers("/clubs/all").permitAll()
                .antMatchers("/clubs/**").permitAll()
                .antMatchers("/clubs/competition/**").permitAll()
                .antMatchers("/clubs/create").permitAll()
                .antMatchers("/players/all").permitAll()
                .antMatchers("/players/**").permitAll()
                .antMatchers("/clubTableData/**").permitAll()
                .antMatchers("/positions/all").permitAll()
                .antMatchers("/users/current").permitAll()
                .antMatchers("/coaches/allFreeCoaches").permitAll()
                .antMatchers("/players/allFreePlayers").permitAll()
                .antMatchers("/referees/all").permitAll()
                .antMatchers("/referees/**").permitAll()
                .antMatchers("/players/club/**").permitAll()
                .antMatchers("/matches/referee/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/matches/delete/scheduled/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/matches/delete/played/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthTokenFilter(authenticationManager()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.headers().frameOptions().sameOrigin();
    }

}
