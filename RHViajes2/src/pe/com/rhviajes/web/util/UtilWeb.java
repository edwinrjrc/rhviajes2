/**
 * 
 */
package pe.com.rhviajes.web.util;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.TimeZone;

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
			return Double.valueOf(valor).intValue();
		}
		return 0;
	}
	
	public static double parseDouble(String valor){
		if (StringUtils.isNotBlank(valor)){
			return Double.parseDouble(valor);
		}
		return (double) 0;
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
	
	public static BigDecimal obtenerBigDecimalMapeo(Object valor){
		if (valor == null || StringUtils.isBlank(valor.toString())){
			return BigDecimal.ZERO;
		}
		return BigDecimal.valueOf(Double.parseDouble(valor.toString()));
	}
	public static Integer obtenerIntMapeo(Object valor){
		if (valor == null || StringUtils.isBlank(valor.toString())){
			return 0;
		}
		return Double.valueOf(valor.toString()).intValue();
	}
	public static Date obtenerFechaMapeo(Object valor){
		try {
			if (valor == null || StringUtils.isBlank(valor.toString())){
				return null;
			}
			String fecha = valor.toString();
			fecha = fecha.substring(0, fecha.length()-1);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
			sdf.setTimeZone(TimeZone.getDefault());
			Calendar cal = Calendar.getInstance(Locale.getDefault());
			cal.setTime(sdf.parse(fecha));
			cal.add(Calendar.HOUR, -5);
			return cal.getTime();
		} catch (ParseException e) {
			try {
				if (valor == null || StringUtils.isBlank(valor.toString())){
					return null;
				}
				String fecha = valor.toString();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
				sdf.setTimeZone(TimeZone.getDefault());
				return sdf.parse(fecha);
			} catch (ParseException e1) {
				return null;
			}
		}
	}
	public static boolean obtenerBooleanMapeo(Object valor){
		if (valor == null || StringUtils.isBlank(valor.toString())){
			return false;
		}
		return Boolean.valueOf(valor.toString());
	}
	public static String obtenerCadenaMapeo(Object valor){
		if (valor == null || StringUtils.isBlank(valor.toString())){
			return "";
		}
		return valor.toString();
	}
	
	public static String completarCerosIzquierda(String cadena, int cantidad) {
		return completarCaracter(cadena, "0", cantidad, "I");
	}
	
	/**
	 * Completa caracteres segun la cantidad y la direccion
	 * 
	 * @param cadena
	 * @param caracter
	 * @param cantidad
	 * @param direccion
	 * @return
	 */
	public static String completarCaracter(String cadena, String caracter,
			int cantidad, String direccion) {
		if ("D".equals(direccion)) {
			String cadenaNueva = cadena;
			int i = 0;
			while ((cadena.length() + i) < cantidad) {
				cadenaNueva = cadenaNueva + caracter;
				i++;
			}
			return cadenaNueva;
		} else if ("I".equals(direccion)) {
			String cadenaNueva = cadena;
			int i = 0;
			while ((cadena.length() + i) < cantidad) {
				cadenaNueva = caracter + cadenaNueva;
				i++;
			}
			return cadenaNueva;
		}
		return cadena;
	}
}
