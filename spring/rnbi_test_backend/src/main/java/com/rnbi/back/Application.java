package com.rnbi.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.rnbi"})
public class Application {

    public static void main(String[] args) {

        System.setProperty("STREAM_KEY", "95yk9fe5a4gb");
        System.setProperty("STREAM_SECRET", "abp7mrpj4hwgs4qdnez7p65nc2ythdgxr3dsy25w9db5s9hb4m65j5pkmpjcrb32");

        SpringApplication.run(Application.class, args);
    }

}
