package com.i52soft.lscable.cms.domain;

import java.util.HashMap;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class LinkageConnectionVO {
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<HashMap> getPatchpanels() {
		return patchpanels;
	}
	public void setPatchpanels(List<HashMap> patchpanels) {
		this.patchpanels = patchpanels;
	}
	public String getJson_data() {
		return json_data;
	}
	public void setJson_data(String json_data) {
		this.json_data = json_data;
	}
	public List<ConnectionVO> getLinkedelements() {
		return linkedelements;
	}
	public void setLinkedelements(List<ConnectionVO> linkedelements) {
		this.linkedelements = linkedelements;
	}
	@JsonProperty
	private int id;
	@JsonProperty
	private List<HashMap> patchpanels;
	@JsonProperty
	private String json_data;
	@JsonProperty
	private List<ConnectionVO> linkedelements;
	@JsonProperty
	private List<PPInvalidVO> invalid;
	public List<PPInvalidVO> getInvalid() {
		return invalid;
	}
	public void setInvalid(List<PPInvalidVO> invalid) {
		this.invalid = invalid;
	}
	@JsonProperty
	private List<ConnectionVO> switchtopo;
	public List<ConnectionVO> getSwitchtopo() {
		return switchtopo;
	}
	public void setSwitchtopo(List<ConnectionVO> switchtopo) {
		this.switchtopo = switchtopo;
	}
}
