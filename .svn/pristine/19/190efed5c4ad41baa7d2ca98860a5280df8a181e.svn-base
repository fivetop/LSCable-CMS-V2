package com.i52soft.lscable.cms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface WidgetDataProviderService {

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

	public String getTableNameFromMetaTable(Map<String, Object> map2);

	public List<HashMap> getRecentEventList(Map<String, Object> map);

	public List<HashMap> getTopNPacketLoss(Map<String, Object> map);

	public List<HashMap> searchUnauthorizedIPTerminal();
}
