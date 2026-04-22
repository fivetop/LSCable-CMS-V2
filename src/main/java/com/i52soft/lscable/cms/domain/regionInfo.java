package com.i52soft.lscable.cms.domain;

public class regionInfo {
	private String regionName;
	private String description;
	private String site;	
	private String depth;

	public String getregionName() {
		return regionName;
	}
	public void setregionName(String regionName) {
		this.regionName = regionName;
	}
	public String getdescription() {
		return description;
	}
	public void setdescription(String description) {
		this.description = description;
	}
	public String getsite() {
		return site;
	}
	public void setsite(String site) {
		this.site = site;
	}
	public String getdepth() {
		return depth;
	}
	public void setdepth(String depth) {
		this.depth = depth;
	}
	@Override
	public String toString() {
		return "regions [id=" + regionName + ", site=" + site
				+ ", depth=" + depth  + "]";
	}
}
