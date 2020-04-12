package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import pe.com.rhviajes.web.util.UtilWeb;
import pe.com.viajes.bean.negocio.Cliente;
import pe.com.viajes.bean.negocio.Contacto;
import pe.com.viajes.bean.negocio.Direccion;
import pe.com.viajes.bean.negocio.DocumentoAdicional;
import pe.com.viajes.bean.negocio.Telefono;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.ejb.NegocioSessionRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;
import pe.com.viajes.negocio.util.UtilConstantes;

/**
 * Servlet implementation class ServletCliente
 */
@WebServlet("/servlets/ServletCliente")
public class ServletCliente extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletServicioAgencia.class);
	private static final long serialVersionUID = 1L;

	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/NegocioSession!pe.com.viajes.negocio.ejb.NegocioSessionRemote")
	private NegocioSessionRemote negocioSessionRemote;

	/**
	 * @see BaseServlet#BaseServlet()
	 */
	public ServletCliente() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendRedirect("paginas/inicio.jsp");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		log.debug("Inicio doPost");
		response.setContentType("text/html; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter respuesta = response.getWriter();
		Gson gson = new GsonBuilder().setDateFormat(UtilConstantes.PATTERN_GSON).create();
		String accion = request.getParameter("accion");
		Map<String, Object> retorno = new HashMap<String, Object>();
		try {
			if (ACCION_LISTAR.equals(accion)) {
				Properties parametrosSistema = (Properties) getServletContext().getAttribute("parametrosSistema");
				Cliente cliente = new Cliente();
				cliente.setNumPagina(UtilWeb.convertirStringAInteger(request.getParameter("numPagina")));
				cliente.setTamPagina(UtilWeb.convertirStringAInteger(parametrosSistema.get("pe.com.rhviajes.web.tampagina").toString()));
				cliente.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.consultarCliente3(cliente));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			} else if (ACCION_BUSCAR.equals(accion)) {
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Cliente cliente = null;
				if (mapeo != null) {
					cliente = new Cliente();
					if (mapeo.get("tipoDocumento") != null) {
						cliente.getDocumentoIdentidad().getTipoDocumento()
								.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("tipoDocumento")));
					}
					if (mapeo.get("numeroDocumento") != null) {
						cliente.getDocumentoIdentidad()
								.setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroDocumento")));
					}
					if (mapeo.get("nombreCliente") != null) {
						cliente.setNombres(UtilWeb.obtenerCadenaMapeo(mapeo.get("nombreCliente")));
					}
					Properties parametrosSistema = (Properties) getServletContext().getAttribute("parametrosSistema");
					cliente.setNumPagina(UtilWeb.convertirStringAInteger(request.getParameter("numPagina")));
					cliente.setTamPagina(UtilWeb.convertirStringAInteger(parametrosSistema.get("pe.com.rhviajes.web.tampagina").toString()));
					cliente.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
					retorno.put("objeto", consultaNegocioSessionRemote.consultarCliente3(cliente));
				}
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			} else if ("cargaArchivo".equals(accion)) {
				HttpSession session = request.getSession(false);
				List<DocumentoAdicional> adjuntos = (List<DocumentoAdicional>) session.getAttribute("listaAdjuntosCliente");
				String nombreArchivo = "";
				if (request.getHeader("Content-Type") != null
						&& request.getHeader("Content-Type").startsWith("multipart/form-data")) {
					ServletFileUpload upload = new ServletFileUpload();
					FileItemIterator iterator = upload.getItemIterator(request);
					byte[] bytesArchivo = null;
					InputStream is = null;
					String content = "";
					while (iterator.hasNext()) {
						FileItemStream item = iterator.next();
						if ("file".equals(item.getFieldName())){
							is = item.openStream();
							nombreArchivo = item.getName();
							bytesArchivo = IOUtils.toByteArray(is);
							content = item.getContentType();
							/*archivoSalida = new File("D:\\"+item.getName());
							out = new FileOutputStream(archivoSalida);
							out.write(bytesArchivo);
							out.flush();
							out.close();
							is.close();*/
						}
					}
					
					String parametros = request.getParameter("adjunto");
					Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(parametros);
					String idtipodocumento = mapeo.get("idtipodocumento").toString();
					String descripcion = UtilWeb.obtenerCadenaMapeo(mapeo.get("descripcion"));
					
					if (adjuntos == null){
						adjuntos = new ArrayList<DocumentoAdicional>();
					}
					DocumentoAdicional adjunto = new DocumentoAdicional();
					adjunto.getDocumento().setCodigoEntero(Double.valueOf(idtipodocumento).intValue());
					adjunto.setDescripcionArchivo(descripcion);
					adjunto.getArchivo().setNombreArchivo(nombreArchivo);
					String extension = nombreArchivo.substring(nombreArchivo.indexOf(".")+1);
					adjunto.getArchivo().setExtensionArchivo(extension);
					adjunto.setCodigoEntero(adjuntos.size()+1);
					adjunto.getArchivo().setDatos(bytesArchivo);
					adjunto.getArchivo().setTipoContenido(content);
					adjuntos.add(adjunto);
					is.close();
					session.setAttribute("listaAdjuntosCliente", adjuntos);
				}
				retorno.put("objeto", adjuntos);
				retorno.put("mensaje", "Adjunto agregado satisfactoriamente");
				retorno.put("exito", true);
			} else if (ACCION_GUARDAR.equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("cliente"));
				Cliente cliente = new Cliente();
				Double val = Double.valueOf(UtilWeb.parseDouble(UtilWeb.obtenerCadenaMapeo(mapeo.get("tipoDocumento"))));
				cliente.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("codigoEntero")));
				cliente.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(val.intValue());
				cliente.getDocumentoIdentidad().getTipoDocumento().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("tipoDocumento")));
				cliente.getDocumentoIdentidad().setNumeroDocumento(mapeo.get("numeroDocumento").toString());
				cliente.setNombres(UtilWeb.obtenerCadenaMapeo(mapeo.get("nombres")));
				cliente.setApellidoPaterno(UtilWeb.obtenerCadenaMapeo(mapeo.get("apellidoPaterno")));
				cliente.setApellidoMaterno(UtilWeb.obtenerCadenaMapeo(mapeo.get("apellidoMaterno")));
				cliente.getEstadoCivil().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("idEstadoCivil")));
				cliente.getEstadoCivil().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("idEstadoCivil")));
				cliente.getGenero().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("idGenero")));
				cliente.setFechaNacimiento(UtilWeb.obtenerFechaMapeo(mapeo.get("fechaNacimiento")));
				cliente.setNroPasaporte(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroPasaporte")));
				cliente.setFechaVctoPasaporte(UtilWeb.obtenerFechaMapeo(mapeo.get("fechaVctoPasaporte")));
				cliente.getNacionalidad().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("idPais")));
				cliente.getNacionalidad().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("idPais")));
				cliente.setEmpresa(this.obtenerEmpresa(request));
				cliente.setUsuarioCreacion(this.obtenerUsuario(request));
				cliente.setUsuarioModificacion(this.obtenerUsuario(request));
				cliente.setIpCreacion(this.obtenerIp(request));
				cliente.setIpModificacion(this.obtenerIp(request));
				List<Map<String, Object>> listaDirecciones =  (List<Map<String, Object>>) mapeo.get("listaDirecciones");
				if (listaDirecciones != null && !listaDirecciones.isEmpty()){
					Direccion direccion = null;
					for (Map<String, Object> map : listaDirecciones) {
						direccion = new Direccion();
						direccion.setEmpresa(this.obtenerEmpresa(request));
						direccion.setUsuarioCreacion(this.obtenerUsuario(request));
						direccion.setUsuarioModificacion(this.obtenerUsuario(request));
						direccion.setIpCreacion(this.obtenerIp(request));
						direccion.setIpModificacion(this.obtenerIp(request));
						direccion.getUbigeo().getDepartamento().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(map.get("idDepartamento")));
						direccion.getUbigeo().getProvincia().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(map.get("idProvincia")));
						direccion.getUbigeo().getDistrito().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(map.get("idDistrito")));
						String codigoUbigeo = UtilWeb.obtenerCadenaMapeo(map.get("idDepartamento"))+UtilWeb.obtenerCadenaMapeo(map.get("idProvincia"))+UtilWeb.obtenerCadenaMapeo(map.get("idDistrito"));
						direccion.getUbigeo().setCodigoCadena(codigoUbigeo);
						direccion.getUbigeo().setCodigoEntero(UtilWeb.convertirStringAInteger(codigoUbigeo));
						direccion.getUbigeo().setNombre(UtilWeb.obtenerCadenaMapeo(map.get("ubigeo")));
						direccion.getPais().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("idPais")));
						direccion.getPais().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(map.get("idPais")));
						val = Double.valueOf(UtilWeb.parseDouble(UtilWeb.obtenerCadenaMapeo(map.get("idVia"))));
						direccion.getVia().setCodigoEntero(val.intValue());
						direccion.setNombreVia(UtilWeb.obtenerCadenaMapeo(map.get("nombreVia")));
						direccion.setNumero(UtilWeb.obtenerCadenaMapeo(map.get("numero")));
						direccion.setInterior(UtilWeb.obtenerCadenaMapeo(map.get("interior")));
						direccion.setManzana(UtilWeb.obtenerCadenaMapeo(map.get("manzana")));
						direccion.setLote(UtilWeb.obtenerCadenaMapeo(map.get("lote")));
						direccion.setReferencia(UtilWeb.obtenerCadenaMapeo(map.get("referencia")));
						direccion.setObservaciones(UtilWeb.obtenerCadenaMapeo(map.get("observaciones")));
						direccion.setDireccion(UtilWeb.obtenerCadenaMapeo(map.get("direccion")));
						direccion.setPrincipal(UtilWeb.obtenerBooleanMapeo(map.get("esPrincipal")));
						
						List<Map<String, Object>> listaTelefonos = (List<Map<String, Object>>) map.get("listaTelefonos");
						if (listaTelefonos != null && !listaTelefonos.isEmpty()){
							Telefono telefono = null;
							for (Map<String, Object> map2 : listaTelefonos) {
								telefono = new Telefono();
								telefono.setNumeroTelefono(UtilWeb.obtenerCadenaMapeo(map2.get("numero")));
								telefono.setUsuarioCreacion(this.obtenerUsuario(request));
								telefono.setUsuarioModificacion(this.obtenerUsuario(request));
								telefono.setIpCreacion(this.obtenerIp(request));
								telefono.setIpModificacion(this.obtenerIp(request));
								telefono.setEmpresa(this.obtenerEmpresa(request));
								telefono.getEmpresaOperadora().setCodigoEntero(1);
								direccion.getTelefonos().add(telefono);
							}
						}
						cliente.getListaDirecciones().add(direccion);
					}
				}
				List<Map<String, Object>> listaContactos = (List<Map<String, Object>>) mapeo.get("listaContactos");
				if (listaContactos != null && !listaContactos.isEmpty()){
					Contacto contacto = null;
					for (Map<String, Object> map : listaContactos) {
						contacto = new Contacto();
						contacto.getDocumentoIdentidad().getTipoDocumento().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(map.get("idtipodocumento")));
						contacto.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("idtipodocumento")));
						contacto.getDocumentoIdentidad().setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(map.get("numeroDocumento")));
						contacto.setApellidoPaterno(UtilWeb.obtenerCadenaMapeo(map.get("apellidoPaterno")));
						contacto.setApellidoMaterno(UtilWeb.obtenerCadenaMapeo(map.get("apellidoMaterno")));
						contacto.setNombres(UtilWeb.obtenerCadenaMapeo(map.get("nombres")));
						contacto.getArea().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(map.get("area")));
						contacto.getArea().setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("area")));
						contacto.setAnexo(UtilWeb.obtenerCadenaMapeo(map.get("anexo")));
						contacto.setUsuarioCreacion(this.obtenerUsuario(request));
						contacto.setUsuarioModificacion(this.obtenerUsuario(request));
						contacto.setIpCreacion(this.obtenerIp(request));
						contacto.setIpModificacion(this.obtenerIp(request));
						contacto.setEmpresa(this.obtenerEmpresa(request));
						
						List<Map<String, Object>> listaTelefonos = (List<Map<String, Object>>) map.get("listaTelefonos");
						if (listaTelefonos != null && !listaTelefonos.isEmpty()){
							Telefono telefono = null;
							for (Map<String, Object> map2 : listaTelefonos) {
								telefono = new Telefono();
								telefono.setNumeroTelefono(UtilWeb.obtenerCadenaMapeo(map2.get("numero")));
								telefono.setUsuarioCreacion(this.obtenerUsuario(request));
								telefono.setUsuarioModificacion(this.obtenerUsuario(request));
								telefono.setIpCreacion(this.obtenerIp(request));
								telefono.setIpModificacion(this.obtenerIp(request));
								telefono.setEmpresa(this.obtenerEmpresa(request));
								telefono.getEmpresaOperadora().setCodigoEntero(1);
								contacto.getListaTelefonos().add(telefono);
							}
						}
						cliente.getListaContactos().add(contacto);
					}
				}
				HttpSession session = request.getSession(false);
				cliente.setListaAdjuntos((List<DocumentoAdicional>) session.getAttribute("listaAdjuntosCliente"));
				if (cliente.getCodigoEntero() == null || cliente.getCodigoEntero().intValue() == 0) {
					retorno.put("mensaje", "Registrado Correctamente");
					retorno.put("exito", negocioSessionRemote.registrarCliente(cliente));
				}
				else {
					retorno.put("mensaje", "Actualizado Correctamente");
					retorno.put("exito", negocioSessionRemote.actualizarCliente(cliente));
				}
			}
			else if ("consultaCliente".equals(accion)) {
				String codigoCliente = request.getParameter("codigoCliente");
				Cliente cliente = consultaNegocioSessionRemote.consultarCliente(UtilWeb.convertirStringAInteger(codigoCliente), this.obtenerIdEmpresa(request));
				HttpSession session = this.obtenerSession(request);
				session.setAttribute("infoCliente", cliente);
				
				retorno.put("mensaje", "Consulta Exitosa");
				retorno.put("exito", true);
			}
			else if ("consultarInfoCliente".equals(accion)) {
				HttpSession session = this.obtenerSession(request);
				Cliente cliente = (Cliente) session.getAttribute("infoCliente");
				
				retorno.put("objeto", cliente);
				retorno.put("mensaje", "Consulta de Cliente");
				retorno.put("exito", true);
				session.removeAttribute("infoCliente");
			}
		} catch (ErrorConsultaDataException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
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
		respuesta.println(buffer);
		log.debug("Fin doPost");
	}
}
