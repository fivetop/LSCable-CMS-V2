package com.i52soft.lscable.cms.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class CMSSiteVO {

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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getRegion_id() {
		return region_id;
	}
	public void setRegion_id(int region_id) {
		this.region_id = region_id;
	}
	public String getRegion_name() {
		return region_name;
	}
	public void setRegion_name(String region_name) {
		this.region_name = region_name;
	}
	public String getSitetreejson_data() {
		return sitetreejson_data;
	}
	public void setSitetreejson_data(String sitetreejson_data) {
		this.sitetreejson_data = sitetreejson_data;
	}
	public String getImage_site() {
		return image_site;
	}
	public void setImage_site(String image_site) {
		this.image_site = image_site;
	}
	@JsonProperty
	private int id;
	@JsonProperty
	private String name;
	@JsonProperty
	private String description;
	@JsonProperty
	private int region_id;
	@JsonProperty
	private String region_name;	
	@JsonProperty
	private String sitetreejson_data;
	@JsonProperty
	private String image_site;

}
