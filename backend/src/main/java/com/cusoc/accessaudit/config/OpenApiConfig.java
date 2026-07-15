package com.cusoc.accessaudit.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI accessAuditOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("AccessAudit API")
                        .description("Campus Accessibility Auditing Platform – REST API documentation. " +
                                "Supports accessibility audits aligned with WCAG 2.1 AA and RPWD Act 2016.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("CUSOC S-06 Team")
                                .email("accessaudit@cusoc.edu"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Enter your JWT token obtained from /api/auth/login")));
    }
}
