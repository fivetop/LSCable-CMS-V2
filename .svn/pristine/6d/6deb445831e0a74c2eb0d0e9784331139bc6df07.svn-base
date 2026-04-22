package com.i52soft.lscable.cms.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.i52soft.lscable.cms.service.WidgetDataProviderService;

@RestController
@RequestMapping("/api")
public class WidgetDataProviderRestController {

	@Autowired
	private Environment env;

	@Autowired
	private WidgetDataProviderService service;

	@RequestMapping(value = "/getWidgetDataAPI/{provider_name}", method = RequestMethod.GET)
	public String getWidgetDataAPI(HttpSession session, @PathVariable(value = "provider_name") String provider_name,
			@RequestParam(value = "device_name", required = false) String device_name) {
		JSONObject json = new JSONObject();

		if (provider_name.equalsIgnoreCase("RackIPUsage")) {
			HashMap<String, Integer> rackusage = service.getRackUsage();
			HashMap<String, Integer> ipusage = service.getIPUsage();
			try {
				json.put("xtitle", "Rack");
				json.put("xused", rackusage.get("used"));
				json.put("xtotal", rackusage.get("total"));
				json.put("xrate", rackusage.get("rate"));
				json.put("yrate", ipusage.get("rate"));
				json.put("ytotal", ipusage.get("total"));
				json.put("yused", ipusage.get("used"));
				json.put("ytitle", "IP");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("PatchPanelPortUsage")) {
			HashMap<String, Integer> patchpanelusage = service.getPatchPanelUsage();
			HashMap<String, Integer> portusage = service.getPortUsage();
			try {
				json.put("xtitle", "PatchPanel Port");
				json.put("xused", patchpanelusage.get("used"));
				json.put("xtotal", patchpanelusage.get("total"));
				json.put("xrate", patchpanelusage.get("rate"));
				json.put("yrate", portusage.get("rate"));
				json.put("ytotal", portusage.get("total"));
				json.put("yused", portusage.get("used"));
				json.put("ytitle", "Switch Port");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("RecentAlarmStat")) { // donut
			List<HashMap> stats = service.getRecentAlarmStat();
			if (stats != null && !stats.isEmpty()) {
				Iterator<HashMap> itr = stats.iterator();
				while (itr.hasNext()) {
					HashMap stat = (HashMap) itr.next();
					String label = "";
					int severity = (int) stat.get("severity");
					if (severity == 1)
						label = "Critical";
					else if (severity == 2)
						label = "Major";
					else if (severity == 3)
						label = "Minor";
					else if (severity == 4)
						label = "Warning";
					try {
						json.put(label, stat.get("cnt"));
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		} else if (provider_name.equalsIgnoreCase("DevicesAvailability")) {

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
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("fromtime", starttime.getTime());
			map2.put("endtime", endtime.getTime());
			map2.put("lookuptable", "ElementAvailabilityHourly");
			String tablename = service.getTableNameFromMetaTable(map2);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("starttimehr", starttime);
			map.put("endtimehr", endtime);
			map.put("tablename", "ElementAvailabilityHourly" + tablename);

			List<HashMap> list = service.getDevicesAvailability(map);
			// List<HashMap> list = service.getDevicesAvailabilityLS(map);
			try {
				json.put("list", list);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("InterfaceTrafficInPeriod")) {
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

			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("fromtime", starttime.getTime());
			map2.put("endtime", endtime.getTime());
			map2.put("lookuptable", "IfHCHourly");
			String tablename = service.getTableNameFromMetaTable(map2);

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("starttimehr", starttime);
			map.put("endtimehr", endtime);
			map.put("moname", device_name);
			map.put("tablename", "IfHCHourlySUM_" + tablename);
			List<HashMap> traffic = service.getInterfaceTrafficInPeriod(map);
			try {
				json.put("traffic", traffic);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("RecentAlarmList")) { // grid
																		// table
			List<HashMap> list = service.getRecentAlarmList();

			try {
				json.put("list", list);
				json.put("type", "RecentAlarmList");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("UnauthorizedAccessList")) { // grid
																				// table
			List<HashMap> list = service.searchUnauthorizedIPTerminal();
			try {
				json.put("list", list);
				json.put("type", "UnauthorizedAccessList");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("TopNPacketLoss")) { // grid
																		// table
			long current = System.currentTimeMillis();
			long starttime = current - (60 * 1000 * 60 * 24);
			long endtime = current; // - (60*1000*60*24);
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("fromtime", starttime);
			map2.put("endtime", endtime);
			map2.put("lookuptable", "STATSDATA_HOURLY");
			String tablename = service.getTableNameFromMetaTable(map2);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("starttimehr", starttime);
			map.put("endtimehr", endtime);
			map.put("tablename", tablename);
			List<HashMap> list = service.getTopNPacketLoss(map);
			try {
				json.put("list", list);
				json.put("type", "TopNPacketLoss");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("RecentEventList")) { // alarm
																		// grid
																		// table
			long current = System.currentTimeMillis();
			long starttime = current - (60 * 1000 * 60 * 24);
			long endtime = current; // - (60*1000*60*24);
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("fromtime", starttime);
			map2.put("endtime", endtime);
			map2.put("lookuptable", "Event");
			String tablename = service.getTableNameFromMetaTable(map2);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("tablename", tablename);
			List<HashMap> list = service.getRecentEventList(map);
			try {
				json.put("list", list);
				json.put("type", "RecentEventList");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("EventSummaryList")) { // alarm
																			// grid
																			// table
			List<HashMap> list = service.getEventSummaryList();
			try {
				json.put("list", list);
				json.put("type", "EventSummaryList");
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("MinMaxAvgCPUTopN")) {
			long current = System.currentTimeMillis();
			long starttime = current - (60 * 1000 * 60 * 24);
			long endtime = current; // - (60*1000*60*24);
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("fromtime", starttime);
			map2.put("endtime", endtime);
			map2.put("lookuptable", "STATSDATA_HOURLY");
			String tablename = service.getTableNameFromMetaTable(map2);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("starttimehr", starttime);
			map.put("endtimehr", endtime);
			map.put("tablename", tablename);
			List<HashMap> list = service.getMinMaxAvgCPUTopN(map);
			try {
				json.put("list", list);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("MinMaxAvgMemoryTopN")) {
			long current = System.currentTimeMillis();
			long starttime = current - (60 * 1000 * 60 * 24);
			long endtime = current; // - (60*1000*60*24);
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("fromtime", starttime);
			map2.put("endtime", endtime);
			map2.put("lookuptable", "STATSDATA_HOURLY");
			String tablename = service.getTableNameFromMetaTable(map2);
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("starttimehr", starttime);
			map.put("endtimehr", endtime);
			map.put("tablename", tablename);
			List<HashMap> list = service.getMinMaxAvgMemoryTopN(map);
			try {
				json.put("list", list);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("NFATopApp")) {
			String apiKey = (String) session.getAttribute("apiKey");

			if (apiKey == null || apiKey.isEmpty()) {
				apiKey = env.getProperty("system.nms.apiKey");
				if (apiKey == null || apiKey.isEmpty()) {
					apiKey = "1bdcc65c731477fe7ea53323adb59937";
				}
			}
			String NMS_URL = env.getProperty("system.nms.ip4");
			if (NMS_URL == null || NMS_URL.isEmpty()) {
				NMS_URL = "http://192.168.0.79/";
			}
			CloseableHttpClient httpClient = HttpClients.createDefault();
			if (device_name == null || device_name == "") {
				device_name = "192.168.0.40";
			}
			// http://192.168.0.79/api/json/nfadevice/getDeviceReport?apiKey=1bdcc65c731477fe7ea53323adb59937&RouterIP=192.168.0.40&TimeFrame=hourly&ReportType=topApp
			// HttpGet httpGet = new
			// HttpGet(NMS_URL+"api/json/nfadevice/getDeviceReport?apiKey="+apiKey+"&RouterIP=192.168.0.40&TimeFrame=hourly&ReportType=topApp");
			HttpGet httpGet = new HttpGet(NMS_URL + "api/json/nfadevice/getDeviceReport?apiKey=" + apiKey + "&RouterIP="
					+ device_name + "&TimeFrame=hourly&ReportType=topApp");
			httpGet.addHeader("User-Agent", "Mozilla/5.0");
			CloseableHttpResponse httpResponse = null;
			try {
				httpResponse = httpClient.execute(httpGet);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(httpResponse.getEntity().getContent()));

				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = reader.readLine()) != null) {
					response.append(inputLine);
				}
				reader.close();
				// System.out.println(response.toString());
				httpClient.close();

				json.put("list", response.toString());

			} catch (IOException | JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		} else if (provider_name.equalsIgnoreCase("NFATopSrc")) {
			// http://192.168.0.79/api/json/nfadevice/getDeviceReport?apiKey=f9d625e55a0df2377ec29ac519a02a0b&RouterIP=1.1.7.10&TimeFrame=hourly&ReportType=source&ResolveDNS=false
			String apiKey = (String) session.getAttribute("apiKey");

			if (apiKey == null || apiKey.isEmpty()) {
				apiKey = env.getProperty("system.nms.apiKey");
				if (apiKey == null || apiKey.isEmpty()) {
					apiKey = "1bdcc65c731477fe7ea53323adb59937";
				}
			}
			String NMS_URL = env.getProperty("system.nms.ip4");
			if (NMS_URL == null || NMS_URL.isEmpty()) {
				NMS_URL = "http://192.168.0.79/";
			}
			CloseableHttpClient httpClient = HttpClients.createDefault();
			if (device_name == null || device_name == "") {
				device_name = "192.168.0.40";
			}
			// HttpGet httpGet = new
			// HttpGet(NMS_URL+"api/json/nfadevice/getDeviceReport?apiKey="+apiKey+"&RouterIP=192.168.0.40&TimeFrame=hourly&ReportType=source&ResolveDNS=false");
			HttpGet httpGet = new HttpGet(NMS_URL + "api/json/nfadevice/getDeviceReport?apiKey=" + apiKey + "&RouterIP="
					+ device_name + "&TimeFrame=hourly&ReportType=source&ResolveDNS=false");
			httpGet.addHeader("User-Agent", "Mozilla/5.0");
			CloseableHttpResponse httpResponse = null;
			try {
				httpResponse = httpClient.execute(httpGet);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(httpResponse.getEntity().getContent()));

				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = reader.readLine()) != null) {
					response.append(inputLine);
				}
				reader.close();
				// System.out.println(response.toString());
				httpClient.close();

				json.put("list", response.toString());

			} catch (IOException | JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("NFATopDst")) {
			// http://192.168.0.79/api/json/nfadevice/getDeviceReport?apiKey=f9d625e55a0df2377ec29ac519a02a0b&RouterIP=1.1.7.10&TimeFrame=hourly&ReportType=destination&ResolveDNS=false
			String apiKey = (String) session.getAttribute("apiKey");

			if (apiKey == null || apiKey.isEmpty()) {
				apiKey = env.getProperty("system.nms.apiKey");
				if (apiKey == null || apiKey.isEmpty()) {
					apiKey = "1bdcc65c731477fe7ea53323adb59937";
				}
			}
			String NMS_URL = env.getProperty("system.nms.ip4");
			if (NMS_URL == null || NMS_URL.isEmpty()) {
				NMS_URL = "http://192.168.0.79/";
			}
			CloseableHttpClient httpClient = HttpClients.createDefault();
			if (device_name == null || device_name == "") {
				device_name = "192.168.0.40";
			}
			// HttpGet httpGet = new
			// HttpGet(NMS_URL+"api/json/nfadevice/getDeviceReport?apiKey="+apiKey+"&RouterIP=192.168.0.40&TimeFrame=hourly&ReportType=source&ResolveDNS=false");
			HttpGet httpGet = new HttpGet(NMS_URL + "api/json/nfadevice/getDeviceReport?apiKey=" + apiKey + "&RouterIP="
					+ device_name + "&TimeFrame=hourly&ReportType=destination&ResolveDNS=false");
			httpGet.addHeader("User-Agent", "Mozilla/5.0");
			CloseableHttpResponse httpResponse = null;
			try {
				httpResponse = httpClient.execute(httpGet);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(httpResponse.getEntity().getContent()));

				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = reader.readLine()) != null) {
					response.append(inputLine);
				}
				reader.close();
				// System.out.println(response.toString());
				httpClient.close();

				json.put("list", response.toString());

			} catch (IOException | JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("NFATopQos")) {
			// http://192.168.0.79/api/json/nfadevice/getDeviceReport?apiKey=f9d625e55a0df2377ec29ac519a02a0b&RouterIP=1.1.7.10&TimeFrame=hourly&ReportType=destination&ResolveDNS=false
			String apiKey = (String) session.getAttribute("apiKey");

			if (apiKey == null || apiKey.isEmpty()) {
				apiKey = env.getProperty("system.nms.apiKey");
				if (apiKey == null || apiKey.isEmpty()) {
					apiKey = "1bdcc65c731477fe7ea53323adb59937";
				}
			}
			String NMS_URL = env.getProperty("system.nms.ip4");
			if (NMS_URL == null || NMS_URL.isEmpty()) {
				NMS_URL = "http://192.168.0.79/";
			}
			CloseableHttpClient httpClient = HttpClients.createDefault();
			if (device_name == null || device_name == "") {
				device_name = "192.168.0.40";
			}
			// HttpGet httpGet = new
			// HttpGet(NMS_URL+"api/json/nfadevice/getDeviceReport?apiKey="+apiKey+"&RouterIP=192.168.0.40&TimeFrame=hourly&ReportType=source&ResolveDNS=false");
			HttpGet httpGet = new HttpGet(NMS_URL + "api/json/nfadevice/getDeviceReport?apiKey=" + apiKey + "&RouterIP="
					+ device_name + "&TimeFrame=hourly&ReportType=dscp");
			httpGet.addHeader("User-Agent", "Mozilla/5.0");
			CloseableHttpResponse httpResponse = null;
			try {
				httpResponse = httpClient.execute(httpGet);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(httpResponse.getEntity().getContent()));

				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = reader.readLine()) != null) {
					response.append(inputLine);
				}
				reader.close();
				// System.out.println(response.toString());
				httpClient.close();

				json.put("list", response.toString());

			} catch (IOException | JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else if (provider_name.equalsIgnoreCase("NFATopConv")) {
			// http://192.168.0.79/api/json/nfadevice/getDeviceReport?apiKey=f9d625e55a0df2377ec29ac519a02a0b&RouterIP=1.1.7.10&TimeFrame=hourly&ReportType=destination&ResolveDNS=false
			String apiKey = (String) session.getAttribute("apiKey");

			if (apiKey == null || apiKey.isEmpty()) {
				apiKey = env.getProperty("system.nms.apiKey");
				if (apiKey == null || apiKey.isEmpty()) {
					apiKey = "1bdcc65c731477fe7ea53323adb59937";
				}
			}
			String NMS_URL = env.getProperty("system.nms.ip4");
			if (NMS_URL == null || NMS_URL.isEmpty()) {
				NMS_URL = "http://192.168.0.79/";
			}
			CloseableHttpClient httpClient = HttpClients.createDefault();
			if (device_name == null || device_name == "") {
				device_name = "192.168.0.40";
			}
			// HttpGet httpGet = new
			// HttpGet(NMS_URL+"api/json/nfadevice/getDeviceReport?apiKey="+apiKey+"&RouterIP=192.168.0.40&TimeFrame=hourly&ReportType=source&ResolveDNS=false");
			HttpGet httpGet = new HttpGet(NMS_URL + "api/json/nfadevice/getDeviceReport?apiKey=" + apiKey + "&RouterIP="
					+ device_name + "&TimeFrame=hourly&ReportType=Conversation");
			httpGet.addHeader("User-Agent", "Mozilla/5.0");
			CloseableHttpResponse httpResponse = null;
			try {
				httpResponse = httpClient.execute(httpGet);
				BufferedReader reader = new BufferedReader(
						new InputStreamReader(httpResponse.getEntity().getContent()));

				String inputLine;
				StringBuffer response = new StringBuffer();

				while ((inputLine = reader.readLine()) != null) {
					response.append(inputLine);
				}
				reader.close();
				// System.out.println(response.toString());
				httpClient.close();

				json.put("list", response.toString());

			} catch (IOException | JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}

		return json.toString();
	}
}
