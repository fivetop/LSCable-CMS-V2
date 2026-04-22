package com.i52soft.lscable.cms.domain;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;
@Data
@JsonAutoDetect
public class MapWidgetVO extends MainPageWidgetVO {
	@JsonProperty
	private int mainpage_id; 
	@JsonProperty
	private int colindex;
	@JsonProperty
	private int rowindex;
	public int getMainpage_id() {
		return mainpage_id;
	}
	public void setMainpage_id(int mainpage_id) {
		this.mainpage_id = mainpage_id;
	}
	public int getColindex() {
		return colindex;
	}
	public void setColindex(int colindex) {
		this.colindex = colindex;
	}
	public int getRowindex() {
		return rowindex;
	}
	public void setRowindex(int rowindex) {
		this.rowindex = rowindex;
	}
	public List<DeviceParam> getDevices() {
		return devices;
	}
	public void setDevices(List<DeviceParam> devices) {
		this.devices = devices;
	}
	public List<MapParam> getSubmaps() {
		return submaps;
	}
	public void setSubmaps(List<MapParam> submaps) {
		this.submaps = submaps;
	}
	@JsonProperty
	private List<DeviceParam> devices;
	@JsonProperty
	private List<MapParam> submaps;
	

}
