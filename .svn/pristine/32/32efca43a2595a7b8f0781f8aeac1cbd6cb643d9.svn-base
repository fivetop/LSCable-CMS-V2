package com.i52soft.lscable.cms.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.i52soft.lscable.cms.dao.WidgetDataProviderDao;
import com.i52soft.lscable.cms.service.WidgetDataProviderService;

@Service
public class WidgetDataProviderServiceImpl implements WidgetDataProviderService{
	@Autowired
	private WidgetDataProviderDao widgetDataProviderDao;

    @Override
    public HashMap<String, Integer> getRackUsage(){
    	return widgetDataProviderDao.getRackUsage();
	}
    @Override
    public HashMap<String, Integer> getIPUsage(){
		return widgetDataProviderDao.getIPUsage();
	}
    @Override
	public HashMap<String, Integer> getPatchPanelUsage(){
    	return widgetDataProviderDao.getPatchPanelUsage();
    }
    @Override
	public HashMap<String, Integer> getPortUsage(){
    	return widgetDataProviderDao.getPortUsage();
    }
    @Override
	public List<HashMap> getRecentAlarmStat(){
    	return widgetDataProviderDao.getRecentAlarmStat();
	}
    @Override
    public List<HashMap> getEventSummaryList(){
    	return widgetDataProviderDao.getEventSummaryList();
    }
    @Override
    public List<HashMap> getDevicesAvailability(Map<String, Object> map){
    	return widgetDataProviderDao.getDevicesAvailability(map);
    }
    @Override
    public List<HashMap> getMinMaxAvgCPUTopN(Map<String, Object> map){
    	return widgetDataProviderDao.getMinMaxAvgCPUTopN(map);
    } 
    @Override
    public List<HashMap> getMinMaxAvgMemoryTopN(Map<String, Object> map){
    	return widgetDataProviderDao.getMinMaxAvgMemoryTopN(map);
    }
    @Override
    public List<HashMap> getInterfaceTrafficInPeriod(Map<String, Object> map){
    	return widgetDataProviderDao.getInterfaceTrafficInPeriod(map);
    }
    @Override
    public List<HashMap> getRecentAlarmList(){
    	return widgetDataProviderDao.getRecentAlarmList();
    }
    @Override
	public String getTableNameFromMetaTable(Map<String, Object> map){
       	return widgetDataProviderDao.getTableNameFromMetaTable(map);
	}
    @Override
    public List<HashMap> getRecentEventList(Map<String, Object> map){
    	return widgetDataProviderDao.getRecentEventList(map);
    }
    @Override
    public List<HashMap> getTopNPacketLoss(Map<String, Object> map){
    	return widgetDataProviderDao.getTopNPacketLoss(map);
    }
    @Override
    public List<HashMap> searchUnauthorizedIPTerminal(){
    	return widgetDataProviderDao.searchUnauthorizedIPTerminal();
    }
}
