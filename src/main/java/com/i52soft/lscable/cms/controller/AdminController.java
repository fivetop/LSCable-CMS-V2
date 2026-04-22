/*******************************************************************************
 * Copyright 2015 Brient Oh @ Pristine Core
 * boh@pristinecore.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package com.i52soft.lscable.cms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.i52soft.lscable.cms.service.HTBackendService;

@RequestMapping(value = "/admin")
@Controller
public class AdminController {

	@Autowired
	private HTBackendService service;

	@Autowired
	private Environment env;

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@GetMapping("/setting/adminsysuser")
	public ModelAndView settingadminsysuer() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("setting/adminsysuser");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/setting/modify")
	public ModelAndView settingmodify(@RequestParam("id") int id) {

		ModelAndView mav = new ModelAndView("setting/modify");
		mav.addObject("vlosrcid", "/ht/viewing-layout?mainpageid=" + id);
		mav.addObject("mainpageid", id);
		return mav;
	}

	@GetMapping("/setting/new")
	public ModelAndView settingnew() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("setting/new");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/setting/map-list")
	public ModelAndView settingMapList() {

		List<HashMap> mapwidgets = this.service.getMapWidgets();
		ModelAndView mav = new ModelAndView("setting/map-list");
		mav.addObject("MapWidgetList", mapwidgets);

		return mav;
	}

	@GetMapping("/setting/manage-layout")
	public String settingmanagelayout(@RequestParam HashMap requestParams) {

		Map<String, Object> map = new HashMap<>();
		map.put("mainpage_id", Integer.valueOf((String) requestParams.get("id")));
		int id = Integer.valueOf((String) requestParams.get("id"));
		HashMap mainpage = this.service.getMainPageLayoutModelData(id);

		String theme = (String) mainpage.get("theme_name");

		if (theme.equalsIgnoreCase("Bright")) {
			return "redirect:/admin/setting2/modify?id=" + id;
		} else {
			return "redirect:/admin/setting/modify?id=" + id;
		}
	}

	@GetMapping("/setting/manage-widget")
	public ModelAndView settingmanagewidget(@RequestParam HashMap requestParams) {

		Map<String, Object> map = new HashMap<>();
		map.put("mainpage_id", Integer.valueOf((String) requestParams.get("id")));
		map.put("rowindex", Integer.valueOf((String) requestParams.get("rowindex")));
		map.put("colindex", Integer.valueOf((String) requestParams.get("colindex")));

		int id = Integer.valueOf((String) requestParams.get("id"));
		HashMap mainpage = this.service.getMainPageLayoutModelData(id);

		List<HashMap> widgets = this.service.getMainPageLayoutDetail(id);

		String theme = (String) mainpage.get("theme_name");
		String pathprefix = "";

		if (theme.equalsIgnoreCase("Bright")) {
			pathprefix = "setting2/";
		} else {
			pathprefix = "setting/";
		}

		List<HashMap> widgetData = this.service.getMainPageWidgetData(map);

		ModelAndView mav = null;
		if (!widgetData.isEmpty()) {
			String widgettype = (String) widgetData.get(0).get("widgettype");
			if (widgettype.equalsIgnoreCase("Line Chart")) {
				mav = new ModelAndView(pathprefix + "manage-widget-linechart");
			} else if (widgettype.equalsIgnoreCase("Scatter")) {
				mav = new ModelAndView(pathprefix + "manage-widget-scatter");
			} else if (widgettype.equalsIgnoreCase("Donut Chart")) {
				mav = new ModelAndView(pathprefix + "manage-widget-donutchart");
			} else if (widgettype.equalsIgnoreCase("Alarm Grid Table")) {
				mav = new ModelAndView(pathprefix + "manage-widget-alarm");
			} else if (widgettype.equalsIgnoreCase("MinMaxAvg")) {
				mav = new ModelAndView(pathprefix + "manage-widget-minmaxavg");
			} else if (widgettype.equalsIgnoreCase("Gauge Chart")) {
				mav = new ModelAndView(pathprefix + "manage-widget-gauge");
			} else if (widgettype.equalsIgnoreCase("Availability Grid Table")) {
				mav = new ModelAndView(pathprefix + "manage-widget-availability");
			} else if (widgettype.equalsIgnoreCase("Grid Table")) {
				mav = new ModelAndView(pathprefix + "manage-widget-gridtable");
			} else if (widgettype.equalsIgnoreCase("Pie Chart")) {
				mav = new ModelAndView(pathprefix + "manage-widget-piechart");
			} else if (widgettype.equalsIgnoreCase("OPM Embedded")) {
				mav = new ModelAndView(pathprefix + "manage-widget-opmembedded");
			} else {
				mav = new ModelAndView(pathprefix + "manage-widget-new");
			}
		}
		mav.addObject("widgetData", widgetData);
		return mav;
	}

	@GetMapping("/setting/preview-layout")
	public ModelAndView settingpreviewlayout(@RequestParam HashMap requestParams) {

		int id = Integer.valueOf((String) requestParams.get("id"));
		HashMap mainpage = this.service.getMainPageLayoutModelData(id);

		List<HashMap> widgets = this.service.getMainPageLayoutDetail(id);

		ModelAndView mav = null;
		String theme = (String) mainpage.get("theme_name");

		if (theme.equalsIgnoreCase("Bright")) {
			mav = new ModelAndView("dashboard-preview-frame2");
		} else {
			mav = new ModelAndView("dashboard-preview-frame1");
		}
		mav.addObject("mainpage", mainpage);
		mav.addObject("widgets", widgets);
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("/cms/setting")
	public ModelAndView cmssetting() {

		ModelAndView mav = new ModelAndView("cms/setting");
		return mav;
	}

	@GetMapping("/cms/siteset")
	public ModelAndView cmssiteset(HttpSession session) {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String systemUserName = null;
		String systemUserRole = null;
		if (principal instanceof UserDetails) {
			systemUserName = ((UserDetails) principal).getUsername();
			systemUserRole = ((UserDetails) principal).getAuthorities().iterator().next().getAuthority();
		}
		this.logger.debug("systemUserName=" + systemUserName + " systemUserRole=" + systemUserRole);
		if ((systemUserRole == null) || (systemUserName == null)) {
			systemUserRole = (String) session.getAttribute("systemUserRole");
			systemUserName = (String) session.getAttribute("systemUserName");
		}
		Map<String, String> map = new HashMap<>();
		map.put("systemUserRole", systemUserRole);
		map.put("systemUserName", systemUserName);
		List<HashMap> siteget = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms/siteset");
		mav.addObject("Sitelist", siteget);
		return mav;
	}


	@GetMapping("/cms/adminAuth")
	public ModelAndView cmsadminauth() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms/adminAuth");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms/catalog")
	public String catalog() {

		return "cms/catalog";
	}

	@GetMapping("/cms/regions")
	public ModelAndView cmsregions() {

		List<HashMap> hashmap = this.service.getAllRegion();
		ModelAndView mav = new ModelAndView("cms/regions");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/cms/manufacturer")
	public ModelAndView cmsmanufacturer() {

		List<HashMap> hashmap = this.service.getManufacturer();
		ModelAndView mav = new ModelAndView("cms/manufacturer");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/cms/new")
	public ModelAndView cmsnew() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms/new");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms/linkage")
	public ModelAndView cmslinkage(HttpSession session, @RequestParam("id") int id) {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String systemUserName = null;
		String systemUserRole = null;
		if (principal instanceof UserDetails) {
			systemUserName = ((UserDetails) principal).getUsername();
			systemUserRole = ((UserDetails) principal).getAuthorities().iterator().next().getAuthority();
		}
		this.logger.debug("systemUserName=" + systemUserName + " systemUserRole=" + systemUserRole);
		if ((systemUserRole == null) || (systemUserName == null)) {
			systemUserRole = (String) session.getAttribute("systemUserRole");
			systemUserName = (String) session.getAttribute("systemUserName");
		}
		Map<String, String> map = new HashMap<>();
		map.put("systemUserRole", systemUserRole);
		map.put("systemUserName", systemUserName);
		List<HashMap> siteget = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms/linkage");
		mav.addObject("Sitelist", siteget);
		mav.addObject("bppurl", "/ht/building-patch-panel?siteid=" + id);
		return mav;
	}

	@GetMapping("/cms/modifySite")
	public ModelAndView modifySite() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms/modifySite");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms/view")
	public ModelAndView cmsview(@RequestParam HashMap<String, String> requestParams) {

		String siteid = requestParams.get("siteid");

		ModelAndView mav = new ModelAndView("cms/view");
		mav.addObject("vstsrcid", "/ht/viewing-site-tree?siteid=" + siteid);
		List<HashMap> menulist = new ArrayList<>();
		HashMap<String, String> hm1 = new HashMap<>();
		hm1.put("href", "../cms/setting");
		hm1.put("text", "cmsopt");
		menulist.add(hm1);
		HashMap<String, String> hm2 = new HashMap<>();
		hm2.put("href", "../cms/siteset");
		hm2.put("text", "siteopt");
		menulist.add(hm2);
		mav.addObject("menulist", menulist);
		return mav;
	}

	@GetMapping("/ipam/setting")
	public ModelAndView ipamsetting() {

		ModelAndView mav = new ModelAndView("ipam/setting");
		return mav;
	}

	@GetMapping("/ipam/user")
	public ModelAndView ipamuser() {

		List<HashMap> history = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam/user");
		mav.addObject("Hashmap", history);
		return mav;
	}

	@GetMapping("/ipam/adminNetwork")
	public ModelAndView ipamNetwork() {

		List<HashMap> network = this.service.getNetwork();
		ModelAndView mav = new ModelAndView("ipam/adminNetwork");
		mav.addObject("getList", network);
		return mav;
	}

	@GetMapping("/setting2/adminsysuser")
	public ModelAndView settingadminsysuer2() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("setting2/adminsysuser");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/setting2/modify")
	public ModelAndView settingmodify2(@RequestParam("id") int id) {

		ModelAndView mav = new ModelAndView("setting2/modify");
		mav.addObject("vlosrcid", "/ht/viewing-layout?mainpageid=" + id);
		mav.addObject("mainpageid", id);
		return mav;
	}

	@GetMapping("/setting2/new")
	public ModelAndView settingnew2() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("setting2/new");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/setting2/map-list")
	public ModelAndView setting2MapList() {

		List<HashMap> mapwidgets = this.service.getMapWidgets();
		ModelAndView mav = new ModelAndView("setting2/map-list");
		mav.addObject("MapWidgetList", mapwidgets);

		return mav;
	}

	@GetMapping("/cms2/setting")
	public ModelAndView cmssetting2() {

		ModelAndView mav = new ModelAndView("cms2/setting");
		return mav;
	}

	@GetMapping("/cms2/siteset")
	public ModelAndView cmssiteset2(HttpSession session) {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String systemUserName = null;
		String systemUserRole = null;
		if (principal instanceof UserDetails) {
			systemUserName = ((UserDetails) principal).getUsername();
			systemUserRole = ((UserDetails) principal).getAuthorities().iterator().next().getAuthority();
		}
		this.logger.debug("systemUserName=" + systemUserName + " systemUserRole=" + systemUserRole);
		if ((systemUserRole == null) || (systemUserName == null)) {
			systemUserRole = (String) session.getAttribute("systemUserRole");
			systemUserName = (String) session.getAttribute("systemUserName");
		}
		Map<String, String> map = new HashMap<>();
		map.put("systemUserRole", systemUserRole);
		map.put("systemUserName", systemUserName);
		List<HashMap> siteget = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms2/siteset");
		mav.addObject("Sitelist", siteget);
		return mav;
	}


	@GetMapping("/cms2/adminAuth")
	public ModelAndView cmsadminauth2() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms2/adminAuth");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms2/catalog")
	public String catalog2() {

		return "cms2/catalog";
	}

	@GetMapping("/cms2/regions")
	public ModelAndView cmsregions2() {

		List<HashMap> hashmap = this.service.getAllRegion();

		ModelAndView mav = new ModelAndView("cms2/regions");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/cms2/manufacturer")
	public ModelAndView cmsmanufacturer2() {

		List<HashMap> hashmap = this.service.getManufacturer();
		ModelAndView mav = new ModelAndView("cms2/manufacturer");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/cms2/new")
	public ModelAndView cmsnew2() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms2/new");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms2/linkage")
	public ModelAndView cmslinkage2(HttpSession session, @RequestParam("id") int id) {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String systemUserName = null;
		String systemUserRole = null;
		if (principal instanceof UserDetails) {
			systemUserName = ((UserDetails) principal).getUsername();
			systemUserRole = ((UserDetails) principal).getAuthorities().iterator().next().getAuthority();
		}
		this.logger.debug("systemUserName=" + systemUserName + " systemUserRole=" + systemUserRole);
		if ((systemUserRole == null) || (systemUserName == null)) {
			systemUserRole = (String) session.getAttribute("systemUserRole");
			systemUserName = (String) session.getAttribute("systemUserName");
		}
		Map<String, String> map = new HashMap<>();
		map.put("systemUserRole", systemUserRole);
		map.put("systemUserName", systemUserName);
		List<HashMap> siteget = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms2/linkage");
		mav.addObject("Sitelist", siteget);
		mav.addObject("bppurl", "/ht/building-patch-panel?siteid=" + id);
		return mav;
	}

	@GetMapping("/cms2/modifySite")
	public ModelAndView modifySite2() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms2/modifySite");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms2/view")
	public ModelAndView cmsview2(@RequestParam HashMap<String, String> requestParams) {

		String siteid = requestParams.get("siteid");

		ModelAndView mav = new ModelAndView("cms2/view");
		mav.addObject("vstsrcid", "/ht/viewing-site-tree?siteid=" + siteid);
		List<HashMap> menulist = new ArrayList<>();
		HashMap<String, String> hm1 = new HashMap<>();
		hm1.put("href", "../cms2/setting");
		hm1.put("text", "cmsopt");
		menulist.add(hm1);
		HashMap<String, String> hm2 = new HashMap<>();
		hm2.put("href", "../cms2/siteset");
		hm2.put("text", "siteopt");
		menulist.add(hm2);
		mav.addObject("menulist", menulist);
		return mav;
	}

	@GetMapping("/ipam2/setting")
	public ModelAndView ipamsetting2() {

		ModelAndView mav = new ModelAndView("ipam2/setting");
		return mav;
	}

	@GetMapping("/ipam2/user")
	public ModelAndView ipamuser2() {

		List<HashMap> history = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam2/user");
		mav.addObject("Hashmap", history);
		return mav;
	}

	@GetMapping("/ipam2/adminNetwork")
	public ModelAndView ipamNetwork2() {

		List<HashMap> network = this.service.getNetwork();
		ModelAndView mav = new ModelAndView("ipam2/adminNetwork");
		mav.addObject("getList", network);
		return mav;
	}
}
