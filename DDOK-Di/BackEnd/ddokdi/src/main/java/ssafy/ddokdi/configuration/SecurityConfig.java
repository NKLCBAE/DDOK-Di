package ssafy.ddokdi.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.security.ConditionalOnDefaultWebSecurity;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.web.cors.CorsUtils;
import ssafy.ddokdi.filter.JwtAuthenticationFilter;
import ssafy.ddokdi.util.TokenProvider;

@EnableWebSecurity
@RequiredArgsConstructor
@Configuration(proxyBeanMethods = false)
@ConditionalOnDefaultWebSecurity
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class SecurityConfig {

    private final TokenProvider tokenProvider;

    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                // 세션을 사용하지 않기 때문에 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                // 인증 범위를 설정
                .and()
                .authorizeRequests()
                // Preflight request의 예비요청이 security에 의해 막히는 것을 방지하기 위함
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers("/test/signup").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/delete-ticket").permitAll()

                .antMatchers("/swagger-resources/**").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/signup/emailcheck").permitAll()
                .antMatchers("/cardlogin").permitAll()
                // Get방식은 permitAll
                .antMatchers(HttpMethod.GET,"/users/**").permitAll() // 회원정보가져오기
                // 회원 데스크 세팅 모두 불러오기, 회원 데스크 세팅 하나 불러오기, 사용자 상태 및 자리 조회, 사용자 알림 조회
                .antMatchers(HttpMethod.GET,"/settings/**").permitAll()
                // 구역의 모든 자리 불러오기, 자리의 정보 불러오기
                .antMatchers(HttpMethod.GET,"/seats/**").permitAll()
                // 개별 유저 한 달 일정 요청
                .antMatchers(HttpMethod.GET,"/todos/**").permitAll()
                // 개별 유저의 개별 일정 요청
                .antMatchers(HttpMethod.GET,"/todo/**").permitAll()
                // 모든 zone 이름 불러오기 API
                .antMatchers(HttpMethod.GET,"/zone").permitAll()

                // 관리자 권한 체크
                .antMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                // jwt 필터 적용
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(tokenProvider),
                        UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> cors.disable());


        return http.build();
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }

}

