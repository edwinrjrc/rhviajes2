/**
 * 
 */
package pe.com.rhviajes.web.util;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.ResourceBundle;

import org.apache.commons.lang3.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import pe.com.viajes.negocio.exception.ConversionStringDateException;
import pe.com.viajes.negocio.exception.ConvertirStringAIntegerException;

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
	
	public static Date convertirStringADate(String fecha) throws ConversionStringDateException{
		try {
			SimpleDateFormat sdf =  new SimpleDateFormat(PATTERN_GSON);
			return sdf.parse(fecha);
		} catch (ParseException e) {
			throw new ConversionStringDateException(e);
		}
	}

	public static Integer convertirStringAInteger(String numero) throws ConvertirStringAIntegerException{
		try {
			Double n = Double.valueOf(numero);
			return n.intValue();
		} catch (NumberFormatException e) {
			throw new ConvertirStringAIntegerException(e);
		}
	}
	
	public static String obtenerCadenaPropertieMaestro(String llave,
			String maestroPropertie) {
		ResourceBundle resourceMaestros = ResourceBundle
				.getBundle(maestroPropertie);
		return resourceMaestros.getString(llave);
	}

	public static int obtenerEnteroPropertieMaestro(String llave,
			String maestroPropertie) throws ConvertirStringAIntegerException {
		return convertirStringAInteger(obtenerCadenaPropertieMaestro(llave,maestroPropertie));
	}
}
