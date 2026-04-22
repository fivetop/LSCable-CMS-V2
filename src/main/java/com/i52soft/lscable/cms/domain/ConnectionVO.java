package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class ConnectionVO {

	public InterfaceVO getInterface_a() {
		return interface_a;
	}
	public void setInterface_a(InterfaceVO interface_a) {
		this.interface_a = interface_a;
	}
	public ConnectorVO getConnector() {
		return connector;
	}
	public void setConnector(ConnectorVO connector) {
		this.connector = connector;
	}
	public InterfaceVO getInterface_b() {
		return interface_b;
	}
	public void setInterface_b(InterfaceVO interface_b) {
		this.interface_b = interface_b;
	}
	@JsonProperty
	private InterfaceVO interface_a;
	@JsonProperty
	private ConnectorVO connector;
	@JsonProperty
	private InterfaceVO interface_b;
}
