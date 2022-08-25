package ssafy.ddokdi.configuration;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ssafy.ddokdi.interceptor.UserAndJwtMatchCheckInterceptor;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
	}

//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(userAndJwtMatchCheckInterceptor())
//				.addPathPatterns("/users/**") // 해당 경로에 접근하기 전에 인터셉터가 가로챈다.
//				.addPathPatterns("/settings/**")
//				.addPathPatterns("/todos/**")
//				.addPathPatterns("/todo/**");
//
//
//	}
//
//	@Bean
//	public UserAndJwtMatchCheckInterceptor userAndJwtMatchCheckInterceptor() {
//		return new UserAndJwtMatchCheckInterceptor();
//	}

}
