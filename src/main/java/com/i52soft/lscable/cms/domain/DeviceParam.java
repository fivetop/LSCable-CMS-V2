package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
@Data
@JsonAutoDetect
public class DeviceParam {
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDeviceName() {
		return deviceName;
	}
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
	}
	public String getOpmCategory() {
		return opmCategory;
	}
	public void setOpmCategory(String opmCategory) {
		this.opmCategory = opmCategory;
	}

	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	@JsonProperty
	private int id; 
	@JsonProperty
	private String deviceName; 
	@JsonProperty
	private String opmCategory; 
	@JsonProperty
	private int productId;
	@JsonProperty
	private int category_id;
	@JsonProperty
	private String displayName;
}
