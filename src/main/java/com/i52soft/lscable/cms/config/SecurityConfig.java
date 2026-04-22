/*******************************************************************************
 * Copyright 2015 Brient Oh @ Pristine Core
 * boh@pristinecore.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package com.i52soft.lscable.cms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import com.i52soft.lscable.cms.common.CmsAuthenticationProvider;
import com.i52soft.lscable.cms.service.impl.LogInServiceImpl;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;
	@Autowired
	private LogInServiceImpl logInService;
	@Autowired
	private CmsAuthenticationProvider cmsAuthProvider;
	
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.csrf().disable();
		httpSecurity.headers().frameOptions().disable();
		httpSecurity.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
		httpSecurity.sessionManagement()
		  .sessionFixation().migrateSession();
		// static resources
		httpSecurity.authorizeRequests()
		.antMatchers("/shutdown", "/floormaps", "/api/**", "/libs/**", "/css/**", "/static/**", "/modules/**", "/js/**", "/images/**", "/img/**", "/resources/**", "/themes/**", "/webjars/**").permitAll();
		
		httpSecurity.authorizeRequests()
						.antMatchers("/login").anonymous()
						.antMatchers("/admin/**").hasAuthority("Administrators")
						.anyRequest().authenticated()					
						.and()
					.formLogin()
						.loginPage("/login")
						.loginProcessingUrl("/login-process")
						.failureUrl("/login?error")
						.usernameParameter("username")
						.passwordParameter("password")
						.defaultSuccessUrl("/mainpage", true)
						.and()
					.logout()
						.deleteCookies("remember-me")
						.logoutSuccessUrl("/login?logout")
						.permitAll()
			            .and()
			            .rememberMe().key("mysecretkey").rememberMeServices(rememberMeServices());
		
		httpSecurity.exceptionHandling().accessDeniedHandler(accessDeniedHandler);
		httpSecurity.sessionManagement().invalidSessionUrl("/login");
		
	}

    @Bean
    public RememberMeServices rememberMeServices() {
    	
        TokenBasedRememberMeServices rememberMeServices = new TokenBasedRememberMeServices("mysecretkey", logInService);

        return rememberMeServices;
        
    }	
    @Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    	  auth.authenticationProvider(cmsAuthProvider);
    }

	
	@Bean
	public PasswordEncoder passwordEncoder() {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder;
	}

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/themes/**", "/modules/**", "/api/**", "/libs/**", "/webjars/**", "/resources/**", "/static/**", "/css/**", "/js/**", "/images/**", "/img/**");
    }	
}
