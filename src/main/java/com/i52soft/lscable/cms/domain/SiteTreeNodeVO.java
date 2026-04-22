package com.i52soft.lscable.cms.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonAutoDetect
public class SiteTreeNodeVO {

	public SiteTreeVO getSiteTreeParam() {
		return siteTreeParam;
	}
	public void setSiteTreeParam(SiteTreeVO siteTreeParam) {
		this.siteTreeParam = siteTreeParam;
	}
	public EntityVO getEntityParam() {
		return entityParam;
	}
	public void setEntityParam(EntityVO entityParam) {
		this.entityParam = entityParam;
	}
	
	public String getJson_data() {
		return json_data;
	}
	public void setJson_data(String json_data) {
		this.json_data = json_data;
	}
	public List<Integer> getChildrenEntity() {
		return childrenEntity;
	}
	public void setChildrenEntity(List<Integer> childrenEntity) {
		this.childrenEntity = childrenEntity;
	}
	public List<SiteTreeRackspacePositionVO> getRackPositionParam() {
		return rackPositionParam;
	}
	public void setRackPositionParam(List<SiteTreeRackspacePositionVO> rackPositionParam) {
		this.rackPositionParam = rackPositionParam;
	}
	@JsonProperty
	private SiteTreeVO siteTreeParam;
	@JsonProperty
	private EntityVO entityParam;
	@JsonProperty
	private String json_data;
	@JsonProperty
	private List<Integer> childrenEntity;	
	@JsonProperty
	private List<SiteTreeRackspacePositionVO> rackPositionParam;	
}
