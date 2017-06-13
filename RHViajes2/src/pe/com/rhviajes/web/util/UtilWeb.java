/**
 * 
 */
package pe.com.rhviajes.web.util;

import java.lang.reflect.Type;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

/**
 * @author Edwin
 *
 */
public class UtilWeb {
	
	public final static String PATTERN_GSON = "yyyy-MM-dd'T'HH:mm:ss";

	public static Map<String, Object> convertirJsonAMap(String json){
		Gson gson = new GsonBuilder().setDateFormat(PATTERN_GSON).create();
		Type type = new TypeToken<Map<String, Object>>(){}.getType();
		return gson.fromJson(json, type);
	}
	
	public static Integer parseInt(String valor){
		if (StringUtils.isNotBlank(valor)){
			return Integer.valueOf(valor);
		}
		return 0;
	}

}
