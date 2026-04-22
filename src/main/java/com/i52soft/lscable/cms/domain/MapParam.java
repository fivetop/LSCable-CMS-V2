package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
@Data
@JsonAutoDetect
public class MapParam {

	public int getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(int deviceName) {
		this.deviceName = deviceName;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	} 
	@JsonProperty
	private int deviceName; 
	@JsonProperty
	private String displayName;

}
