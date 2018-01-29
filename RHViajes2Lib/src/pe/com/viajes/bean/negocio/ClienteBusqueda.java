/**
 * 
 */
package pe.com.viajes.bean.negocio;

/**
 * @author Edwin
 *
 */
public class ClienteBusqueda extends Cliente {

	private static final long serialVersionUID = 759351026690541776L;
	
	private int numeroPagina;
	private int tamanioPagina;
	
	/**
	 * @return the numeroPagina
	 */
	public int getNumeroPagina() {
		return numeroPagina;
	}
	/**
	 * @param numeroPagina the numeroPagina to set
	 */
	public void setNumeroPagina(int numeroPagina) {
		this.numeroPagina = numeroPagina;
	}
	/**
	 * @return the tamanioPagina
	 */
	public int getTamanioPagina() {
		return tamanioPagina;
	}
	/**
	 * @param tamanioPagina the tamanioPagina to set
	 */
	public void setTamanioPagina(int tamanioPagina) {
		this.tamanioPagina = tamanioPagina;
	}

}
