package com.i52soft.lscable.cms.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class NetworkVO {
	@JsonProperty
	private int id;
	@JsonProperty
	private String name;
	@JsonProperty
	private String network;
	@JsonProperty
	private String subnet;
	@JsonProperty
	private String start_ipaddress;
	@JsonProperty
	private String end_ipaddress;
	@JsonProperty
	private String description;	
	@JsonProperty
	private List<NetworkSwitchVO> switches;
	
	public List<NetworkSwitchVO> getSwitches() {
		return switches;
	}
	public void setSwitches(List<NetworkSwitchVO> switches) {
		this.switches = switches;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNetwork() {
		return network;
	}
	public void setNetwork(String network) {
		this.network = network;
	}
	public String getSubnet() {
		return subnet;
	}
	public void setSubnet(String subnet) {
		this.subnet = subnet;
	}
	public String getStart_ipaddress() {
		return start_ipaddress;
	}
	public void setStart_ipaddress(String start_ipaddress) {
		this.start_ipaddress = start_ipaddress;
	}
	public String getEnd_ipaddress() {
		return end_ipaddress;
	}
	public void setEnd_ipaddress(String end_ipaddress) {
		this.end_ipaddress = end_ipaddress;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
}
