/**
 * 
 */
package pe.com.viajes.bean.base;

import java.io.Serializable;

/**
 * @author Edwin
 * 
 */
public class Base implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String codigoCadena;
	private Integer codigoEntero;
	private BaseVO estado;
	
	private BaseVO empresa;
	private int totalRegistros;
	
	private int tamPagina;
	private int numPagina;

	/**
	 * 
	 */
	public Base() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the codigoCadena
	 */
	public String getCodigoCadena() {
		return codigoCadena;
	}

	/**
	 * @param codigoCadena
	 *            the codigoCadena to set
	 */
	public void setCodigoCadena(String codigoCadena) {
		this.codigoCadena = codigoCadena;
	}

	/**
	 * @return the codigoEntero
	 */
	public Integer getCodigoEntero() {
		return codigoEntero;
	}

	/**
	 * @param codigoEntero
	 *            the codigoEntero to set
	 */
	public void setCodigoEntero(Integer codigoEntero) {
		this.codigoEntero = codigoEntero;
	}

	/**
	 * @return the estado
	 */
	public BaseVO getEstado() {
		if (estado == null) {
			estado = new BaseVO();
		}
		return estado;
	}

	/**
	 * @param estado
	 *            the estado to set
	 */
	public void setEstado(BaseVO estado) {
		this.estado = estado;
	}

	/**
	 * @return the empresa
	 */
	public BaseVO getEmpresa() {
		if (empresa == null){
			empresa = new BaseVO();
		}
		return empresa;
	}

	/**
	 * @param empresa the empresa to set
	 */
	public void setEmpresa(BaseVO empresa) {
		this.empresa = empresa;
	}

	/**
	 * @return the totalRegistros
	 */
	public int getTotalRegistros() {
		return totalRegistros;
	}

	/**
	 * @param totalRegistros the totalRegistros to set
	 */
	public void setTotalRegistros(int totalRegistros) {
		this.totalRegistros = totalRegistros;
	}

	/**
	 * @return the tamPagina
	 */
	public int getTamPagina() {
		return tamPagina;
	}

	/**
	 * @param tamPagina the tamPagina to set
	 */
	public void setTamPagina(int tamPagina) {
		this.tamPagina = tamPagina;
	}

	/**
	 * @return the numPagina
	 */
	public int getNumPagina() {
		return numPagina;
	}

	/**
	 * @param numPagina the numPagina to set
	 */
	public void setNumPagina(int numPagina) {
		this.numPagina = numPagina;
	}

}
