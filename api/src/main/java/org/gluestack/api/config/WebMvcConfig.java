package org.gluestack.api.config;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module.Feature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Created by cchristo on 18/03/2017.
 */
@Configuration
@EnableSpringDataWebSupport
public class WebMvcConfig implements WebMvcConfigurer {

	@Bean
	public Jackson2ObjectMapperBuilder jacksonBuilder() {
		Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
		Hibernate5Module hm = new Hibernate5Module();
		hm.enable(Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS);
		hm.disable(Feature.USE_TRANSIENT_ANNOTATION);
		b.modulesToInstall(hm);
		return b;
	}
}