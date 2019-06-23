/**
 * 
 */
package pe.com.viajes.bean.negocio;

import java.util.Date;

/**
 * @author Edwin
 *
 */
public class ArchivoAdjunto2 extends ArchivoAdjunto {

	private static final long serialVersionUID = -5136090785265049804L;
	
	private int id;
	private int idTipoDocumento;
	private String descripcion;
	private Date fechaRegistro;

	/**
	 * 
	 */
	public ArchivoAdjunto2() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param nombre
	 */
	public ArchivoAdjunto2(String nombre) {
		super(nombre);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the idTipoDocumento
	 */
	public int getIdTipoDocumento() {
		return idTipoDocumento;
	}

	/**
	 * @param idTipoDocumento the idTipoDocumento to set
	 */
	public void setIdTipoDocumento(int idTipoDocumento) {
		this.idTipoDocumento = idTipoDocumento;
	}

	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the fechaRegistro
	 */
	public Date getFechaRegistro() {
		return fechaRegistro;
	}

	/**
	 * @param fechaRegistro the fechaRegistro to set
	 */
	public void setFechaRegistro(Date fechaRegistro) {
		this.fechaRegistro = fechaRegistro;
	}

}
