/**
 * 
 */
package pe.com.viajes.negocio.dao;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import pe.com.viajes.bean.negocio.Comprobante;
import pe.com.viajes.bean.negocio.ComprobanteBusqueda;
import pe.com.viajes.bean.negocio.DetalleComprobante;

/**
 * @author Edwin
 *
 */
public interface ComprobanteNovaViajesDao {

	public Integer registrarComprobanteAdicional(Comprobante comprobante, Connection conn) throws SQLException;
	public Integer listarComprobantesAdicionales(Integer idServicio) throws SQLException;
	public Integer eliminarComprobantesAdicionales(Integer idServicio) throws SQLException;
	public List<Comprobante> consultarComprobantes(ComprobanteBusqueda comprobanteBusqueda) throws SQLException;
	List<DetalleComprobante> consultarDetalleComprobante(Integer idComprobante, Integer idEmpresa) throws SQLException;
	Comprobante consultarObligacion(Integer idObligacion, Integer idEmpresa) throws SQLException;
	void actualizarDetalleMovimiento(Comprobante comprobante, int idComprobante, Connection conn) throws SQLException;
	int consultarOtroComprobanteServicio(int idServicio, int idEmpresa, int idNoComprobante, Connection conn) throws SQLException;
	boolean actualizarDatosComprobante(Comprobante comprobante, Connection conn) throws SQLException;
	List<Comprobante> consultarComprobantes(ComprobanteBusqueda comprobanteBusqueda, Connection conn) throws SQLException;
	List<DetalleComprobante> consultarDetalleComprobante(Integer idComprobante, Integer idEmpresa, Connection conn) throws SQLException;

}
