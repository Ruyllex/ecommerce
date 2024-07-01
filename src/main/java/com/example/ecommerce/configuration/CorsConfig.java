package com.example.ecommerce.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/dishes") // La ruta de tu API que necesita permitir CORS
                .allowedOrigins("http://127.0.0.1:5500") // El origen que se permite (la dirección de tu aplicación React)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Los métodos HTTP permitidos
                .allowCredentials(true); // Permite el envío de cookies de autenticación (si es necesario)
    }
}