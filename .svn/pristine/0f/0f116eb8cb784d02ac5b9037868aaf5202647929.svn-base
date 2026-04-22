package com.i52soft.lscable.cms.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WidgetDataProviderDao {

	public HashMap<String, Integer> getRackUsage();

	public HashMap<String, Integer> getIPUsage();

	public HashMap<String, Integer> getPatchPanelUsage();

	public HashMap<String, Integer> getPortUsage();

	public List<HashMap> getRecentAlarmStat();

	public List<HashMap> getEventSummaryList();

	public List<HashMap> getDevicesAvailability(Map<String, Object> map);

	public List<HashMap> getMinMaxAvgCPUTopN(Map<String, Object> map);

	public List<HashMap> getMinMaxAvgMemoryTopN(Map<String, Object> map);

	public List<HashMap> getInterfaceTrafficInPeriod(Map<String, Object> map);

	public List<HashMap> getRecentAlarmList();

	public String getTableNameFromMetaTable(Map<String, Object> map);

	public List<HashMap> getRecentEventList(Map<String, Object> map);

	public List<HashMap> getTopNPacketLoss(Map<String, Object> map);

	public List<HashMap> searchUnauthorizedIPTerminal();

}
