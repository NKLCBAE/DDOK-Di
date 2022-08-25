package ssafy.ddokdi.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;


@Configuration
public class SwaggerConfiguration {
    @Bean
    public Docket api() {
        final var host = "i7a102.p.ssafy.io/api";
//        final var host = "localhost:8399"; // 로컬 테스트용
        return new Docket(DocumentationType.SWAGGER_2)
                .host(host)
                .select()
                .apis(RequestHandlerSelectors.basePackage("ssafy.ddokdi.api"))
                .paths(PathSelectors.ant("/**"))
                .build()
                .apiInfo(ApiInfo());
    }

    private ApiInfo ApiInfo() {
        return new ApiInfoBuilder()
                .title("DDD swagger test")
                .description("DDD API")
                .version("1.0")
                .build();
    }

}
