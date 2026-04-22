package com.i52soft.lscable.cms.common;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Collection;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;

import com.i52soft.lscable.cms.service.impl.LogInServiceImpl;

@Component
public class CmsAuthenticationProvider implements AuthenticationProvider {
	
    @Autowired
    private LogInServiceImpl logInService;
     
	@Autowired
	private Environment env;
     
    @SuppressWarnings("unchecked")
	@Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException
    {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();

        UserDetails user = null;
        Collection<GrantedAuthority> authorities = null;
  
        try {
            user = (UserDetails)logInService.loadUserByUsername(username);

            //http://192.168.0.79/mobileNativeLogin?userName=admin&password=admin
            String NMS_URL = env.getProperty("system.nms.ip4");
            if(NMS_URL == null || NMS_URL.isEmpty()){
            	NMS_URL = "http://192.168.0.79/";
            }
            CloseableHttpClient httpClient = HttpClients.createDefault();
    		HttpGet httpGet = new HttpGet(NMS_URL+"mobileNativeLogin?userName="+username+"&password=" +password);
    		httpGet.addHeader("User-Agent", "Mozilla/5.0");
    		CloseableHttpResponse httpResponse = httpClient.execute(httpGet);

    		BufferedReader reader = new BufferedReader(new InputStreamReader(
    				httpResponse.getEntity().getContent()));

    		String inputLine;
    		StringBuffer response = new StringBuffer();

    		while ((inputLine = reader.readLine()) != null) {
    			response.append(inputLine);
    		}
    		reader.close();

    		httpClient.close();
        
    		JSONObject json = new JSONObject(response.toString());
    		
    		String status = (String)json.getJSONObject("IphoneAuth").getJSONObject("Details").get("status");
            
    		if (!status.equals("Success")) {
            	throw new BadCredentialsException("LogIn Error");
            }       

    		String apiKey = (String)json.getJSONObject("IphoneAuth").getJSONObject("Details").get("apiKey");
    		ServletRequestAttributes attr = (ServletRequestAttributes) 
    			    RequestContextHolder.currentRequestAttributes();
    			HttpSession session= attr.getRequest().getSession(true);
    			session.setAttribute("apiKey", apiKey);
    			session.setAttribute("systemUserName", username);
    			session.setAttribute("systemUserRole", user.getAuthorities().iterator().next().getAuthority());

            authorities = (Collection<GrantedAuthority>) user.getAuthorities();
        } catch(UsernameNotFoundException e) {
            e.printStackTrace();
            throw new UsernameNotFoundException(e.getMessage());
        } catch(BadCredentialsException e) {
            e.printStackTrace();
            throw new BadCredentialsException(e.getMessage());
        } catch(Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
  
        return new UsernamePasswordAuthenticationToken(username, password, authorities);
    }

    @Override
    public boolean supports(Class<?> auth) {
        return auth.equals(UsernamePasswordAuthenticationToken.class);
    }
}