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
package com.i52soft.lscable.cms;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.List;

import javax.xml.bind.DatatypeConverter;

import org.bouncycastle.crypto.digests.SHA512Digest;
import org.bouncycastle.crypto.params.AsymmetricKeyParameter;
import org.bouncycastle.crypto.signers.RSADigestSigner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationHome;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.ExitCodeEvent;
import org.springframework.boot.ExitCodeGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.util.ResourceUtils;

import com.i52soft.lscable.cms.common.KeyUtil;

@SpringBootApplication
public class App {

	@Bean
	ApplicationRunner appRunner() {
		return new MyAppRunner();
	}

	@Bean
	MyBean myBean() {
		return new MyBean();
	}

	private static class MyAppRunner implements ApplicationRunner {

		private final Logger log = LoggerFactory.getLogger(MyAppRunner.class);

		@Autowired
		private Environment env;

		private boolean checkMAC() {
			//File file = new File(getClass().getClassLoader().getResource("LicensedMac").getFile());
			String serverMac = null;
        	StringBuffer buffer = new StringBuffer();

	        	InputStream is = null;
				try {
					is = ResourceUtils.getURL("classpath:LicensedMac").openStream();
		            BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		            String line = null;
		            if (is != null) {                            
		                while ((line = reader.readLine()) != null) {    
		                	buffer.append(line );
		                }                
		            }
			        serverMac = buffer.toString();
			        log.info("serverMac MAC address : " + serverMac);
				} catch (FileNotFoundException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}

			//String serverMac = env.getProperty("system.server.mac");
			if (serverMac == null || serverMac.isEmpty()) {
				return false;
			}
			boolean exists = false;
			try {

				Enumeration<NetworkInterface> networks = NetworkInterface.getNetworkInterfaces();
				while (networks.hasMoreElements()) {
					NetworkInterface network = networks.nextElement();
					byte[] mac = network.getHardwareAddress();

					if (mac != null) {

						StringBuilder sb = new StringBuilder();
						for (int i = 0; i < mac.length; i++) {
							sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));
						}
						log.info("Current MAC address : " + sb.toString());
						if (sb.toString().equalsIgnoreCase(serverMac)) {
							exists = true;
							break;
						}
					}
				}
			} catch (SocketException e) {
				e.printStackTrace();
			}
			return exists;
		}

		private byte[] readBytesFromFile2(File file){

			FileInputStream fileInputStream = null;
			byte[] bytesArray = null;

			try {

				bytesArray = new byte[(int) file.length()];

				fileInputStream = new FileInputStream(file);
				fileInputStream.read(bytesArray);

			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (fileInputStream != null) {
					try {
						fileInputStream.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}

			}

			return bytesArray;
		}
		private byte[] readBytesFromFile(String filePath) {
	
			File file = new File(filePath);
			return readBytesFromFile2(file);

		}

		private boolean verify(String pubKeyFilename, String messageFile, String signatureFile) {
			InputStream pubKeyInpStream = null;
			try {
				pubKeyInpStream = new FileInputStream(new File(pubKeyFilename));
			} catch (FileNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			AsymmetricKeyParameter publKey = KeyUtil.loadPublicKey(pubKeyInpStream);

			byte[] messageBytes = readBytesFromFile(messageFile);
			RSADigestSigner signer = new RSADigestSigner(new SHA512Digest());
			signer.init(false, publKey);
			signer.update(messageBytes, 0, messageBytes.length);

			//BASE64Decoder b64 = new BASE64Decoder();

			// GIVEN: byte[] signature - see code sample above
			try {
				String signature = readFileAsString(signatureFile);
				//boolean isValidSignature = signer.verifySignature(b64.decodeBuffer(signature));
				boolean isValidSignature = signer.verifySignature(DatatypeConverter.parseBase64Binary(signature));
				return isValidSignature;
				// System.out.println("isValidSignature : " + isValidSignature);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			return false;
		}

		private String readFileAsString(String filePath) throws java.io.IOException {
			StringBuffer fileData = new StringBuffer(1000);
			BufferedReader reader = new BufferedReader(new FileReader(filePath));
			char[] buf = new char[1024];
			int numRead = 0;
			while ((numRead = reader.read(buf)) != -1) {
				String readData = String.valueOf(buf, 0, numRead);
				fileData.append(readData);
				buf = new char[1024];
			}
			reader.close();
			log.info(fileData.toString());
			return fileData.toString();
		}

		@Override
		public void run(ApplicationArguments args) throws Exception {

			List<String> larg = (args.getNonOptionArgs());
			int index;

			for (index = 0; index < larg.size(); ++index) {
				log.info("args[" + index + "]: " + larg.get(index));
			}
			/*
			{
				if (!checkMAC())
					throw new MyExitCodeException("Unauthorized MAC Exception");				

				ApplicationHome home = new ApplicationHome(App.class);				
				//System.out.println("progFileName: "+home.getSource().getName());
				if (!verify("./publickey.pem", "./"+home.getSource().getName(), "./LSCableCMS-1.0-SNAPSHOT.jar.sig"))
					throw new MyExitCodeException("Program Integrity Exception");			
			}
			*/

		}
	}

	private static class MyExitCodeException extends RuntimeException implements ExitCodeGenerator {

		public MyExitCodeException(String message) {
			super(message);
		}

		@Override
		public int getExitCode() {
			return 5;
		}
	}

	private static class MyBean {
		@EventListener
		public void exitEvent(ExitCodeEvent event) {
			System.out.println("-- ExitCodeEvent --");
			System.out.println("exit code: " + event.getExitCode());
		}
	}

	public static void main(String[] args) {

		SpringApplication.run(App.class, args);

	}
	
}
