package pe.com.rhviajes.web.servlet;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.ejb.EJB;
import javax.imageio.ImageIO;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimplePdfExporterConfiguration;
import pe.com.rhviajes.web.util.UtilConvertirNumeroLetras;
import pe.com.rhviajes.web.util.UtilWeb;
import pe.com.viajes.bean.negocio.Cliente;
import pe.com.viajes.bean.negocio.Comprobante;
import pe.com.viajes.bean.negocio.ComprobanteBusqueda;
import pe.com.viajes.bean.negocio.DetalleComprobante;
import pe.com.viajes.bean.negocio.DetalleServicioAgencia;
import pe.com.viajes.bean.negocio.Direccion;
import pe.com.viajes.bean.negocio.Pasajero;
import pe.com.viajes.bean.negocio.Usuario;
import pe.com.viajes.bean.util.UtilProperties;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.ejb.UtilNegocioSessionRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

/**
 * Servlet implementation class ServletComprobante
 */
@WebServlet("/servlets/ServletComprobante")
public class ServletComprobante extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletComprobante.class);
	private static final long serialVersionUID = 1L;

	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/UtilNegocioSession!pe.com.viajes.negocio.ejb.UtilNegocioSessionRemote")
	private UtilNegocioSessionRemote utilNegocioSessionRemote;
	

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ServletComprobante() {
		super();
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
		Connection conn = null;
		try {
			Comprobante comprobante = null;
			if ("consulta".equals(accion)) {
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				ComprobanteBusqueda comprobanteBusqueda = new ComprobanteBusqueda();
				comprobanteBusqueda.getTitular().getDocumentoIdentidad().getTipoDocumento()
						.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("tipoDocumento")));
				comprobanteBusqueda.getTitular().getDocumentoIdentidad()
						.setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroDocumento")));
				comprobanteBusqueda.getTipoComprobante()
						.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("tipoComprobante")));
				comprobanteBusqueda.setNumeroComprobante(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroComprobante")));
				comprobanteBusqueda
						.setFechaDesde(UtilWeb.obtenerFechaMapeo(UtilWeb.obtenerCadenaMapeo(mapeo.get("fechaDesde"))));
				comprobanteBusqueda
						.setFechaHasta(UtilWeb.obtenerFechaMapeo(UtilWeb.obtenerCadenaMapeo(mapeo.get("fechaHasta"))));
				comprobanteBusqueda.setUsuarioCreacion(this.obtenerUsuario(request));
				comprobanteBusqueda.setUsuarioModificacion(this.obtenerUsuario(request));
				comprobanteBusqueda.setIpCreacion(this.obtenerIp(request));
				comprobanteBusqueda.setIpModificacion(this.obtenerIp(request));
				comprobanteBusqueda.setEmpresa(this.obtenerEmpresa(request));
				List<Comprobante> listaComprobantes = consultaNegocioSessionRemote
						.consultarComprobantesGenerados(comprobanteBusqueda);
				retorno.put("objeto", listaComprobantes);
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			} else if ("consultaDetalle".equals(accion)) {
				String idComprobante = request.getParameter("idComprobante");
				comprobante = consultaNegocioSessionRemote.consultarComprobante(UtilWeb.parseInt(idComprobante),
						this.obtenerIdEmpresa(request));

				retorno.put("objeto", comprobante);
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			} else if ("comprobanteImpresion".equals(accion)) {
				Properties prop = UtilProperties.cargaArchivo("aplicacionConfiguracion.properties");
				String ruta = prop.getProperty("ruta.formatos.excel.comprobantes");
				comprobante = this.obtenerComprobanteRequest(request);
				
				Usuario usuario = this.obtenerUsuario(request);
				String nombreDominio = usuario.getNombreDominioEmpresa();
				ruta = ruta + nombreDominio;

				if (comprobante.getTipoComprobante().getCodigoEntero().intValue() == UtilWeb
						.obtenerEnteroPropertieMaestro("comprobanteBoleta", "aplicacionDatos")) {
					String plantilla = ruta + File.separator + "bl-plantilla.jasper";
					/**
					 * Inicio data de documento de cobranza
					 */
					String nombreArchivo = "bol_" + comprobante.getNumeroSerie() + "-"
							+ comprobante.getNumeroComprobante();
					nombreArchivo = nombreArchivo + ".pdf";
					conn = obtenerConnection();
					byte[] datos = imprimirPDFBoleta(enviarParametrosBoleta(ruta, comprobante, conn), new FileInputStream(new File(plantilla)), comprobante);

					Map<String, Object> mapDatos = new HashMap<String, Object>();
					mapDatos.put("nombreArchivo", nombreArchivo);
					mapDatos.put("contentType", "application/pdf");
					mapDatos.put("datos", datos);

					retorno.put("objeto", mapDatos);
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				} else if (comprobante.getTipoComprobante().getCodigoEntero().intValue() == UtilWeb
						.obtenerEnteroPropertieMaestro("comprobanteDocumentoCobranza", "aplicacionDatos")) {
					String plantilla = ruta + File.separator + "dc-plantilla.jasper";
					File archivo = new File(plantilla);
					InputStream streamJasper = new FileInputStream(archivo);

					/**
					 * Inicio data de documento de cobranza
					 */
					String nombreArchivo = "dc_" + comprobante.getNumeroSerie() + "-"
							+ comprobante.getNumeroComprobante();
					nombreArchivo = nombreArchivo + ".pdf";
					conn = obtenerConnection();
					byte[] datos = imprimirPDFDocumentoCobranza(enviarParametrosDocumentoCobranza(ruta, comprobante, conn), streamJasper, comprobante);

					Map<String, Object> mapDatos = new HashMap<String, Object>();
					mapDatos.put("nombreArchivo", nombreArchivo);
					mapDatos.put("contentType", "application/pdf");
					mapDatos.put("datos", datos);

					retorno.put("objeto", mapDatos);
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				} else if (comprobante.getTipoComprobante().getCodigoEntero().intValue() == UtilWeb
						.obtenerEnteroPropertieMaestro("comprobanteFactura", "aplicacionDatos")) {
					String plantilla = ruta + File.separator + "fc-plantilla.jasper";
					File archivo = new File(plantilla);
					InputStream streamJasper = new FileInputStream(archivo);

					/**
					 * Inicio data de factura
					 */
					String nombreArchivo = "fc_" + comprobante.getNumeroSerie() + "-"
							+ comprobante.getNumeroComprobante();
					nombreArchivo = nombreArchivo + ".pdf";
					byte[] datos = imprimirPDFFactura(this.enviarParametrosFactura(comprobante), streamJasper, comprobante);
					Map<String, Object> mapDatos = new HashMap<String, Object>();
					mapDatos.put("nombreArchivo", nombreArchivo);
					mapDatos.put("contentType", "application/pdf");
					mapDatos.put("datos", datos);

					retorno.put("objeto", mapDatos);
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				}
			} else if ("comprobanteDigital".equals(accion)) {
				Properties prop = UtilProperties.cargaArchivo("aplicacionConfiguracion.properties");
				String ruta = prop.getProperty("ruta.formatos.excel.comprobantes");
				comprobante = this.obtenerComprobanteRequest(request);
				
				Usuario usuario = this.obtenerUsuario(request);
				String nombreDominio = usuario.getNombreDominioEmpresa();
				ruta = ruta + nombreDominio;

				if (comprobante.getTipoComprobante().getCodigoEntero().intValue() == UtilWeb
						.obtenerEnteroPropertieMaestro("comprobanteBoleta", "aplicacionDatos")) {

				} else if (comprobante.getTipoComprobante().getCodigoEntero().intValue() == UtilWeb
						.obtenerEnteroPropertieMaestro("comprobanteDocumentoCobranza", "aplicacionDatos")) {
					String plantilla = ruta + File.separator + "dc-digital.jasper";
					File archivo = new File(plantilla);
					InputStream streamJasper = new FileInputStream(archivo);
					conn = obtenerConnection();
					byte[] datos = imprimirPDFDocumentoCobranza(this.enviarParametrosDocumentoCobranza(ruta, comprobante, conn), streamJasper, comprobante);
					String nombreArchivo = "dc_" + comprobante.getNumeroSerie() + "-"
							+ comprobante.getNumeroComprobante();
					nombreArchivo = nombreArchivo + ".pdf";
					Map<String, Object> mapDatos = new HashMap<String, Object>();
					mapDatos.put("nombreArchivo", nombreArchivo);
					mapDatos.put("contentType", "application/pdf");
					mapDatos.put("datos", datos);

					retorno.put("objeto", mapDatos);
					retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
					retorno.put("exito", true);
				}
			}
		} catch (ErrorConsultaDataException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException e) {
				log.error(e.getMessage(), e);
				retorno.put("mensaje", e.getMessage());
				retorno.put("exito", false);
			}
		}
		respuesta.println(gson.toJson(retorno));
	}

	private byte[] imprimirPDFBoleta(Map<String, Object> map, InputStream streamJasper,
			Comprobante comprobante) throws JRException, IOException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		List<JasperPrint> printList = new ArrayList<JasperPrint>();
		List<DetalleServicioAgencia> listaDetalleFinal = new ArrayList<DetalleServicioAgencia>();
		DetalleServicioAgencia detalleServicio = null;
		for (DetalleComprobante detalleComprobante : comprobante.getDetalleComprobante()) {
			if (detalleComprobante.isImpresion()) {
				detalleServicio = new DetalleServicioAgencia();
				detalleServicio.setDescripcionServicio(detalleComprobante.getConcepto());
				detalleServicio.setCodigoEntero(detalleComprobante.getIdServicioDetalle());
				listaDetalleFinal.add(detalleServicio);
			}
		}
		printList.add(JasperFillManager.fillReport(streamJasper, map, new JRBeanCollectionDataSource(listaDetalleFinal)));
		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setExporterInput(SimpleExporterInput.getInstance(printList));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(stream));
		SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
		configuration.setCreatingBatchModeBookmarks(true);
		exporter.exportReport();
		streamJasper.close();
		stream.flush();
		stream.close();
		return stream.toByteArray();
	}

	private byte[] imprimirPDFDocumentoCobranza(Map<String, Object> map, InputStream jasperStream,
			Comprobante comprobante) throws JRException, IOException {
		List<DetalleServicioAgencia> listaDetalleFinal = new ArrayList<DetalleServicioAgencia>();
		DetalleServicioAgencia detalleServicio = null;
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		for (DetalleComprobante detalleComprobante : comprobante.getDetalleComprobante()) {
			if (detalleComprobante.isImpresion()) {
				detalleServicio = new DetalleServicioAgencia();
				detalleServicio.setDescripcionServicio(detalleComprobante.getConcepto());
				detalleServicio.setCodigoEntero(detalleComprobante.getIdServicioDetalle());
				listaDetalleFinal.add(detalleServicio);
			}
		}
		List<JasperPrint> printList = new ArrayList<JasperPrint>();
		printList.add(
				JasperFillManager.fillReport(jasperStream, map, new JRBeanCollectionDataSource(listaDetalleFinal)));

		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setExporterInput(SimpleExporterInput.getInstance(printList));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(stream));
		SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
		configuration.setCreatingBatchModeBookmarks(true);
		exporter.exportReport();
		jasperStream.close();
		stream.flush();
		stream.close();
		return stream.toByteArray();
	}

	private byte[] imprimirPDFFactura(Map<String, Object> map, InputStream jasperStream,
			Comprobante comprobante) throws JRException, ErrorConsultaDataException, IOException {
		List<JasperPrint> printList = new ArrayList<JasperPrint>();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		List<Pasajero> listaPasajeros = utilNegocioSessionRemote.consultarPasajerosServicio(
				comprobante.getIdServicio(), comprobante.getEmpresa().getCodigoEntero());
		printList.add(
				JasperFillManager.fillReport(jasperStream, map, new JRBeanCollectionDataSource(listaPasajeros)));

		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setExporterInput(SimpleExporterInput.getInstance(printList));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
		SimplePdfExporterConfiguration configuration = new SimplePdfExporterConfiguration();
		configuration.setCreatingBatchModeBookmarks(true);
		// exporter.setConfiguration(configuration);
		exporter.exportReport();
		jasperStream.close();
		outputStream.flush();
		outputStream.close();
		return outputStream.toByteArray();
	}

	private Map<String, Object> enviarParametrosBoleta(String ruta, Comprobante comprobante, Connection conn)
			throws SQLException, Exception {
		Map<String, Object> mapeo = new HashMap<String, Object>();
		Cliente cliente = null;
		cliente = consultaNegocioSessionRemote.consultarCliente(comprobante.getTitular().getCodigoEntero(),
				comprobante.getEmpresa().getCodigoEntero());
		mapeo.put("p_nombrecliente", comprobante.getTitular().getNombreCompleto());
		mapeo.put("p_direccion", "");
		List<Direccion> listaDirecciones = cliente.getListaDirecciones();
		if (listaDirecciones != null && !listaDirecciones.isEmpty()) {
			mapeo.put("p_direccion", listaDirecciones.get(0).getDireccion());
		}
		mapeo.put("p_docidentidad", cliente.getDocumentoIdentidad().getTipoDocumento().getAbreviatura() + " - "
				+ cliente.getDocumentoIdentidad().getNumeroDocumento());
		mapeo.put("p_numeroruc", cliente.getDocumentoIdentidad().getNumeroDocumento());

		Calendar cal = Calendar.getInstance();
		cal.setTime(comprobante.getFechaComprobante());
		mapeo.put("p_diafecha", UtilWeb.completarCerosIzquierda(String.valueOf(cal.get(Calendar.DATE)), 2));
		mapeo.put("p_mesfecha", UtilWeb.completarCerosIzquierda(String.valueOf(cal.get(Calendar.MONTH) + 1), 2));
		String anio = String.valueOf(cal.get(Calendar.YEAR));
		mapeo.put("p_aniofecha", anio.substring(2));
		String montoLetras = UtilConvertirNumeroLetras.convertirNumeroALetras(
				comprobante.getTotalComprobante().doubleValue()) + " " + comprobante.getMoneda().getNombre();
		mapeo.put("p_montoletras", montoLetras);

		DecimalFormat df = new DecimalFormat("#,##0.00", new DecimalFormatSymbols(Locale.US));
		mapeo.put("p_montosubtotal",
				comprobante.getMoneda().getAbreviatura() + " " + df.format(comprobante.getSubTotal().doubleValue()));
		mapeo.put("p_montoigv",
				comprobante.getMoneda().getAbreviatura() + " " + df.format(comprobante.getTotalIGV().doubleValue()));
		mapeo.put("p_montototal", comprobante.getMoneda().getAbreviatura() + " "
				+ df.format(comprobante.getTotalComprobante().doubleValue()));
		mapeo.put("p_idempresa", comprobante.getEmpresa().getCodigoEntero());
		mapeo.put("p_idservicio", comprobante.getIdServicio());
		mapeo.put("SUBREPORT_DIR", ruta + File.separator);
		mapeo.put("REPORT_CONNECTION", conn);

		String rutaImagen = ruta + File.separator + "logocomprobante.jpg";
		File imagen = new File(rutaImagen);
		BufferedImage image = ImageIO.read(imagen);
		mapeo.put("p_imagen", image);

		return mapeo;
	}

	private Map<String, Object> enviarParametrosDocumentoCobranza(String ruta, Comprobante comprobante, Connection conn)
			throws SQLException, Exception {
		Map<String, Object> mapeo = new HashMap<String, Object>();

		Cliente cliente = null;
		cliente = consultaNegocioSessionRemote.consultarCliente(comprobante.getTitular().getCodigoEntero(),
				comprobante.getEmpresa().getCodigoEntero());
		mapeo.put("p_numserie", comprobante.getNumeroSerie());
		mapeo.put("p_numdocumento", UtilWeb.completarCerosIzquierda(comprobante.getNumeroComprobante(), 6));
		mapeo.put("p_nombrecliente", comprobante.getTitular().getNombreCompleto());
		mapeo.put("p_direccion", "");
		List<Direccion> listaDirecciones = cliente.getListaDirecciones();
		if (listaDirecciones != null && !listaDirecciones.isEmpty()) {
			mapeo.put("p_direccion", listaDirecciones.get(0).getDireccion());
		}
		mapeo.put("p_docidentidad", cliente.getDocumentoIdentidad().getTipoDocumento().getAbreviatura() + " - "
				+ cliente.getDocumentoIdentidad().getNumeroDocumento());
		Calendar cal = Calendar.getInstance();
		cal.setTime(comprobante.getFechaComprobante());
		mapeo.put("p_diafecha", UtilWeb.completarCerosIzquierda(String.valueOf(cal.get(Calendar.DATE)), 2));
		mapeo.put("p_mesfecha", UtilWeb.completarCerosIzquierda(String.valueOf(cal.get(Calendar.MONTH) + 1), 2));
		mapeo.put("p_aniofecha", String.valueOf(cal.get(Calendar.YEAR)));
		DecimalFormat df = new DecimalFormat("#,##0.00", new DecimalFormatSymbols(Locale.US));
		mapeo.put("p_montototal", comprobante.getMoneda().getAbreviatura() + " "
				+ df.format(comprobante.getTotalComprobante().doubleValue()));
		mapeo.put("p_idempresa", comprobante.getEmpresa().getCodigoEntero());
		mapeo.put("p_idservicio", comprobante.getIdServicio());
		mapeo.put("SUBREPORT_DIR", ruta + File.separator);
		mapeo.put("REPORT_CONNECTION", conn);
		String rutaImagen = ruta + File.separator + "logocomprobante.jpg";
		File imagen = new File(rutaImagen);
		BufferedImage image = ImageIO.read(imagen);
		mapeo.put("p_imagen", image);

		return mapeo;
	}

	private Map<String, Object> enviarParametrosFactura(Comprobante comprobante) throws SQLException, Exception {
		Map<String, Object> mapeo = new HashMap<String, Object>();

		Cliente cliente = null;
		cliente = consultaNegocioSessionRemote.consultarCliente(comprobante.getTitular().getCodigoEntero(),
				comprobante.getEmpresa().getCodigoEntero());

		mapeo.put("p_nombrecliente", comprobante.getTitular().getNombreCompleto());
		mapeo.put("p_direccion", "");
		List<Direccion> listaDirecciones = cliente.getListaDirecciones();
		if (listaDirecciones != null && !listaDirecciones.isEmpty()) {
			mapeo.put("p_direccion", listaDirecciones.get(0).getDireccion());
		}
		mapeo.put("p_numeroruc", cliente.getDocumentoIdentidad().getNumeroDocumento());

		Calendar cal = Calendar.getInstance();
		cal.setTime(comprobante.getFechaComprobante());
		mapeo.put("p_diafecha", UtilWeb.completarCerosIzquierda(String.valueOf(cal.get(Calendar.DATE)), 2));
		mapeo.put("p_mesfecha", UtilWeb.completarCerosIzquierda(String.valueOf(cal.get(Calendar.MONTH) + 1), 2));
		String anio = String.valueOf(cal.get(Calendar.YEAR));
		mapeo.put("p_aniofecha", anio.substring(2));
		String montoLetras = UtilConvertirNumeroLetras.convertirNumeroALetras(
				comprobante.getTotalComprobante().doubleValue()) + " " + comprobante.getMoneda().getNombre();
		mapeo.put("p_montoletras", montoLetras);

		DecimalFormat df = new DecimalFormat("#,##0.00", new DecimalFormatSymbols(Locale.US));
		mapeo.put("p_montosubtotal",
				comprobante.getMoneda().getAbreviatura() + " " + df.format(comprobante.getSubTotal().doubleValue()));
		mapeo.put("p_montoigv",
				comprobante.getMoneda().getAbreviatura() + " " + df.format(comprobante.getTotalIGV().doubleValue()));
		mapeo.put("p_montototal", comprobante.getMoneda().getAbreviatura() + " "
				+ df.format(comprobante.getTotalComprobante().doubleValue()));

		return mapeo;
	}

	Comprobante obtenerComprobanteRequest(HttpServletRequest request) {
		Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("comprobante"));
		Map<String, Object> mapTipoComprobante = (Map<String, Object>) (mapeo.get("tipoComprobante"));
		Comprobante comprobante = new Comprobante();
		comprobante.getTipoComprobante()
				.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapTipoComprobante.get("codigoEntero")));
		comprobante.getTipoComprobante().setNombre(UtilWeb.obtenerCadenaMapeo(mapTipoComprobante.get("nombre")));
		comprobante.setNumeroSerie(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroSerie")));
		comprobante.setNumeroComprobante(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroComprobante")));
		Map<String, Object> mapTitular = (Map<String, Object>) mapeo.get("titular");
		Map<String, Object> mapDocIdentidad = (Map<String, Object>) mapTitular.get("documentoIdentidad");
		Map<String, Object> mapTipoDocumento = (Map<String, Object>) mapDocIdentidad.get("tipoDocumento");
		comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento()
				.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapTipoDocumento.get("codigoEntero")));
		comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento()
				.setNombre(UtilWeb.obtenerCadenaMapeo(mapTipoDocumento.get("nombre")));
		comprobante.getTitular().getDocumentoIdentidad().getTipoDocumento()
				.setAbreviatura(UtilWeb.obtenerCadenaMapeo(mapTipoDocumento.get("abreviatura")));
		comprobante.getTitular().getDocumentoIdentidad()
				.setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(mapDocIdentidad.get("numeroDocumento")));
		comprobante.getTitular().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapTitular.get("codigoEntero")));
		comprobante.getTitular().setNombres(UtilWeb.obtenerCadenaMapeo(mapTitular.get("nombres")));
		comprobante.getTitular().setApellidoPaterno(UtilWeb.obtenerCadenaMapeo(mapTitular.get("apellidoPaterno")));
		comprobante.getTitular().setApellidoMaterno(UtilWeb.obtenerCadenaMapeo(mapTitular.get("apellidoMaterno")));
		comprobante.getTitular().setNombreCompleto(UtilWeb.obtenerCadenaMapeo(mapTitular.get("nombreCompleto")));
		comprobante.setFechaComprobante(UtilWeb.obtenerFechaMapeo(mapeo.get("fechaComprobante")));
		Map<String, Object> mapeoMoneda = (Map<String, Object>) (mapeo.get("moneda"));
		comprobante.getMoneda().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeoMoneda.get("codigoEntero")));
		comprobante.getMoneda().setNombre(UtilWeb.obtenerCadenaMapeo(mapeoMoneda.get("nombre")));
		comprobante.getMoneda().setAbreviatura(UtilWeb.obtenerCadenaMapeo(mapeoMoneda.get("abreviatura")));
		comprobante.setSubTotal(UtilWeb.obtenerBigDecimalMapeo(mapeo.get("subTotal")));
		comprobante.setTotalIGV(UtilWeb.obtenerBigDecimalMapeo(mapeo.get("totalIGV")));
		comprobante.setTotalComprobante(UtilWeb.obtenerBigDecimalMapeo(mapeo.get("totalComprobante")));
		comprobante.setIdServicio(UtilWeb.obtenerIntMapeo(mapeo.get("idServicio")));
		comprobante.setTieneDetraccion(UtilWeb.obtenerBooleanMapeo(mapeo.get("tieneDetraccion")));
		comprobante.setTieneRetencion(UtilWeb.obtenerBooleanMapeo(mapeo.get("tieneRetencion")));
		comprobante.setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("codigoEntero")));
		comprobante.setEmpresa(this.obtenerEmpresa(request));
		List<Map<String, Object>> listaDetalle = (List<Map<String, Object>>) mapeo.get("detalle");
		if (listaDetalle != null && !listaDetalle.isEmpty()) {
			DetalleComprobante detalleComprobante = null;
			for (Map<String, Object> map : listaDetalle) {
				detalleComprobante = new DetalleComprobante();
				detalleComprobante.setCantidad(UtilWeb.obtenerIntMapeo(map.get("cantidad")));
				detalleComprobante.setConcepto(UtilWeb.obtenerCadenaMapeo(map.get("concepto")));
				detalleComprobante.setPrecioUnitario(UtilWeb.obtenerBigDecimalMapeo(map.get("precioUnitario")));
				detalleComprobante.setTotalDetalle(UtilWeb.obtenerBigDecimalMapeo(map.get("totalDetalle")));
				detalleComprobante.setIdServicioDetalle(UtilWeb.obtenerIntMapeo(map.get("idServicioDetalle")));
				detalleComprobante.setCodigoEntero(UtilWeb.obtenerIntMapeo(map.get("codigoEntero")));
				detalleComprobante.setImpresion(UtilWeb.obtenerBooleanMapeo(map.get("flagImprimir")));
				if (detalleComprobante.isImpresion()) {
					comprobante.getDetalleComprobante().add(detalleComprobante);
				}
			}
		}

		return comprobante;
	}

	Connection obtenerConnection() {
		try {
			String jndi = "java:/jboss/jdbc/rhviajesDS";

			Context ic = new InitialContext();
			DataSource dataSource = (DataSource) ic.lookup(jndi);

			return dataSource.getConnection();
		} catch (NamingException e) {
			log.error(e.getMessage(), e);
		} catch (SQLException e) {
			log.error(e.getMessage(), e);
		}
		return null;
	}
}
