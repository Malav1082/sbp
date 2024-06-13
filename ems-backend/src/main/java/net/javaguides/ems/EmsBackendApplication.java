package net.javaguides.ems;

import net.javaguides.ems.config.BasicAuthFilter;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EmsBackendApplication {

	 private final BasicAuthFilter basicAuthFilter;

	 public EmsBackendApplication(BasicAuthFilter basicAuthFilter) {
	   this.basicAuthFilter = basicAuthFilter;
	 }

	public static void main(String[] args) {
		SpringApplication.run(EmsBackendApplication.class, args);
	}
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	 @Bean
	 public FilterRegistrationBean<BasicAuthFilter> getBasicAuthFilter() {
	   FilterRegistrationBean<BasicAuthFilter> registrationBean = new FilterRegistrationBean<>();
	   registrationBean.setFilter(basicAuthFilter);
	   registrationBean.addUrlPatterns("/*"); // Define the URL patterns to filter
	   return registrationBean;
	 }
}