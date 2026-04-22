package com.i52soft.lscable.cms.service.impl;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.i52soft.lscable.cms.dao.LogInDao;
import com.i52soft.lscable.cms.domain.UserVO;

@Service
public class LogInServiceImpl implements UserDetailsService  {

	@Autowired
	private LogInDao logInDao;
	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		UserVO activeUserInfo = logInDao.getActiveUser(userName);
		if(activeUserInfo == null) throw new UsernameNotFoundException("No User Info"); 
		GrantedAuthority authority = new SimpleGrantedAuthority(activeUserInfo.getRole());
		
		UserDetails userDetails = (UserDetails)new User(activeUserInfo.getUserName(),
				activeUserInfo.getPassword(), Arrays.asList(authority));
	
		return userDetails;
	}
}
