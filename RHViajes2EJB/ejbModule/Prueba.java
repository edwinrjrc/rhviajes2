import pe.com.viajes.negocio.exception.ErrorEncriptacionException;
import pe.com.viajes.negocio.util.UtilEncripta;

public class Prueba {

	public static void main(String[] args) {
		try {
			String clave = UtilEncripta.encriptaCadena("H0La_2405");
			
			System.out.println(clave);
		} catch (ErrorEncriptacionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
