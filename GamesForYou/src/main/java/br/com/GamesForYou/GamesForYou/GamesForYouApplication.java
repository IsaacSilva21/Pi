package br.com.GamesForYou.GamesForYou;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class GamesForYouApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamesForYouApplication.class, args);
	}

}
