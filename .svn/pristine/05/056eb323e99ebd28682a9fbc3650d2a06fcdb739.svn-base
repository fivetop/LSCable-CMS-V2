package com.i52soft.lscable.cms.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.i52soft.lscable.cms.domain.CMSSiteVO;
import com.i52soft.lscable.cms.domain.DeviceParam;
import com.i52soft.lscable.cms.domain.EndUserVO;
import com.i52soft.lscable.cms.domain.EntityVO;
import com.i52soft.lscable.cms.domain.IPAddressVO;
import com.i52soft.lscable.cms.domain.InterfaceVO;
import com.i52soft.lscable.cms.domain.LinkageConnectionVO;
import com.i52soft.lscable.cms.domain.MainPageLayoutVO;
import com.i52soft.lscable.cms.domain.MainPageWidgetVO;
import com.i52soft.lscable.cms.domain.MapWidgetVO;
import com.i52soft.lscable.cms.domain.NetworkSwitchVO;
import com.i52soft.lscable.cms.domain.NetworkVO;
import com.i52soft.lscable.cms.domain.PPInvalidVO;
import com.i52soft.lscable.cms.domain.ProductVO;
import com.i52soft.lscable.cms.domain.RegionVO;
import com.i52soft.lscable.cms.domain.SampleWidgetVO;
import com.i52soft.lscable.cms.domain.SampleWidgetVO2;
import com.i52soft.lscable.cms.domain.SiteTreePlacementVO;
import com.i52soft.lscable.cms.domain.SiteTreeRackspacePositionVO;
import com.i52soft.lscable.cms.domain.SiteTreeVO;
import com.i52soft.lscable.cms.domain.SystemUserVO;

public interface HTBackendService {
	public List<SampleWidgetVO> getAvailableWidgetForBuildingLayout();

	public List<String> getAvailableLayoutForBuildingLayout();

	public List<HashMap> getAvailableLayoutForBuildingLayout2();

	public List<HashMap> getAvailableWidgetForLayoutSize(String layoutsize);
	
	public List<HashMap> getWidgetTypeForMainPage();
	
	public void insertWidgetForBuildingLayout(SampleWidgetVO2 vo);
	
	public int deleteWidgetForBuildingLayout(int id);

	public int updateMainPageWidget(MainPageWidgetVO vo);
	
	public void insertMainPageWidget(MainPageWidgetVO vo);

	public int deleteMainPageWidget(int id);

	public List<HashMap> getAlarmStatusOfMapWidget(Map<String, Integer> map);

	public List<HashMap> getAlarmStatusOfMapWidget();

	public List<HashMap> getMainPageWidgetModelData(int id);

	public void deleteAllDeviceFromMapWidget(int id);

	public void insertDeviceIntoMapWidget(Map<String, Object> map);

	public void deleteAllSubMapWidgetFromMapWidget(int id);

	public void insertSubMapWidgetIntoMapWidget(Map<String, Object> map);

	public Integer getDeviceId(String deviceName);

	public void insertDeviceInfo(DeviceParam device);

	public List<HashMap> getProductMapIcon();

	public List<HashMap> getImagesForProduct(int id);

	public int updateMapWidget(MapWidgetVO vo);

	public void deleteMapWidgetFromMapWidget(int widgetId);

	public void insertMapWidgetIntoMapWidget(Map<String, Object> map);

	public List<HashMap> searchMapWidget();

	public String getProductTree();

	public void saveProductTree(String content);

	public void deleteProductTree();

	public List<HashMap> getProductType();

	public int createMainPageLayout(MainPageLayoutVO vo);

	public void deleteAllWidgetFromMainPage(int id);

	public int deleteMainPageLayout(int id);

	public int updateMainPageLayout(MainPageLayoutVO vo);

	public void insertWidgetIntoMainPage(Map<String, Object> map);

	public List<HashMap> getProductInfo(int type);

	public List<HashMap> getManufacturer();

	public void registerProduct(ProductVO vo);

	public int updateProduct(ProductVO vo);

	public int deleteProduct(int productid);

	public List<HashMap> getEndUser();

	public List<HashMap> getSystemUser();

	public int registerEndUser(EndUserVO vo);

	public int updateEndUser(EndUserVO vo);

	public int deleteEndUser(int enduserid);

	public int registerSystemUser(SystemUserVO vo);

	public int updateSystemUser(SystemUserVO vo);

	public int deleteSystemUser(int systemuserid);

	public List<HashMap> getSystemGroup();

	public int registerSystemUserGroup(SystemUserVO vo);

	public void deleteSystemUserGroup(int systemuser_id);

	public String getSystemUserNameById(int systemuserid);

	public List<HashMap> getSiteTreeModelData(int siteid);

	public List<HashMap> getAvailableNodeTypeAsChild(Map<String, Integer> map);

	public List<HashMap> getProductByType(int type);

	public List<HashMap> checkDuplicateName(Map<String, Object> map);

	public int createCMSSite(CMSSiteVO vo);

	public List<HashMap> getSiteDetail(int siteid);

	public void saveSiteDetail(CMSSiteVO vo);

	public List<HashMap> getSubRegion(Map<String, Integer> map);

	public void deleteAllFromMapWidgetTree(int id);

	public List<HashMap> checkDuplicateSystemUserId(String id);

	public List<SampleWidgetVO> getSampleWidgetPreviewImage(int samplewidgetid);

	public List<HashMap> getAvailableNodeTypeAllInOne();

	public void addRegion(RegionVO vo);

	public void updateRegion(RegionVO vo);

	public int deleteRegionChildren(int id);

	public int deleteRegionSelf(int id);

	public List<HashMap> getAllRegion();

	public List<HashMap> getCMSSite(Map<String, String> map);

	public int removeSite(int id);

	public int saveSiteTreeModelData(Map<String, Object> map);

	public void updateEntityParam(EntityVO entityParam);

	public void updateSiteTreeParam(SiteTreeVO siteTreeParam);

	public void insertEntityParam(EntityVO entityParam);

	public void insertSiteTreeParam(SiteTreeVO siteTreeParam);

	public List<HashMap> getSiteTreeNodeDetail(int id);

	public int removeNode(int id);

	public void insertSiteTreePlacement(SiteTreePlacementVO placement);

	public void insertChildrenEntityIntoPlacement(Map<String, Integer> map);

	public void insertRackspacePosition(SiteTreeRackspacePositionVO rackPosition);

	public int checkTypeMatch(Map<String, Object> map);

	public void deleteRackspacePositionByNodeID(int id);

	public void deleteChildrenEntityFromPlacement(int id);

	public void deleteSiteTreePlacement(int id);

	public List<HashMap> getCMSSiteBySiteID(int id);

	public void changeSiteTreeParentNode(SiteTreeVO vo);

	public void registerProduct2(ProductVO vo);

	public List<HashMap> getProductInfoByTypeName(String type);

	public List<HashMap> getLinkageConnectionModelData(int nodeid);

	public List<HashMap> getLinkageConnectionDetail(int nodeid);

	public void insertLinkageConnection(LinkageConnectionVO vo);

	public void insertPPIntoLinkageConnection(Map<String, Object> map);

	public void insertInterface(InterfaceVO ivoa);

	public void insertLinkageConnectionDetail(Map<String, Integer> map);

	public void updateLinkageConnection(LinkageConnectionVO vo);

	public void deletePPFromLinkageConnection(int linkageconnectionid);

	public void deleteInterface(int linkageconnectionid);

	public void deleteLinkageConnectionDetail(int linkageconnectionid);

	public void removeLinkageConnection(int id);

	public List<HashMap> getCableIcon();

	public List<HashMap> checkDandDAvailability(Map<String, Object> map);

	public Integer getTotalPortByCategory(int category);

	public void deleteInterfaceByNodeID(int id);

	public void deleteEntityByNodeID(int id);

	public int getInterfaceID(Map<String, Object> mapi);

	public Integer getEntityIDFromSiteTreeByNodeID(int id);

	public void deleteInterfaceByEntityID(Integer entityid);

	public void deleteEntityByEntityID(Integer entityid);

	public List<HashMap> getNetwork();

	public List<HashMap> getL3Gateway(String keyword);

	public List<HashMap> getL2Switch(String keyword);

	public void registerNetwork(NetworkVO vo);

	public void insertNetworkSwitch(NetworkSwitchVO _switch);

	public void deleteNetworkSwitch(int id);

	public void updateNetwork(NetworkVO vo);

	public int deleteNetwork(int networkid);

	public HashMap<String, Object> getNMSInterfaceInfo(Map<String, String> map2);

	public List<HashMap> getNetworkL2Switch(Integer networkid);

	public List<HashMap> getNetworkL3Switch(Integer networkid);

	public void deleteEntityFromRackspacePosition(Integer entityid);

	public void deleteEntityFromPlacement(Integer entityid);

	public List<HashMap> getIPAddress();

	public void registerIPAddress(Map<String, Object> map);

	public void updateIPAddress(Map<String, Object> map);

	public int deleteIPAddress(int ipid);

	public List<HashMap> checkDuplicateIPAddress(String ipaddress);

	public List<HashMap> getConnectionDiagramTopDown(Map<String, Object> map);

	public List<HashMap> getConnectionDiagramBottomUp(Map<String, Object> map);

	public List<HashMap> getOutletUsageHistory(Map<String, Object> map);

	public List<HashMap> getNetworkNodePortStatus(int nodeid);

	public List<HashMap> getAlarmStatus(int nodeid);

	public List<HashMap> searchIPTerminal(Map<String, String> map);

	public List<HashMap> getUsageHistory(String mac_address);

	public List<HashMap> getConnectionDiagramTopDownIPAM(String mac_address);

	public List<HashMap> getConnectionDiagramBottomUpIPAM(String mac_address);

	public List<HashMap> searchCMSEntity(Map<String, Object> map);

	public List<HashMap> getAuthList(Integer siteid);

	public List<HashMap> getAvailableSystemUser(Integer siteid);

	public int addAuthorizedSystemUser(Map<String, Object> map);

	public int removeAuthorizedSystemUser(Map<String, Object> map);

	public List<HashMap> getAuthList2(Integer mainpageid);

	public List<HashMap> getAvailableSystemUser2(Integer mainpageid);

	public int addAuthorizedSystemUser2(Map<String, Object> map);

	public int removeAuthorizedSystemUser2(Map<String, Object> map);

	public int getInterfaceIDByNodeID(Map<String, Object> mapi);

	public List<HashMap> getMainPageLayout(Map<String, String> map);

	public List<HashMap> getAvailableLayoutTheme();

	public List<HashMap> getMainPageLayoutByPageID(int id);

	public int setToDefaultMainPageLayout(Map<String, Object> map);

	public void setToDefaultMainPageLayoutReset(Map<String, Object> map);

	public int setToDefaultMainPageLayoutAdmin(Map<String, Object> map);

	public int addDefaultMainPageLayoutAdmin(Map<String, Object> map);

	public void deleteAllDefaultTable(int id);

	public void deleteAllDefaultAdminTable(int id);

	public List<HashMap> getChildrensAlarmStatus(int nodeid);

	public List<HashMap> getChildrensDirectStatus(int nodeid);

	public int getCategoryID(String string);

	public int getTypeID(String string);

	public int updateCMSSiteRoot(CMSSiteVO vo);

	public List<HashMap> getConnectionDiagramEndUser(Map<String, Object> map);

	public List<HashMap> getMainPageLayoutDetail(int id);

	public int saveMainPageLayoutDetail(Map<String, Object> map);

	public void insertMainPageWidgetLayout(Map<String, Object> map);

	public int resetMainPageWidget(Map<String, Object> map);

	public HashMap<String, Object> getCMSInfoForDevice(String devicename);

	public List<HashMap> getCompatibleWidgetForLayout(Map<String, Object> map);

	public void updateMainPageWidgetLayout(Map<String, Object> map);

	public List<HashMap> getMainPageWidgetData(Map<String, Object> map);

	public void addManufacturer(RegionVO vo);

	public void updateManufacturer(RegionVO vo);

	public int deleteManufacturer(int id);

	public HashMap getMainPageLayoutModelData(int id);

	public int deleteAllEndUser();

	public void registerBulkEndUser(Map<String, Object> map);

	public Integer getUHeightBuyEntityID(Integer integer);

	public void deleteWidgetFromMainPage(Map<String, Object> map);

	public void updateMainPageLayoutToNull(int id);

	public List<HashMap> getAvailableDataProvider(int widgettype_id);

	public List<HashMap> getAllWidgetTypeForSize(String layoutsize);

	public String getLinkageImageForType(int type_id);

	public Integer getDefaultMainPageID(Map<String, String> map);

	public Integer getDefaultMainPageIDAdmin(Map<String, String> map);

	public int isRegionAvailableForDeletion(int id);

	public List<Integer> getLinkageConnectionIDByNodeID(int nodeid);

	public List<HashMap> getLinkageConnectionModelData2(Integer connectionid);

	public List<HashMap> getLinkageConnectionModelDataInvalid(Map<String, Integer> map);

	public void deleteLinkageConnectionInvalid(int linkageconnectionid);

	public void insertLinkageConnectionInvalid(PPInvalidVO invalid);

	public void insertLinkageConnectionInvalidCable(PPInvalidVO invalid);

	public void insertLinkageConnectionInvalidDevice(PPInvalidVO invalid);

	public void updateMainPageLayout2(MainPageLayoutVO vo);

	public List<HashMap> getCIList();

	public Integer getMainpageWidgetTypeIDByName(String typename);

	public List<HashMap> getConnectionDiagramUnauthorized(Map<String, Object> map);

	public Boolean isBasisPatchPanel(Map<String, Integer> map);

	public List<String> getOutletPortName(int nodeid);

	public List<HashMap> getOutletPortStatus(Map<String, Object> map);

	public HashMap getEntityInfoByNodeID(int id);

	public void deleteChildrenEntityByNodeID(Integer entityid);

	public List<Integer> getRackspacesAsChildren(Integer nodeid);

	public HashMap getEntityInfoByEntityID(Integer rackspace);

	public void updateInterface(InterfaceVO ivo);

	public void deleteLinkageConnectionSwitchTopoDetail(int id);

	public void insertLinkageConnectionSwitchTopoDetail(Map<String, Integer> map);

	public List<HashMap> getConnectionDiagramSwitchTopo(Map<String, Object> map);

	public HashMap getMainPageLayoutModelDataWOJson(Integer defaultid);

	public List<HashMap> getMainPageLayoutDetail4MainPage(Integer defaultid);

	public void deleteSystemUserMainpage(int systemuserid);

	public void deleteSystemUserAdminMainpage(int systemuserid);

	public List<HashMap> getDeviceInterfaces(String deviceename);

	public List<HashMap> getEdgeStatus(Map<String, Object> map);

	public List<HashMap> getMapWidgets();

	public List<HashMap> retrievePatchPortUsageRate(Map<String, Integer> map);

	//public List<HashMap> getCMSList(Map<String, Object> map);

	public List<HashMap> getCMSSiteList(Map<String, String> map);

	public List<HashMap> getCMSBuildingList(int id);

	public List<HashMap> getRealtimeAlarmList(HashMap<String, Object> requestParams);

	public List<HashMap> getCurrentEndUsersTraffic(Map<String, Object> map);

	public List<HashMap> retrieveSwitchPortUsageRate(Map<String, Integer> map);

	public List<HashMap> retrievePortUsageRate(Map<String, Object> map);

	public List<HashMap> getCMSFloorList(Map<String, Integer> map);

	public List<HashMap> getCMSFSubList(Map<String, Integer> map);

	public List<HashMap> searchCMSEntitySummary(Map<String, Object> map);

	public List<HashMap> getEndUsersStats(Map<String, Object> map);

	public List<HashMap> getEndUsersStatsMonthly(Map<String, Object> map);

	public int insertEndUserMac(Map<String, Object> map1);

	public int deleteEndUserMac(int id);

	public int deleteAllEndUserMac();

	public List<HashMap> getTempUserInfo(Map<String, Object> map);

	public int deleteTempUser(String mac);

	public String getSwitchMac(Map<String, Object> map);

	public List<HashMap> getRackListForDCIM(Map<String, Integer> map);

	public List<HashMap> getAvailableDevicesInRack(Map<String, Object> map);

	public List<HashMap> get3DRackDetail(int parseInt);

	public List<HashMap> getAllRacksInDCIM(int parseInt);

	public int insert3DTexture(ProductVO vo);

	public int delete3DTexture(int i);

	public List<HashMap> getAreaDCIMWidget(Map<String, Object> map);

	public Integer getDCIMWidgetTypeId();

	public List<HashMap> getPatchPanelPortStatus(Map<String, Object> map);

	public Integer getSiteIdbyNodeId(int nodeid);

	public List<HashMap> getRackType();

	public String getUnAuthInfoBySWMac(Map<String, Object> map);

	public Integer getTotalPortByEntity(int entityid);

	public List<HashMap> getTempUserInfo2(Map<String, Object> map);


}
