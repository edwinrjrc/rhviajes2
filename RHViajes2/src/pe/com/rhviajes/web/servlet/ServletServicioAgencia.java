package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import pe.com.rhviajes.web.util.UtilWeb;
import pe.com.viajes.bean.base.BaseVO;
import pe.com.viajes.bean.negocio.Cliente;
import pe.com.viajes.bean.negocio.ClienteBusqueda;
import pe.com.viajes.bean.negocio.DetalleServicioAgencia;
import pe.com.viajes.bean.negocio.Pasajero;
import pe.com.viajes.bean.negocio.ServicioAgencia;
import pe.com.viajes.bean.negocio.ServicioAgenciaBusqueda;
import pe.com.viajes.bean.negocio.Tramo;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.ejb.NegocioSessionRemote;
import pe.com.viajes.negocio.ejb.SeguridadRemote;
import pe.com.viajes.negocio.ejb.SoporteRemote;
import pe.com.viajes.negocio.ejb.UtilNegocioSessionRemote;
import pe.com.viajes.negocio.util.UtilConstantes;

/**
 * Servlet implementation class ServletServicioAgencia
 */
@WebServlet("/servlets/ServletServicioAgencia")
public class ServletServicioAgencia extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletServicioAgencia.class);
	private static final long serialVersionUID = 1L;
       
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SoporteSession!pe.com.viajes.negocio.ejb.SoporteRemote")
	private SoporteRemote soporteRemote;
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SeguridadSession!pe.com.viajes.negocio.ejb.SeguridadRemote")
	private SeguridadRemote seguridadRemote;
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/UtilNegocioSession!pe.com.viajes.negocio.ejb.UtilNegocioSessionRemote")
	private UtilNegocioSessionRemote utilNegocioSessionRemote;
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/NegocioSession!pe.com.viajes.negocio.ejb.NegocioSessionRemote")
	private NegocioSessionRemote negocioSessionRemote;
    /**
     * @see BaseServlet#BaseServlet()
     */
    public ServletServicioAgencia() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("paginas/inicio.jsp");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter respuesta = response.getWriter();
		Gson gson = new GsonBuilder().setDateFormat(UtilConstantes.PATTERN_GSON).create();
		String accion = request.getParameter("accion");
		Map<String,Object> retorno = new HashMap<String, Object>();
		try {
			if (ACCION_LISTAR.equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				ServicioAgenciaBusqueda servicioAgencia = new ServicioAgenciaBusqueda();
				SimpleDateFormat sdf = new SimpleDateFormat(UtilConstantes.PATTERN_GSON);
				servicioAgencia.setFechaDesde(sdf.parse(mapeo.get("fechaDesde").toString()));
				servicioAgencia.setFechaHasta(sdf.parse(mapeo.get("fechaHasta").toString()));
				servicioAgencia.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				List<ServicioAgencia> listado = consultaNegocioSessionRemote.listarServicioVenta(servicioAgencia);
				retorno.put("objeto", listado);
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			}
			else if (ACCION_BUSCAR.equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				ServicioAgenciaBusqueda servicioAgencia = new ServicioAgenciaBusqueda();
				servicioAgencia.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("idVenta")));
				servicioAgencia.getCliente().setNombres(UtilWeb.obtenerCadenaMapeo(mapeo.get("nombreCliente")));
				servicioAgencia.getCliente().getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("tipoDocumento")));
				servicioAgencia.getCliente().getDocumentoIdentidad().setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroDocumento")));
				SimpleDateFormat sdf = new SimpleDateFormat(UtilConstantes.PATTERN_GSON);
				servicioAgencia.setFechaDesde(sdf.parse(mapeo.get("fechaDesde").toString()));
				servicioAgencia.setFechaHasta(sdf.parse(mapeo.get("fechaHasta").toString()));
				servicioAgencia.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				List<ServicioAgencia> listado = consultaNegocioSessionRemote.listarServicioVenta(servicioAgencia);
				retorno.put("objeto", listado);
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			}
			else if ("consultarConfiguacion".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				if (mapeo.get("idTipoServicio") != null && StringUtils.isNotBlank(mapeo.get("idTipoServicio").toString())){
					Integer idTipoServicio = Double.valueOf(mapeo.get("idTipoServicio").toString()).intValue();
					retorno.put("objeto", soporteRemote.consultarConfiguracionServicio(idTipoServicio,this.obtenerIdEmpresa(request)));
					retorno.put("objeto2",consultaNegocioSessionRemote.consultarMaestroServicio(idTipoServicio, this.obtenerIdEmpresa(request)));
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				}
				else{
					retorno.put("objeto", null);
					retorno.put("objeto2",null);
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				}
			}
			else if("proveedoresXServicio".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Integer idTipoServicio = Double.valueOf(mapeo.get("idTipoServicio").toString()).intValue();
				BaseVO servicio = new BaseVO(idTipoServicio);
				servicio.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.proveedoresXServicio(servicio));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			}
			else if("consultarPasajero".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				if (mapeo.get("tipoDocumento") != null && mapeo.get("numeroDocumento") != null){
					Pasajero pasajero = new Pasajero();
					pasajero.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(Double.valueOf(mapeo.get("tipoDocumento").toString()).intValue());
					pasajero.getDocumentoIdentidad().setNumeroDocumento(mapeo.get("numeroDocumento").toString());
					pasajero.setEmpresa(this.obtenerEmpresa(request));
					retorno.put("objeto", consultaNegocioSessionRemote.consultarPasajero(pasajero));
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				}
			}
			else if ("consultarComision".equals(accion)){
				DetalleServicioAgencia detalleServicio = new DetalleServicioAgencia();
				utilNegocioSessionRemote.calculaPorcentajeComision(detalleServicio);
			}
			else if ("consultarAplicaIgv".equals(accion)){
				int idServicio = Integer.parseInt(request.getParameter("idservicio"));
				retorno.put("objeto", consultaNegocioSessionRemote.servicioAplicaIgv(idServicio, this.obtenerIdEmpresa(request)));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);	
			}
			else if ("consultarVendedores".equals(accion)){
				retorno.put("objeto", seguridadRemote.listarVendedores(this.obtenerIdEmpresa(request)));
				retorno.put("mensaje", "Vendedores cargados satisfactoriamente");
				retorno.put("exito", true);
			}
			else if("buscarCliente".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Integer tipo = 0;
				String numero = "";
				String nombres = "";
				int numpagina = 0;
				int tamaniopag = 0;
				if (mapeo != null){
					if (mapeo.get("tipoDocumento") != null && !"".equals(mapeo.get("tipoDocumento"))){
						tipo = Double.valueOf(mapeo.get("tipoDocumento").toString()).intValue();
					}
					if (mapeo.get("numeroDocumento") != null){
						numero = mapeo.get("numeroDocumento").toString();
					}
					if (mapeo.get("nombres") != null){
						nombres = mapeo.get("nombres").toString();
					}
					if (mapeo.get("tamaniopag") != null){
						tamaniopag = Double.valueOf(mapeo.get("tamaniopag").toString()).intValue();
					}
					if (mapeo.get("numpag") != null){
						numpagina = Double.valueOf(mapeo.get("numpag").toString()).intValue();
					}
				}
				ClienteBusqueda cliente = new ClienteBusqueda();
				cliente.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(tipo);
				cliente.getDocumentoIdentidad().setNumeroDocumento(numero);
				cliente.setEmpresa(this.obtenerEmpresa(request));
				cliente.setNombres(nombres);
				cliente.setTamanioPagina(tamaniopag);
				cliente.setNumeroPagina(numpagina);
				List<Cliente> lista = consultaNegocioSessionRemote.buscarCliente(cliente);
				if (lista != null && !lista.isEmpty()){
					int total = lista.get(0).getTotalRegistros();
					retorno.put("objeto", lista);
					retorno.put("paginas", ((int)total / tamaniopag));
				}
				retorno.put("mensaje", "Clientes consultados satisfactoriamente");
				retorno.put("exito", true);
			}
			else if (ACCION_GUARDAR.equals(accion)){
				Map<String, Object> mapeoServicio = UtilWeb.convertirJsonAMap(request.getParameter("servicio"));
				log.info(mapeoServicio);
				ServicioAgencia servicio = new ServicioAgencia();
				servicio.setMontoTotalComision(UtilWeb.obtenerBigDecimalMapeo(mapeoServicio.get("totalComision")));
				servicio.setMontoTotalServicios(UtilWeb.obtenerBigDecimalMapeo(mapeoServicio.get("totalServicios")));
				servicio.setMontoTotalFee(UtilWeb.obtenerBigDecimalMapeo(mapeoServicio.get("totalFee")));
				servicio.getMoneda().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeoServicio.get("monedaFacturacion")));
				Map<String, Object> mapCliente = (Map<String, Object>) mapeoServicio.get("cliente");
				servicio.getCliente().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapCliente.get("codigoEntero")));
				servicio.setFechaServicio(UtilWeb.obtenerFechaMapeo(mapeoServicio.get("fechaServicio")));
				servicio.setEmpresa(this.obtenerEmpresa(request));
				servicio.getVendedor().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeoServicio.get("codigoVendedor")));
				servicio.setUsuarioCreacion(this.obtenerUsuario(request));
				servicio.setUsuarioModificacion(this.obtenerUsuario(request));
				servicio.setIpCreacion(this.obtenerIp(request));
				servicio.setIpModificacion(this.obtenerIp(request));
				List<Map<String, Object>> listaMapDetalle = (List<Map<String, Object>>) mapeoServicio.get("detalle");
				if (listaMapDetalle != null && !listaMapDetalle.isEmpty()){
					List<DetalleServicioAgencia> listaDetalle = new ArrayList();
					DetalleServicioAgencia detalle = null;
					List<Map<String, Object>> listaMapPasajeros = null;
					for (Map<String, Object> detalleMap : listaMapDetalle) {
						detalle = new DetalleServicioAgencia();
						detalle.setConIGV(UtilWeb.obtenerBooleanMapeo(detalleMap.get("conIgv")));
						listaMapPasajeros = (List<Map<String, Object>>) detalleMap.get("pasajeros");
						if (listaMapPasajeros != null && !listaMapPasajeros.isEmpty()){
							Pasajero pasajero = null;
							for (Map<String, Object> map : listaMapPasajeros) {
								pasajero = new Pasajero();
								pasajero.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("tipoDocumento")));
								pasajero.getDocumentoIdentidad().setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(map.get("numeroDocumento")));
								pasajero.setNombres(UtilWeb.obtenerCadenaMapeo(map.get("nombres")));
								pasajero.getNacionalidad().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("nacionalidad")));
								pasajero.setApellidoPaterno(UtilWeb.obtenerCadenaMapeo(map.get("apePaterno")));
								pasajero.setApellidoMaterno(UtilWeb.obtenerCadenaMapeo(map.get("apeMaterno")));
								pasajero.setTelefono1(UtilWeb.obtenerCadenaMapeo(map.get("telefono1")));
								pasajero.setTelefono2(UtilWeb.obtenerCadenaMapeo(map.get("telefono2")));
								pasajero.setCorreoElectronico(UtilWeb.obtenerCadenaMapeo(map.get("correoElectronico")));
								pasajero.setFechaVctoPasaporte(UtilWeb.obtenerFechaMapeo(map.get("fechaVctoPasaporte")));
								pasajero.setFechaNacimiento(UtilWeb.obtenerFechaMapeo(map.get("fechaNacimiento")));
								pasajero.getRelacion().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("codigoRelacion")));
								pasajero.getRelacion().setNombre(UtilWeb.obtenerCadenaMapeo(map.get("relacion")));
								pasajero.setNumeroPasajeroFrecuente(UtilWeb.obtenerCadenaMapeo(map.get("numPasajeroFrecuente")));
								pasajero.getAerolinea().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("aerolinea")));
								pasajero.setCodigoReserva(UtilWeb.obtenerCadenaMapeo(map.get("codigoReserva")));
								pasajero.setNumeroBoleto(UtilWeb.obtenerCadenaMapeo(map.get("numBoleto")));
								pasajero.getNacionalidad().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("nacionalidad")));
								pasajero.getPais().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("nacionalidad")));
								pasajero.setEmpresa(this.obtenerEmpresa(request));
								pasajero.setUsuarioCreacion(this.obtenerUsuario(request));
								pasajero.setUsuarioModificacion(this.obtenerUsuario(request));
								pasajero.setIpCreacion(this.obtenerIp(request));
								pasajero.setIpModificacion(this.obtenerIp(request));
								detalle.getListaPasajeros().add(pasajero);
							}
						}
						detalle.setCantidad(UtilWeb.obtenerIntMapeo(detalleMap.get("cantidad")));
						Object ruta = detalleMap.get("ruta");
						if (ruta instanceof Map){
							Map<String, Object> mapRuta = (Map<String, Object>) ruta;
							if (mapRuta != null){
								List<Map<String, Object>> mapTramos = (List<Map<String, Object>>) mapRuta.get("tramos");
								if (mapTramos != null){
									Tramo tramo = null;
									Map<String, Object> mapDestino = null;
									for (Map<String, Object> map : mapTramos) {
										tramo = new Tramo();
										mapDestino = (Map<String, Object>) map.get("origen");
										tramo.getOrigen().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapDestino.get("id")));
										tramo.getOrigen().setDescripcion(UtilWeb.obtenerCadenaMapeo(mapDestino.get("descripcion")));
										tramo.getOrigen().setCodigoIATA(UtilWeb.obtenerCadenaMapeo(mapDestino.get("codigoIATA")));
										tramo.setPrecio(UtilWeb.obtenerBigDecimalMapeo(map.get("precioTramo")));
										tramo.setFechaSalida(UtilWeb.obtenerFechaMapeo(map.get("fechaSalida")));
										mapDestino = (Map<String, Object>) map.get("destino");
										tramo.getDestino().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapDestino.get("id")));
										tramo.getDestino().setDescripcion(UtilWeb.obtenerCadenaMapeo(mapDestino.get("descripcion")));
										tramo.getDestino().setCodigoIATA(UtilWeb.obtenerCadenaMapeo(mapDestino.get("codigoIATA")));
										tramo.setFechaLlegada(UtilWeb.obtenerFechaMapeo(map.get("fechaLlegada")));
										tramo.getAerolinea().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("codigoAerolinea")));
										tramo.setEmpresa(this.obtenerEmpresa(request));
										tramo.setUsuarioCreacion(this.obtenerUsuario(request));
										tramo.setUsuarioModificacion(this.obtenerUsuario(request));
										tramo.setIpCreacion(this.obtenerIp(request));
										tramo.setIpModificacion(this.obtenerIp(request));
										detalle.getRuta().getTramos().add(tramo);
									}
									detalle.getRuta().setEmpresa(this.obtenerEmpresa(request));
									detalle.getRuta().setUsuarioCreacion(this.obtenerUsuario(request));
									detalle.getRuta().setUsuarioModificacion(this.obtenerUsuario(request));
									detalle.getRuta().setIpCreacion(this.obtenerIp(request));
									detalle.getRuta().setIpModificacion(this.obtenerIp(request));
								}
							}
						}
						detalle.getTipoServicio().setCodigoEntero(UtilWeb.obtenerIntMapeo(detalleMap.get("idTipoServicio")));
						Map<String, Object> mapTipoServicio = (Map<String, Object>) detalleMap.get("tipoServicio");
						if (mapTipoServicio != null){
							detalle.getTipoServicio().setRequiereFee(UtilWeb.obtenerBooleanMapeo(mapTipoServicio.get("requiereFee")));
							detalle.getTipoServicio().setEsFee(UtilWeb.obtenerBooleanMapeo(mapTipoServicio.get("esFee")));
							detalle.getTipoServicio().setServicioPadre(UtilWeb.obtenerBooleanMapeo(mapTipoServicio.get("servicioPadre")));
						}
						detalle.getMoneda().setCodigoEntero(UtilWeb.obtenerIntMapeo(detalleMap.get("idmoneda")));
						detalle.getServicioProveedor().setCodigoEntero(UtilWeb.obtenerIntMapeo(detalleMap.get("idProveedor")));
						Map<String, Object> mapServicioProveedor = (Map<String, Object>) detalleMap.get("servicioProveedor");
						if (mapServicioProveedor != null){
							Map<String, Object> mapProveedor = (Map<String, Object>) mapServicioProveedor.get("proveedor");
							detalle.getServicioProveedor().setNombreProveedor(UtilWeb.obtenerCadenaMapeo(mapProveedor.get("nombre")));
							detalle.getServicioProveedor().getProveedor().setCodigoEntero(detalle.getServicioProveedor().getCodigoEntero());
							detalle.getServicioProveedor().getProveedor().setNombreCompleto(detalle.getServicioProveedor().getNombreProveedor());
						}
						detalle.setPrecioUnitarioAnterior(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("precioBaseInicial")));
						detalle.setPrecioUnitario(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("precioUnitario")));
						detalle.setTotal(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("totalServicio")));
						detalle.setTipoCambio(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("tipoCambio")));
						detalle.setAplicaIGV(UtilWeb.obtenerBooleanMapeo(detalleMap.get("aplicaIgv")));
						detalle.getServicioProveedor().getComision().getTipoComision().setCodigoEntero(UtilWeb.obtenerIntMapeo(detalleMap.get("tipoComision")));
						detalle.getServicioProveedor().getComision().setValorComision(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("valorComision")));
						detalle.getServicioProveedor().getComision().setAplicaIGV(UtilWeb.obtenerBooleanMapeo(detalleMap.get("aplicaIgvComision")));
						detalle.setFechaServicio(UtilWeb.obtenerFechaMapeo(detalleMap.get("fechaServicio")));
						detalle.setFechaIda(detalle.getFechaServicio());
						detalle.setFechaRegreso(UtilWeb.obtenerFechaMapeo(detalleMap.get("fechaRegreso")));
						Map<String, Object> mapOperador = (Map<String, Object>) detalleMap.get("operador");
						if (mapOperador != null){
							detalle.getOperadora().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapOperador.get("codigoEntero")));
							detalle.getOperadora().setNombre(UtilWeb.obtenerCadenaMapeo(mapOperador.get("nombres")));
						}
						Map<String, Object> mapHotel = (Map<String, Object>) detalleMap.get("hotel");
						if (mapHotel != null){
							detalle.getHotel().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapHotel.get("codigoEntero")));
							detalle.getHotel().setNombre(UtilWeb.obtenerCadenaMapeo(mapHotel.get("nombres")));
						}
						detalle.setMontoComision(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("totalComision")));
						detalle.getServicioProveedor().getComision().setValorIGVComision(UtilWeb.obtenerBigDecimalMapeo(detalleMap.get("totalIgvComision")));
						detalle.setEmpresa(this.obtenerEmpresa(request));
						detalle.setCodigoEntero(UtilWeb.obtenerIntMapeo(detalleMap.get("codigoEntero")));
						detalle.getServicioPadre().setCodigoEntero(UtilWeb.obtenerIntMapeo(detalleMap.get("codigoServicioPadre")));
						detalle.setUsuarioCreacion(this.obtenerUsuario(request));
						detalle.setUsuarioModificacion(this.obtenerUsuario(request));
						detalle.setIpCreacion(this.obtenerIp(request));
						detalle.setIpModificacion(this.obtenerIp(request));
						detalle.setDescripcionServicio(UtilWeb.obtenerCadenaMapeo(detalleMap.get("descripcionServicio")));
						Map<String, Object> mapServicioPadre = (Map<String, Object>) detalleMap.get("servicioPadre");
						if (mapServicioPadre != null){
							detalle.getServicioPadre().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapServicioPadre.get("codigo")));
						}
						if (detalle.getTipoServicio().isServicioPadre()){
							listaDetalle = utilNegocioSessionRemote.agregarServicioVenta(servicio.getMoneda().getCodigoEntero(), listaDetalle, detalle);
						}
						else{
							listaDetalle.add(detalle);
						}
						servicio.setListaDetalleServicio(listaDetalle);
					}
				}
				BigDecimal totalIgv = BigDecimal.ZERO;
				for (DetalleServicioAgencia deta : servicio.getListaDetalleServicio()){
					deta.setUsuarioCreacion(this.obtenerUsuario(request));
					deta.setUsuarioModificacion(this.obtenerUsuario(request));
					deta.setIpCreacion(this.obtenerIp(request));
					deta.setIpModificacion(this.obtenerIp(request));
					totalIgv = totalIgv.add(deta.getMontoIGV());
				}
				servicio.setMontoTotalIGV(totalIgv);
				servicio.setMontoTotalDscto(BigDecimal.ZERO);
				servicio.setMontoSubtotal(servicio.getMontoTotalServicios().subtract(servicio.getMontoTotalDscto()));
				negocioSessionRemote.registrarVentaServicio(servicio);
				retorno.put("mensaje", "Registro Satisfactorio");
				retorno.put("exito", true);
			}
			else if ("consultarServicio".equals(accion)){
				int idServicio = Integer.parseInt(request.getParameter("idServicio"));
				int idEmpresa = this.obtenerIdEmpresa(request);
				ServicioAgencia servicioVenta = consultaNegocioSessionRemote.consultarServicioVenta(idServicio, idEmpresa);
				HttpSession session = this.obtenerSession(request);
				session.setAttribute("servicioVenta", servicioVenta);
				retorno.put("mensaje", "Consulta Satisfactoria");
				retorno.put("exito", true);
			}
			else if ("verServicio".equals(accion)){
				HttpSession session = this.obtenerSession(request);
				retorno.put("objeto", session.getAttribute("servicioVenta"));
				retorno.put("mensaje", "Consulta Satisfactoria");
				retorno.put("exito", true);
				session.removeAttribute("servicioVenta");
			}
				
		} catch (SQLException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		}
		String buffer = gson.toJson(retorno);
		System.out.println(buffer);
		respuesta.println(buffer);
	}
}
