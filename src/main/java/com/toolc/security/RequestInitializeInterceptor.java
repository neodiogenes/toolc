package com.toolc.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import net.minidev.json.JSONObject;

public class RequestInitializeInterceptor extends HandlerInterceptorAdapter {
	// Obtain a suitable logger.
	private static Log logger = LogFactory.getLog(RequestInitializeInterceptor.class);

	
	/**
	 * The preHandle method logs the incoming request before it is processed
	 * 
	 */
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		try {
			if (request!=null) {
				JSONObject detail = new JSONObject();
				detail.put("requestUri", request.getRequestURI());
				
				detail.put("requestMethod", request.getMethod());
				
				if (request.getUserPrincipal()!=null)
					detail.put("userId", request.getUserPrincipal().getName());
				else
				    detail.put("userId", "error getting user Id");
				
				JSONObject json = new JSONObject();
				json.put("restApiIntercept", detail);			
				logger.info(json.toJSONString());
			}

			return true;
		} catch (RuntimeException e) {
			logger.info("request update failed");
			return false;
		}
	}

	/**
	 * The data added to the request would most likely come from a database
	 */
	void updateRequest(HttpServletRequest request) {
		//logger.info("Updating request object");
		//request.setAttribute("commonData", "This string is required in every request");
	}
}