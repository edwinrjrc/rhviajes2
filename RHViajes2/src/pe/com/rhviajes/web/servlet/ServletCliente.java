package pe.com.rhviajes.web.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
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

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import pe.com.rhviajes.web.util.UtilWeb;
import pe.com.viajes.bean.negocio.ArchivoAdjunto2;
import pe.com.viajes.bean.negocio.Cliente;
import pe.com.viajes.bean.negocio.Contacto;
import pe.com.viajes.bean.negocio.Direccion;
import pe.com.viajes.bean.negocio.Telefono;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

/**
 * Servlet implementation class ServletCliente
 */
@WebServlet("/servlets/ServletCliente")
public class ServletCliente extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletServicioAgencia.class);
	private static final long serialVersionUID = 1L;

	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;

	private int MEMORY_THRESHOLD = 50 * 1024;
	private int MAX_FILE_SIZE = 1024 * 1024 * 5;
	private int MAX_REQUEST_SIZE = 1024 * 1024 * 5 * 5;

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
		response.setContentType("text/html; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter respuesta = response.getWriter();
		Gson gson = new GsonBuilder().setDateFormat(UtilWeb.PATTERN_GSON).create();
		String accion = request.getParameter("accion");
		Map<String, Object> retorno = new HashMap<String, Object>();
		try {
			if (ACCION_LISTAR.equals(accion)) {
				Cliente cliente = new Cliente();
				cliente.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.consultarCliente2(cliente));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			} else if (ACCION_BUSCAR.equals(accion)) {
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Cliente cliente = new Cliente();
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
				cliente.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.consultarCliente2(cliente));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			} else if ("cargaArchivo".equals(accion)) {
				HttpSession session = request.getSession(false);
				List<ArchivoAdjunto2> adjuntos = (List<ArchivoAdjunto2>) session.getAttribute("listaAdjuntosCliente");
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
						adjuntos = new ArrayList<ArchivoAdjunto2>();
					}
					ArchivoAdjunto2 adjunto = new ArchivoAdjunto2();
					adjunto.setIdTipoDocumento(Double.valueOf(idtipodocumento).intValue());
					adjunto.setDescripcion(descripcion);
					adjunto.setNombreArchivo(nombreArchivo);
					adjunto.setId(adjuntos.size()+1);
					adjunto.setDatos(bytesArchivo);
					adjunto.setContent(content);
					adjuntos.add(adjunto);
					is.close();
					session.setAttribute("listaAdjuntosCliente", adjuntos);
				}
				retorno.put("objeto", adjuntos);
				retorno.put("mensaje", "Adjunto agregado satisfactoriamente");
				retorno.put("exito", true);
			} else if (ACCION_GUARDAR.equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("cliente"));
				SimpleDateFormat sdf = new SimpleDateFormat(UtilWeb.PATTERN_GSON);
				Cliente cliente = new Cliente();
				Double val = Double.valueOf(UtilWeb.parseDouble(UtilWeb.obtenerCadenaMapeo(mapeo.get("tipoDocumento"))));
				cliente.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(val.intValue());
				cliente.getDocumentoIdentidad().getTipoDocumento().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("tipoDocumento")));
				cliente.getDocumentoIdentidad().setNumeroDocumento(mapeo.get("numeroDocumento").toString());
				cliente.setNombres(UtilWeb.obtenerCadenaMapeo(mapeo.get("nombres")));
				cliente.setApellidoPaterno(UtilWeb.obtenerCadenaMapeo(mapeo.get("apellidoPaterno")));
				cliente.setApellidoMaterno(UtilWeb.obtenerCadenaMapeo(mapeo.get("apellidoMaterno")));
				cliente.getEstadoCivil().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("idEstadoCivil")));
				val = Double.valueOf(UtilWeb.parseDouble(UtilWeb.obtenerCadenaMapeo(mapeo.get("idEstadoCivil"))));
				cliente.getEstadoCivil().setCodigoEntero(val.intValue());
				cliente.getGenero().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("idGenero")));
				cliente.getGenero().setCodigoCadena(UtilWeb.obtenerCadenaMapeo(mapeo.get("idGenero")));
				cliente.setFechaNacimiento(sdf.parse(UtilWeb.obtenerCadenaMapeo(mapeo.get("fechaNacimiento"))));
				cliente.setNroPasaporte(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroPasaporte")));
				cliente.setFechaVctoPasaporte(sdf.parse(UtilWeb.obtenerCadenaMapeo(mapeo.get("fechaVctoPasaporte"))));
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
						direccion.getUbigeo().setNombre(UtilWeb.obtenerCadenaMapeo(map.get("ubigeo")));
						val = Double.valueOf(UtilWeb.parseDouble(UtilWeb.obtenerCadenaMapeo(mapeo.get("idVia"))));
						direccion.getVia().setCodigoEntero(val.intValue());
						direccion.getVia().setNombre(UtilWeb.obtenerCadenaMapeo(mapeo.get("nombreVia")));
						direccion.setNumero(UtilWeb.obtenerCadenaMapeo(mapeo.get("numero")));
						direccion.setInterior(UtilWeb.obtenerCadenaMapeo(mapeo.get("interior")));
						direccion.setReferencia(UtilWeb.obtenerCadenaMapeo(mapeo.get("referencia")));
						direccion.setObservaciones(UtilWeb.obtenerCadenaMapeo(mapeo.get("observaciones")));
						direccion.setDireccion(UtilWeb.obtenerCadenaMapeo(mapeo.get("direccion")));
						
						List<Map<String, Object>> listaTelefonos = (List<Map<String, Object>>) map.get("listaTelefonos");
						if (listaTelefonos != null && !listaTelefonos.isEmpty()){
							Telefono telefono = null;
							for (Map<String, Object> map2 : listaTelefonos) {
								telefono = new Telefono();
								telefono.setNumeroTelefono(UtilWeb.obtenerCadenaMapeo(map2.get("numTelefono")));
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
						
						List<Map<String, Object>> listaTelefonos = (List<Map<String, Object>>) map.get("listaTelefonos");
						if (listaTelefonos != null && !listaTelefonos.isEmpty()){
							Telefono telefono = null;
							for (Map<String, Object> map2 : listaTelefonos) {
								telefono = new Telefono();
								telefono.setNumeroTelefono(UtilWeb.obtenerCadenaMapeo(map2.get("numTelefono")));
								contacto.getListaTelefonos().add(telefono);
							}
						}
					}
				}
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
	}
}
