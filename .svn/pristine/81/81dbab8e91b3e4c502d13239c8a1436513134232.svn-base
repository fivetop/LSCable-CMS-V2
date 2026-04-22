package com.i52soft.lscable.cms.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.i52soft.lscable.cms.service.HTBackendService;
import com.i52soft.lscable.cms.service.WidgetDataProviderService;

@Controller
public class DefaultController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private HTBackendService service;

	@Autowired
	private WidgetDataProviderService widgetService;

	@Autowired
	private Environment env;

	@GetMapping("/")
	public String home() {

		return "redirect:/mainpage";
	}

	@GetMapping("/error")
	public String error() {

		return "error";
	}

	@GetMapping("/CMS404")
	public String cms404() {

		return "CMS404";
	}
	
	@GetMapping("/login")
	public String login() {

		return "login";
	}

	@GetMapping("/api/endUserRegistration")
	public ModelAndView apiEndUserRegistration(HttpServletRequest req) {

		ModelAndView mav = new ModelAndView("endUserRegistration");
        String ip = req.getHeader("X-FORWARDED-FOR");
        if (ip == null)
            ip = req.getRemoteAddr();
         
        mav.addObject("clientIP", ip);		
		
		return mav;
	}
	@GetMapping("/api/endUserRegistration2")
	public ModelAndView apiEndUserRegistration2(@RequestParam HashMap req) {

		ModelAndView mav = new ModelAndView("endUserRegistration");
		String ip = (String)req.get("client_ip");
        mav.addObject("clientIP", ip);		
		
		return mav;
	}	
	@GetMapping("/api/endUserRegistration3")
	public ModelAndView apiEndUserRegistration3(@RequestParam HashMap req) {

		ModelAndView mav = new ModelAndView("endUserRegistration");
		String switch_mac = (String)req.get("switch_mac");
        mav.addObject("switch_mac", switch_mac);		
		
		return mav;
	}		
	@GetMapping(value = {"mainpage", "/mainpage"})
	public ModelAndView mainpage(HttpSession session) {

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

		Integer defaultid = null;
		if (systemUserRole.equalsIgnoreCase("Administrators")) {
			defaultid = this.service.getDefaultMainPageIDAdmin(map);
		} else {
			defaultid = this.service.getDefaultMainPageID(map);
		}

		if (defaultid == null) {
			List<HashMap> mainpage = this.service.getMainPageLayout(map);
			ModelAndView mav = new ModelAndView("setting2/main");
			mav.addObject("MainPageList", mainpage);
			return mav;
		}
		HashMap mainpage = this.service.getMainPageLayoutModelDataWOJson(defaultid);

		List<HashMap> widgets = this.service.getMainPageLayoutDetail4MainPage(defaultid);

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

	@GetMapping("/dashboard-frame1")
	public ModelAndView dashboardframe1() {

		ModelAndView mav = new ModelAndView("dashboard-frame1");
		return mav;
	}

	@GetMapping("/dashboard-frame2")
	public ModelAndView dashboardframe2() {

		ModelAndView mav = new ModelAndView("dashboard-frame2");
		return mav;
	}

	// mainsetting//
	@GetMapping("/setting/system")
	public String settingsystem() {

		return "setting/system";
	}

	@GetMapping("/setting/main")
	public ModelAndView settingmain(HttpSession session) {

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
		List<HashMap> mainpage = this.service.getMainPageLayout(map);
		ModelAndView mav = new ModelAndView("setting/main");
		mav.addObject("MainPageList", mainpage);
		Integer defaultid = null;
		if (systemUserRole.equalsIgnoreCase("Administrators")) {
			defaultid = this.service.getDefaultMainPageIDAdmin(map);
		} else {
			defaultid = this.service.getDefaultMainPageID(map);
		}
		mav.addObject("default", defaultid);
		return mav;
	}

	@GetMapping("/setting/view")
	public String settingview(@RequestParam("id") int id, Model model) {

		model.addAttribute("mainpageid", id);
		return "setting/view";
	}

	@GetMapping("/setting/manage-widget")
	public String managewidget() {

		return "setting/manage-widget";
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

	@GetMapping("/setting2/preview-layout")
	public ModelAndView setting2previewlayout(@RequestParam HashMap requestParams) {

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

	// 2
	@GetMapping("/setting2/system")
	public String settingsystem2() {

		return "setting2/system";
	}

	@GetMapping("/setting2/map-list")
	public String settingMapList() {

		return "setting2/map-list";
	}

	@GetMapping("/setting2/manage-widget")
	public String managewidget2() {

		return "setting2/manage-widget";
	}

	@GetMapping("/setting2/main")
	public ModelAndView settingmain2(HttpSession session) {

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
		List<HashMap> mainpage = this.service.getMainPageLayout(map);
		ModelAndView mav = new ModelAndView("setting2/main");
		mav.addObject("MainPageList", mainpage);

		Integer defaultid = null;
		if (systemUserRole.equalsIgnoreCase("Administrators")) {
			defaultid = this.service.getDefaultMainPageIDAdmin(map);
		} else {
			defaultid = this.service.getDefaultMainPageID(map);
		}
		mav.addObject("default", defaultid);
		return mav;
	}

	@GetMapping("/setting2/view")
	public String settingview2(@RequestParam("id") int id, Model model) {

		model.addAttribute("mainpageid", id);
		return "setting2/view";
	}

	// 2

	// mainsetting//

	@GetMapping("/main-widgetMap")
	public String mainwidgetMap() {

		return "main-widgetMap";
	}

	@GetMapping("frame1/chartist")
	public String chartist() {

		return "frame1/chartist";
	}

	@GetMapping("frame1/chartist2")
	public String chartist2() {

		return "frame1/chartist2";
	}

	@GetMapping("frame1/circle")
	public String circle() {

		return "frame1/circle";
	}

	@GetMapping("frame1/circle2")
	public String circle2() {

		return "frame1/circle2";
	}

	@GetMapping("frame1/donutchart")
	public String donutchart() {

		return "frame1/donutchart";
	}

	@GetMapping("frame1/piechart")
	public String piechart() {

		return "frame1/piechart";
	}

	@GetMapping("frame1/RecentAlarmList")
	public String RecentAlarmList() {

		return "frame1/RecentAlarmList";
	}

	@GetMapping("frame1/event")
	public ModelAndView event() {

		ModelAndView mav = new ModelAndView("frame1/event");
		return mav;
	}

	@GetMapping("frame1/devicetable")
	public ModelAndView devicetable() {

		ModelAndView mav = new ModelAndView("frame1/devicetable");
		return mav;
	}

	@GetMapping("frame1/deviceusage")
	public ModelAndView deviceusage() {

		ModelAndView mav = new ModelAndView("frame1/deviceusage");
		return mav;
	}

	////////////////// dynamic widget layout support
	@GetMapping("frame1/widget-gauge")
	public ModelAndView widgetgauge(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-gauge");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);

		return mav;
	}

	@GetMapping("frame1/widget-piechart")
	public ModelAndView widgetpiechart(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-piechart");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-gridtable")
	public ModelAndView widgetgridtable(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		String widget_layout_rowspan = (String) requestParams.get("widget_layout_rowspan");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-gridtable");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
        String heightClass = "panel-wrapper";
        String heightValue = "128";
        if (widget_layout_rowspan.equalsIgnoreCase("2")){
        	heightClass = "panel-wrapper2";
        	heightValue = "358";
        }		
        
		mav.addObject("heightClass", heightClass);
		mav.addObject("heightValue", heightValue);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-alarm")
	public ModelAndView widgetalarm(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-alarm");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-donutchart")
	public ModelAndView widgetdonutchart(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-donutchart");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-minmaxavg")
	public ModelAndView widgetminmaxavg(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-minmaxavg");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-availability")
	public ModelAndView widgetavailability(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-availability");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-linechart")
	public ModelAndView widgetlinechart(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-linechart");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame1/widget-scatter")
	public ModelAndView widgetscatter(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame1/widget-scatter");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-gauge")
	public ModelAndView widgetgauge2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-gauge");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-piechart")
	public ModelAndView widgetpiechart2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-piechart");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-gridtable")
	public ModelAndView widgetgridtable2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		String widget_layout_rowspan = (String) requestParams.get("widget_layout_rowspan");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-gridtable");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);

        String heightClass = "panel-wrapper";
        String heightValue = "128";
        if (widget_layout_rowspan.equalsIgnoreCase("2")){
        	heightClass = "panel-wrapper2";
        	heightValue = "358";
        }		
        
		mav.addObject("heightClass", heightClass);
		mav.addObject("heightValue", heightValue);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-alarm")
	public ModelAndView widgetalarm2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-alarm");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-donutchart")
	public ModelAndView widgetdonutchart2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-donutchart");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-minmaxavg")
	public ModelAndView widgetminmaxavg2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-minmaxavg");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-availability")
	public ModelAndView widgetavailability2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-availability");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-linechart")
	public ModelAndView widgetlinechart2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-linechart");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/widget-scatter")
	public ModelAndView widgetscatter2(@RequestParam HashMap requestParams) {

		String widget_title = (String) requestParams.get("title");
		String option_data_name = (String) requestParams.get("option_data_name");
		String option_data_option = (String) requestParams.get("option_data_option");
		int widget_polling_interval = Integer.parseInt(this.env.getProperty("system.widget.pollinginterval"));

		ModelAndView mav = new ModelAndView("frame2/widget-scatter");

		mav.addObject("widget_title", widget_title);
		mav.addObject("option_data_name", option_data_name);
		mav.addObject("option_data_option", option_data_option);
		mav.addObject("widget_polling_interval", widget_polling_interval);
		return mav;
	}

	@GetMapping("frame2/chartist")
	public String chartistb() {

		return "frame2/chartist";
	}

	@GetMapping("frame2/chartist2")
	public String chartist2b() {

		return "frame2/chartist2";
	}

	@GetMapping("frame2/circle")
	public String circleb() {

		return "frame2/circle";
	}

	@GetMapping("frame2/circle2")
	public String circle2b() {

		return "frame2/circle2";
	}

	@GetMapping("frame2/donutchart")
	public String donutchartb() {

		return "frame2/donutchart";
	}

	@GetMapping("frame2/event")
	public ModelAndView eventb() {

		List<HashMap> eventlist = this.widgetService.getEventSummaryList();
		ModelAndView mav = new ModelAndView("frame2/event");
		mav.addObject("eventlist", eventlist);
		return mav;
	}

	@GetMapping("frame2/devicetable")
	public ModelAndView devicetableb() {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
		Date currentDate = new Date();
		System.out.println(sdf.format(currentDate));

		// convert date to calendar
		Calendar c = Calendar.getInstance();
		c.setTime(currentDate);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		c.add(Calendar.DATE, -1);
		Date starttime = c.getTime();
		c.add(Calendar.DATE, 1);
		Date endtime = c.getTime();

		String starttimehr = sdf.format(starttime);
		String endtimehr = sdf.format(endtime);

		Map<String, Object> map = new HashMap<>();
		map.put("starttimehr", starttime);
		map.put("endtimehr", endtime);
		List<HashMap> devices = this.widgetService.getDevicesAvailability(map);
		ModelAndView mav = new ModelAndView("frame2/devicetable");
		mav.addObject("devices", devices);
		return mav;
	}

	@GetMapping("frame2/deviceusage")
	public ModelAndView deviceusageb() {

		long current = System.currentTimeMillis();
		long starttime = current - (60 * 1000 * 60 * 24 * 2);
		long endtime = current - (60 * 1000 * 60 * 24);
		Map<String, Object> map = new HashMap<>();
		map.put("starttimehr", starttime);
		map.put("endtimehr", endtime);
		List<HashMap> devices = this.widgetService.getMinMaxAvgCPUTopN(map);
		ModelAndView mav = new ModelAndView("frame2/deviceusage");
		mav.addObject("devices", devices);
		return mav;
	}

	@GetMapping("frame2/piechart")
	public String piechartb() {

		return "frame2/piechart";
	}

	@GetMapping("frame2/RecentAlarmList")
	public String RecentAlarmListb() {

		return "frame2/RecentAlarmList";
	}

	// cms//
	@GetMapping("/cms/index")
	public ModelAndView cmsindex(HttpSession session) {

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
		List<HashMap> list = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms/index");
		mav.addObject("list", list);
		return mav;
	}

	@SuppressWarnings("rawtypes")
	@GetMapping("/cms/view")
	public ModelAndView cmsuserview(@RequestParam HashMap<String, String> requestParams) {

		String siteid = requestParams.get("siteid");
		ModelAndView mav = new ModelAndView("cms/view");
		mav.addObject("vstsrcid", "/ht/viewing-site-tree?siteid=" + siteid);
		List<HashMap> menulist = new ArrayList<>();
		HashMap<String, String> hm1 = new HashMap<>();
		hm1.put("href", "/cms/index");
		hm1.put("text", "cmsopt");
		menulist.add(hm1);
		mav.addObject("menulist", menulist);
		return mav;
	}

	@GetMapping("/cms/adminPortUsage")
	public ModelAndView cmsadminPortUsage() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms/adminPortUsage");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms/adminSearch")
	public ModelAndView cmsadminsearch() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms/adminSearch");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms/adminList")
	public ModelAndView cmsadminList() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms/adminList");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms/siteView")
	public ModelAndView cmsSiteView(HttpSession session) {

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
		List<HashMap> list = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms/siteView");
		mav.addObject("Sitelist", list);
		return mav;
	}

	// ipam//
	@GetMapping("/ipam/index")
	public ModelAndView ipamindex() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam/index");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/ipam/terminalList")
	public ModelAndView terminalList() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam/terminalList");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/ipam/terminalUser")
	public ModelAndView terminalUser() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam/terminalUser");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}
	// 2222

	// cms//
	@GetMapping("/cms2/index")
	public ModelAndView cmsindex2(HttpSession session) {

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
		List<HashMap> list = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms2/index");
		mav.addObject("list", list);
		return mav;
	}

	@GetMapping("/cms2/view")
	public ModelAndView cmsuserview2(@RequestParam HashMap<String, String> requestParams) {

		String siteid = requestParams.get("siteid");
		ModelAndView mav = new ModelAndView("cms2/view");
		mav.addObject("vstsrcid", "/ht/viewing-site-tree?siteid=" + siteid);
		List<HashMap> menulist = new ArrayList<>();
		HashMap<String, String> hm1 = new HashMap<>();
		hm1.put("href", "/cms2/index");
		hm1.put("text", "cmsopt");
		menulist.add(hm1);
		mav.addObject("menulist", menulist);
		return mav;
	}

	@GetMapping("/cms2/adminPortUsage")
	public ModelAndView cms2adminPortUsage() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms2/adminPortUsage");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms2/adminSearch")
	public ModelAndView cmsadminsearch2() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms2/adminSearch");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms2/adminList")
	public ModelAndView cms2adminList() {

		List<HashMap> newsite = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("cms2/adminList");
		mav.addObject("Hashmap", newsite);
		return mav;
	}

	@GetMapping("/cms2/siteView")
	public ModelAndView cms2SiteView(HttpSession session) {

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
		List<HashMap> list = this.service.getCMSSite(map);
		ModelAndView mav = new ModelAndView("cms2/siteView");
		mav.addObject("Sitelist", list);
		return mav;
	}

	// ipam//
	@GetMapping("/ipam2/index")
	public ModelAndView ipamindex2() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam2/index");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/ipam2/terminalList")
	public ModelAndView terminalList2() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam2/terminalList");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}

	@GetMapping("/ipam2/terminalUser")
	public ModelAndView terminalUser2() {

		List<HashMap> hashmap = this.service.getSystemUser();
		ModelAndView mav = new ModelAndView("ipam2/terminalUser");
		mav.addObject("Hashmap", hashmap);
		return mav;
	}
	// 2222

	@GetMapping("/ht-map-widget")
	public String htmapwidget() {

		return "ht-map-widget";
	}

	@GetMapping("/ht/map-widget")
	public String htmapwidget1() {

		return "ht/map-widget";
	}
	@GetMapping("/ht/dcim-widget")
	public String htdcimwidget() {

		return "ht/dcim-widget";
	}
	@GetMapping("/ht/preview-dcim-widget")
	public String previewhtdcimwidget() {

		return "ht/preview-dcim-widget";
	}	
	@GetMapping("/ht/managing-catalog")
	public String htmanagingcatalog() {

		return "ht/managing-catalog";
	}

	@GetMapping("/ht/building-patch-panel")
	public String htbuildingpatchpanel() {

		return "ht/building-patch-panel";
	}

	@GetMapping("/ht/building-layout")
	public String htbuildinglayout() {

		return "ht/building-layout";
	}

	@GetMapping("/ht/building-site-tree")
	public String htbuildingsitetree() {

		return "ht/building-site-tree";
	}

	@GetMapping("/ht/preview-map-widget")
	public String htpreviewmapwidget() {

		return "ht/preview-map-widget";
	}

	@GetMapping("/ht/viewing-layout")
	public String htviewinglayout() {

		return "ht/viewing-layout";
	}

	@GetMapping("/ht/viewing-map-widget")
	public String htviewingmapwidget() {

		return "ht/viewing-map-widget";
	}

	@GetMapping("/ht/viewing-site-floor-map")
	public String viewingsitefloormap() {

		return "ht/viewing-site-floor-map";
	}

	@GetMapping("/ht/viewing-site-tree")
	public String viewingsitetree() {

		return "ht/viewing-site-tree";
	}

	@GetMapping("/ht/PP_CSV_Validator")
	public String ppcsvvalidator() {

		return "ht/PP_CSV_Validator";
	}

}