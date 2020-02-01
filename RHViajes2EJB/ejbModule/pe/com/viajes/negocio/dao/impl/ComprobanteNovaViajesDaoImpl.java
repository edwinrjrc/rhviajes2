/**
 * 
 */
package pe.com.viajes.negocio.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import pe.com.viajes.bean.negocio.Comprobante;
import pe.com.viajes.bean.negocio.ComprobanteBusqueda;
import pe.com.viajes.bean.negocio.DetalleComprobante;
import pe.com.viajes.negocio.dao.ComprobanteNovaViajesDao;
import pe.com.viajes.negocio.util.UtilConexion;
import pe.com.viajes.negocio.util.UtilEjb;
import pe.com.viajes.negocio.util.UtilJdbc;

/**
 * @author Edwin
 *
 */
public class ComprobanteNovaViajesDaoImpl implements ComprobanteNovaViajesDao {

	/*
	 * (non-Javadoc)
	 * 
	 * @see pe.com.viajes.negocio.dao.ComprobanteNovaViajesDao#
	 * registrarComprobanteAdicional(pe.com.viajes.bean.negocio.Comprobante,
	 * java.sql.Connection)
	 */
	@Override
	public Integer registrarComprobanteAdicional(Comprobante comprobante,
			Connection conn) throws SQLException {
		Integer resultado = 0;
		CallableStatement cs = null;
		String sql = "{ ? = call negocio.fn_ingresarcomprobanteadicional(?,?,?,?,?,?,?,?,?,?,?)}";
		try {
			cs = conn.prepareCall(sql);
			int i = 1;
			cs.registerOutParameter(i++, Types.INTEGER);
			cs.setInt(i++, comprobante.getEmpresa().getCodigoEntero().intValue());
			cs.setInt(i++, comprobante.getIdServicio().intValue());
			cs.setInt(i++, comprobante.getTipoComprobante().getCodigoEntero()
					.intValue());
			cs.setString(i++, comprobante.getNumeroComprobante());
			cs.setInt(i++, comprobante.getTitular().getCodigoEntero()
					.intValue());
			cs.setString(i++, comprobante.getDetalleTextoComprobante());
			cs.setDate(i++, UtilJdbc.convertirUtilDateSQLDate(comprobante
					.getFechaComprobante()));
			cs.setBigDecimal(i++, comprobante.getTotalIGV());
			cs.setBigDecimal(i++, comprobante.getTotalComprobante());

			cs.setInt(i++, comprobante.getUsuarioCreacion().getCodigoEntero().intValue());
			cs.setString(i++, comprobante.getIpCreacion());

			cs.execute();

			resultado = cs.getInt(1);
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (cs != null) {
					cs.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return resultado;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see pe.com.viajes.negocio.dao.ComprobanteNovaViajesDao#
	 * listarComprobantesAdicionales(java.lang.Integer)
	 */
	@Override
	public Integer listarComprobantesAdicionales(Integer idServicio)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see pe.com.viajes.negocio.dao.ComprobanteNovaViajesDao#
	 * eliminarComprobantesAdicionales(java.lang.Integer)
	 */
	@Override
	public Integer eliminarComprobantesAdicionales(Integer idServicio)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comprobante> consultarComprobantes(
			ComprobanteBusqueda comprobanteBusqueda) throws SQLException {
		List<Comprobante> resultado = null;
		Connection conn = null;
		CallableStatement cs = null;
		ResultSet rs = null;
		String sql = "";
		try {
			sql = "{ ? = call negocio.fn_consultarcomprobantesgenerados(?,?,?,?,?,?,?,?)}";
			conn = UtilConexion.obtenerConexion();
			cs = conn.prepareCall(sql);
			cs.registerOutParameter(1, Types.OTHER);
			cs.setInt(2, comprobanteBusqueda.getEmpresa().getCodigoEntero().intValue());
			if (comprobanteBusqueda.getCodigoEntero() != null
					&& comprobanteBusqueda.getCodigoEntero().intValue() != 0) {
				cs.setInt(3, comprobanteBusqueda.getCodigoEntero().intValue());
			} else {
				cs.setNull(3, Types.INTEGER);
			}
			if (comprobanteBusqueda.getIdServicio() != null
					&& comprobanteBusqueda.getIdServicio().intValue() != 0) {
				cs.setInt(4, comprobanteBusqueda.getIdServicio().intValue());
			} else {
				cs.setNull(4, Types.INTEGER);
			}
			if (comprobanteBusqueda.getTitular().getCodigoEntero() != null
					&& comprobanteBusqueda.getTitular().getCodigoEntero()
							.intValue() != 0) {
				cs.setInt(5, comprobanteBusqueda.getTitular()
						.getCodigoEntero().intValue());
			} else {
				cs.setNull(5, Types.INTEGER);
			}
			if (comprobanteBusqueda.getTipoComprobante().getCodigoEntero() != null
					&& comprobanteBusqueda.getTipoComprobante()
							.getCodigoEntero().intValue() != 0) {
				cs.setInt(6, comprobanteBusqueda.getTipoComprobante()
						.getCodigoEntero().intValue());
			} else {
				cs.setNull(6, Types.INTEGER);
			}
			if (StringUtils.isNotBlank(comprobanteBusqueda
					.getNumeroComprobante())) {
				cs.setString(7, comprobanteBusqueda.getNumeroComprobante());
			} else {
				cs.setNull(7, Types.VARCHAR);
			}
			if (comprobanteBusqueda.getFechaDesde() != null) {
				cs.setDate(8, UtilJdbc
						.convertirUtilDateSQLDate(comprobanteBusqueda
								.getFechaDesde()));
			} else {
				cs.setNull(8, Types.DATE);
			}
			if (comprobanteBusqueda.getFechaHasta() != null) {
				cs.setDate(9, UtilJdbc
						.convertirUtilDateSQLDate(comprobanteBusqueda
								.getFechaHasta()));
			} else {
				cs.setNull(9, Types.DATE);
			}

			cs.execute();
			rs = (ResultSet) cs.getObject(1);

			resultado = new ArrayList<Comprobante>();
			Comprobante comprobante = null;
			while (rs.next()) {
				comprobante = new Comprobante();
				comprobante.setCodigoEntero(UtilJdbc.obtenerNumero(rs, "id"));
				comprobante.setIdServicio(UtilJdbc.obtenerNumero(rs, "idservicio"));
				comprobante.getTipoComprobante().setCodigoEntero(
						UtilJdbc.obtenerNumero(rs, "idtipocomprobante"));
				comprobante.getTipoComprobante().setNombre(
						UtilJdbc.obtenerCadena(rs, "nombre"));
				comprobante.setNumeroSerie(UtilJdbc.obtenerCadena(rs,
						"numserie"));
				comprobante.setNumeroComprobante(UtilJdbc.obtenerCadena(rs,
						"numerocomprobante"));
				comprobante.getTitular().setCodigoEntero(
						UtilJdbc.obtenerNumero(rs, "idtitular"));
				comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(UtilJdbc.obtenerNumero(rs, "idtipodocumento"));
				comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento().setNombre(UtilJdbc.obtenerCadena(rs, "nombretipodoc"));
				comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento().setAbreviatura(UtilJdbc.obtenerCadena(rs, "abretipodoc"));
				comprobante.getTitular().getDocumentoIdentidad().setNumeroDocumento(UtilJdbc.obtenerCadena(rs, "numerodocumento"));
				comprobante.getTitular().setNombres(
						UtilJdbc.obtenerCadena(rs, "nombres"));
				comprobante.getTitular().setApellidoPaterno(
						UtilJdbc.obtenerCadena(rs, "apellidopaterno"));
				comprobante.getTitular().setApellidoMaterno(
						UtilJdbc.obtenerCadena(rs, "apellidomaterno"));
				comprobante.getTitular().setNombreCompleto(UtilEjb.parseaCadena(comprobante.getTitular().getNombres())+" "+UtilEjb.parseaCadena(comprobante.getTitular().getApellidoPaterno())+" "+UtilEjb.parseaCadena(comprobante.getTitular().getApellidoMaterno()));
				comprobante.getTitular().setNombreCompleto(StringUtils.normalizeSpace(comprobante.getTitular().getNombreCompleto()));
				comprobante.setFechaComprobante(UtilJdbc.obtenerFecha(rs,
						"fechacomprobante"));
				comprobante.getMoneda().setCodigoEntero(UtilJdbc.obtenerNumero(rs, "idmoneda"));
				comprobante.getMoneda().setNombre(UtilJdbc.obtenerCadena(rs, "nombremoneda"));
				comprobante.getMoneda().setAbreviatura(UtilJdbc.obtenerCadena(rs, "abreviatura"));
				comprobante.setSubTotal(UtilJdbc.obtenerBigDecimal(rs, "subtotalcomprobante"));
				comprobante.setTotalIGV(UtilJdbc.obtenerBigDecimal(rs, "totaligv"));
				comprobante.setTotalComprobante(UtilJdbc.obtenerBigDecimal(rs,
						"totalcomprobante"));
				comprobante.getEmpresa().setCodigoEntero(comprobanteBusqueda.getEmpresa().getCodigoEntero());
				resultado.add(comprobante);
			}
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (cs != null) {
					cs.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return resultado;
	}
	
	@Override
	public List<Comprobante> consultarComprobantes(
			ComprobanteBusqueda comprobanteBusqueda, Connection conn) throws SQLException {
		List<Comprobante> resultado = null;
		CallableStatement cs = null;
		ResultSet rs = null;
		String sql = "";
		try {
			sql = "{ ? = call negocio.fn_consultarcomprobantesgenerados(?,?,?,?,?,?,?,?)}";
			cs = conn.prepareCall(sql);
			cs.registerOutParameter(1, Types.OTHER);
			cs.setInt(2, comprobanteBusqueda.getEmpresa().getCodigoEntero().intValue());
			if (comprobanteBusqueda.getCodigoEntero() != null
					&& comprobanteBusqueda.getCodigoEntero().intValue() != 0) {
				cs.setInt(3, comprobanteBusqueda.getCodigoEntero().intValue());
			} else {
				cs.setNull(3, Types.INTEGER);
			}
			if (comprobanteBusqueda.getIdServicio() != null
					&& comprobanteBusqueda.getIdServicio().intValue() != 0) {
				cs.setInt(4, comprobanteBusqueda.getIdServicio().intValue());
			} else {
				cs.setNull(4, Types.INTEGER);
			}
			if (comprobanteBusqueda.getTitular().getCodigoEntero() != null
					&& comprobanteBusqueda.getTitular().getCodigoEntero()
							.intValue() != 0) {
				cs.setInt(5, comprobanteBusqueda.getTitular()
						.getCodigoEntero().intValue());
			} else {
				cs.setNull(5, Types.INTEGER);
			}
			if (comprobanteBusqueda.getTipoComprobante().getCodigoEntero() != null
					&& comprobanteBusqueda.getTipoComprobante()
							.getCodigoEntero().intValue() != 0) {
				cs.setInt(6, comprobanteBusqueda.getTipoComprobante()
						.getCodigoEntero().intValue());
			} else {
				cs.setNull(6, Types.INTEGER);
			}
			if (StringUtils.isNotBlank(comprobanteBusqueda
					.getNumeroComprobante())) {
				cs.setString(7, comprobanteBusqueda.getNumeroComprobante());
			} else {
				cs.setNull(7, Types.VARCHAR);
			}
			if (comprobanteBusqueda.getFechaDesde() != null) {
				cs.setDate(8, UtilJdbc
						.convertirUtilDateSQLDate(comprobanteBusqueda
								.getFechaDesde()));
			} else {
				cs.setNull(8, Types.DATE);
			}
			if (comprobanteBusqueda.getFechaHasta() != null) {
				cs.setDate(9, UtilJdbc
						.convertirUtilDateSQLDate(comprobanteBusqueda
								.getFechaHasta()));
			} else {
				cs.setNull(9, Types.DATE);
			}

			cs.execute();
			rs = (ResultSet) cs.getObject(1);

			resultado = new ArrayList<Comprobante>();
			Comprobante comprobante = null;
			while (rs.next()) {
				comprobante = new Comprobante();
				comprobante.setCodigoEntero(UtilJdbc.obtenerNumero(rs, "id"));
				comprobante.setIdServicio(UtilJdbc.obtenerNumero(rs, "idservicio"));
				comprobante.getTipoComprobante().setCodigoEntero(
						UtilJdbc.obtenerNumero(rs, "idtipocomprobante"));
				comprobante.getTipoComprobante().setNombre(
						UtilJdbc.obtenerCadena(rs, "nombre"));
				comprobante.setNumeroSerie(UtilJdbc.obtenerCadena(rs,
						"numserie"));
				comprobante.setNumeroComprobante(UtilJdbc.obtenerCadena(rs,
						"numerocomprobante"));
				comprobante.getTitular().setCodigoEntero(
						UtilJdbc.obtenerNumero(rs, "idtitular"));
				comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(UtilJdbc.obtenerNumero(rs, "idtipodocumento"));
				comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento().setNombre(UtilJdbc.obtenerCadena(rs, "nombretipodoc"));
				comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento().setAbreviatura(UtilJdbc.obtenerCadena(rs, "abretipodoc"));
				comprobante.getTitular().getDocumentoIdentidad().setNumeroDocumento(UtilJdbc.obtenerCadena(rs, "numerodocumento"));
				comprobante.getTitular().setNombres(
						UtilJdbc.obtenerCadena(rs, "nombres"));
				comprobante.getTitular().setApellidoPaterno(
						UtilJdbc.obtenerCadena(rs, "apellidopaterno"));
				comprobante.getTitular().setApellidoMaterno(
						UtilJdbc.obtenerCadena(rs, "apellidomaterno"));
				comprobante.getTitular().setNombreCompleto(UtilEjb.parseaCadena(comprobante.getTitular().getNombres())+" "+UtilEjb.parseaCadena(comprobante.getTitular().getApellidoPaterno())+" "+UtilEjb.parseaCadena(comprobante.getTitular().getApellidoMaterno()));
				comprobante.getTitular().setNombreCompleto(StringUtils.normalizeSpace(comprobante.getTitular().getNombreCompleto()));
				comprobante.setFechaComprobante(UtilJdbc.obtenerFecha(rs,
						"fechacomprobante"));
				comprobante.getMoneda().setCodigoEntero(UtilJdbc.obtenerNumero(rs, "idmoneda"));
				comprobante.getMoneda().setNombre(UtilJdbc.obtenerCadena(rs, "nombremoneda"));
				comprobante.getMoneda().setAbreviatura(UtilJdbc.obtenerCadena(rs, "abreviatura"));
				comprobante.setSubTotal(UtilJdbc.obtenerBigDecimal(rs, "subtotalcomprobante"));
				comprobante.setTotalIGV(UtilJdbc.obtenerBigDecimal(rs, "totaligv"));
				comprobante.setTotalComprobante(UtilJdbc.obtenerBigDecimal(rs,
						"totalcomprobante"));
				comprobante.setEmpresa(comprobanteBusqueda.getEmpresa());
				resultado.add(comprobante);
			}
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (cs != null) {
					cs.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return resultado;
	}

	@Override
	public List<DetalleComprobante> consultarDetalleComprobante(
			Integer idComprobante, Integer idEmpresa) throws SQLException {
		List<DetalleComprobante> resultado = null;
		Connection conn = null;
		CallableStatement cs = null;
		ResultSet rs = null;
		String sql = "";
		try {
			sql = "{ ? = call negocio.fn_consultardetallecomprobantegenerado(?,?)}";
			conn = UtilConexion.obtenerConexion();
			cs = conn.prepareCall(sql);
			cs.registerOutParameter(1, Types.OTHER);
			cs.setInt(2, idEmpresa);
			cs.setInt(3, idComprobante.intValue());

			cs.execute();
			rs = (ResultSet) cs.getObject(1);

			resultado = new ArrayList<DetalleComprobante>();
			DetalleComprobante detalleComprobante = null;
			while (rs.next()) {
				detalleComprobante = new DetalleComprobante();
				detalleComprobante.setCodigoEntero(UtilJdbc.obtenerNumero(rs,
						"id"));
				detalleComprobante.setIdServicioDetalle(UtilJdbc.obtenerNumero(rs, "idserviciodetalle"));
				detalleComprobante.setIdComprobante(UtilJdbc.obtenerNumero(rs, "idcomprobante"));
				detalleComprobante.setCantidad(UtilJdbc.obtenerNumero(rs,
						"cantidad"));
				detalleComprobante.setConcepto(UtilJdbc.obtenerCadena(rs,
						"detalleconcepto"));
				detalleComprobante.setPrecioUnitario(UtilJdbc
						.obtenerBigDecimal(rs, "preciounitario"));
				detalleComprobante.setTotalDetalle(UtilJdbc.obtenerBigDecimal(
						rs, "totaldetalle"));
				detalleComprobante.setImpresion(UtilJdbc.obtenerBoolean(rs, "impresion"));
				resultado.add(detalleComprobante);
			}
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (cs != null) {
					cs.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return resultado;
	}
	
	@Override
	public List<DetalleComprobante> consultarDetalleComprobante(
			Integer idComprobante, Integer idEmpresa, Connection conn) throws SQLException {
		List<DetalleComprobante> resultado = null;
		CallableStatement cs = null;
		ResultSet rs = null;
		String sql = "";
		try {
			sql = "{ ? = call negocio.fn_consultardetallecomprobantegenerado(?,?)}";
			cs = conn.prepareCall(sql);
			cs.registerOutParameter(1, Types.OTHER);
			cs.setInt(2, idEmpresa);
			cs.setInt(3, idComprobante.intValue());

			cs.execute();
			rs = (ResultSet) cs.getObject(1);

			resultado = new ArrayList<DetalleComprobante>();
			DetalleComprobante detalleComprobante = null;
			while (rs.next()) {
				detalleComprobante = new DetalleComprobante();
				detalleComprobante.setCodigoEntero(UtilJdbc.obtenerNumero(rs,
						"id"));
				detalleComprobante.setIdServicioDetalle(UtilJdbc.obtenerNumero(rs, "idserviciodetalle"));
				detalleComprobante.setIdComprobante(UtilJdbc.obtenerNumero(rs, "idcomprobante"));
				detalleComprobante.setCantidad(UtilJdbc.obtenerNumero(rs,
						"cantidad"));
				detalleComprobante.setConcepto(UtilJdbc.obtenerCadena(rs,
						"detalleconcepto"));
				detalleComprobante.setPrecioUnitario(UtilJdbc
						.obtenerBigDecimal(rs, "preciounitario"));
				detalleComprobante.setTotalDetalle(UtilJdbc.obtenerBigDecimal(
						rs, "totaldetalle"));
				detalleComprobante.setImpresion(UtilJdbc.obtenerBoolean(rs, "impresion"));
				resultado.add(detalleComprobante);
			}
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (cs != null) {
					cs.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return resultado;
	}

	@Override
	public Comprobante consultarObligacion(Integer idObligacion, Integer idEmpresa)
			throws SQLException {
		Comprobante comprobante = null;
		Connection conn = null;
		CallableStatement cs = null;
		ResultSet rs = null;
		String sql = "";
		try {
			sql = UtilEjb.generaSentenciaFuncion(
					"negocio.fn_consultarobligacion", 2);
			conn = UtilConexion.obtenerConexion();
			cs = conn.prepareCall(sql);
			int i = 1;
			cs.registerOutParameter(i++, Types.OTHER);
			cs.setInt(i++, idEmpresa.intValue());
			cs.setInt(i++, idObligacion.intValue());

			cs.execute();
			rs = (ResultSet) cs.getObject(1);

			if (rs.next()) {
				comprobante = new Comprobante();
				comprobante.setCodigoEntero(UtilJdbc.obtenerNumero(rs, "id"));
				comprobante.getTipoComprobante().setCodigoEntero(
						UtilJdbc.obtenerNumero(rs, "idtipocomprobante"));
				comprobante.getTipoComprobante().setNombre(
						UtilJdbc.obtenerCadena(rs, "nombre"));
				comprobante.setNumeroComprobante(UtilJdbc.obtenerCadena(rs,
						"numerocomprobante"));
				comprobante.getTitular().setCodigoEntero(
						UtilJdbc.obtenerNumero(rs, "idtitular"));
				comprobante.getTitular().setNombres(
						UtilJdbc.obtenerCadena(rs, "nombres"));
				comprobante.getTitular().setApellidoPaterno(
						UtilJdbc.obtenerCadena(rs, "apellidopaterno"));
				comprobante.getTitular().setApellidoMaterno(
						UtilJdbc.obtenerCadena(rs, "apellidomaterno"));
				comprobante.setFechaComprobante(UtilJdbc.obtenerFecha(rs,
						"fechacomprobante"));
				comprobante.setTotalComprobante(UtilJdbc.obtenerBigDecimal(rs,
						"totalcomprobante"));
				comprobante.setSaldoComprobante(UtilJdbc.obtenerBigDecimal(rs,
						"saldocomprobante"));
			}
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (cs != null) {
					cs.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return comprobante;
	}
	
	@Override
	public void actualizarDetalleMovimiento(Comprobante comprobante, int idComprobante, Connection conn) throws SQLException {
		CallableStatement cs = null;
		String sql = "";
		sql = "{ ? = call negocio.fn_actualizardetallemovimiento(?,?,?,?,?)}";
		
		try {
			List<DetalleComprobante> lista = comprobante.getDetalleComprobante();
			for (DetalleComprobante detalleComprobante : lista) {
				if (detalleComprobante.isFlagMoverDetalle()) {
					cs = conn.prepareCall(sql);
					cs.registerOutParameter(1, Types.BOOLEAN);
					cs.setInt(2, detalleComprobante.getCodigoEntero());
					cs.setInt(3, idComprobante);
					cs.setInt(4, comprobante.getEmpresa().getCodigoEntero());
					cs.setInt(5, detalleComprobante.getUsuarioModificacion().getCodigoEntero());
					cs.setString(6, detalleComprobante.getIpModificacion());

					cs.execute();
					cs.close();
				}
			}
			
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (cs != null) {
					cs.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		
	}
	
	@Override
	public int consultarOtroComprobanteServicio(int idServicio, int idEmpresa, int idNoComprobante, Connection conn) throws SQLException {
		int resultado = 0;
		CallableStatement cs = null;
		String sql = "";
		sql = "{ ? = call negocio.fn_consultaOtroComprobante(?,?,?)}";
		try {
			cs = conn.prepareCall(sql);
			cs.registerOutParameter(1, Types.INTEGER);
			cs.setInt(2, idServicio);
			cs.setInt(3, idEmpresa);
			cs.setInt(4, idNoComprobante);
			
			cs.execute();
			resultado = cs.getInt(1);
			return resultado;
		} finally {
			try {
				if (cs != null) {
					cs.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
	}
	
	@Override
	public boolean actualizarDatosComprobante(Comprobante comprobante, Connection conn) throws SQLException {
		boolean resultado = false;
		CallableStatement cs = null;
		String sql = "";
		sql = "{ ? = call negocio.fn_actualizardatoscomprobante(?,?,?,?)}";
		
		try {
			cs = conn.prepareCall(sql);
			cs.registerOutParameter(1, Types.BOOLEAN);
			cs.setInt(2, comprobante.getEmpresa().getCodigoEntero());
			cs.setInt(3, comprobante.getIdServicio());
			cs.setInt(4, comprobante.getUsuarioModificacion().getCodigoEntero());
			cs.setString(5, comprobante.getIpModificacion());

			cs.execute();
			resultado = cs.getBoolean(1);
		} catch (SQLException e) {
			throw new SQLException(e);
		} finally {
			try {
				if (cs != null) {
					cs.close();
				}
			} catch (SQLException e) {
				throw new SQLException(e);
			}
		}
		return resultado;
	}

}
