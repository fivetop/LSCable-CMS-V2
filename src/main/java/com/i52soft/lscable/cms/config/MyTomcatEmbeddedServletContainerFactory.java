package com.i52soft.lscable.cms.config;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.http11.AbstractHttp11Protocol;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;

public class MyTomcatEmbeddedServletContainerFactory {
	private int maxUploadSizeInMb = 1024 * 1024 * 1024; // 1G
    @Bean
    public TomcatEmbeddedServletContainerFactory containerFactory() {
            return new TomcatEmbeddedServletContainerFactory() {
                    protected void customizeConnector(Connector connector) {
                            super.customizeConnector(connector);
                            if (connector.getProtocolHandler() instanceof AbstractHttp11Protocol) {
                                    ((AbstractHttp11Protocol<?>) connector.getProtocolHandler()).setMaxSwallowSize(maxUploadSizeInMb);
                            }
                    }
            };
 
    }
}
