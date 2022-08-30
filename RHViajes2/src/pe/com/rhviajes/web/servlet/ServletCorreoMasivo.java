/**
 * 
 */
package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import pe.com.viajes.bean.negocio.ArchivoAdjunto;
import pe.com.viajes.bean.negocio.CorreoClienteMasivo;
import pe.com.viajes.bean.negocio.CorreoMasivo;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.ejb.NegocioSessionRemote;
import pe.com.viajes.negocio.util.UtilConstantes;

/**
 * @author Edwin
 *
 */
@WebServlet("/servlets/ServletCorreoMasivo")
public class ServletCorreoMasivo extends BaseServlet {
	
	private static Logger log = Logger.getLogger(ServletCorreoMasivo.class);
	private static final long serialVersionUID = 237242880033497095L;
	
	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
	@EJB(lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/NegocioSession!pe.com.viajes.negocio.ejb.NegocioSessionRemote")
	private NegocioSessionRemote negocioSessionRemote;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.sendRedirect("paginas/inicio.jsp");
	}

	@Override
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
			if ("correosCliente".equals(accion)) {
				retorno.put("objeto", consultaNegocioSessionRemote.listarClientesCorreo(this.obtenerIdEmpresa(request)));
				retorno.put("mensaje", "Consulta de Cliente");
				retorno.put("exito", true);
			}
			else if ("cargaArchivo".equals(accion)) {
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
							//nombreArchivo = item.getName();
							bytesArchivo = IOUtils.toByteArray(is);
							content = item.getContentType();
						}
					}
					
					//String parametros = request.getParameter("listaCorreos");
					//System.out.println("correos::"+parametros);
					List<CorreoClienteMasivo> listaCorreosBD = consultaNegocioSessionRemote.listarClientesCorreo(this.obtenerIdEmpresa(request));
					
					CorreoClienteMasivo correo = new CorreoClienteMasivo();
					correo.getCorreoElectronico().setDireccion("edwinrjrc@gmail.com");
					correo.setEnviarCorreo(true);
					
					List<CorreoClienteMasivo> listaCorreoMasivo = new ArrayList<>();
					listaCorreoMasivo.add(correo);
					
					ArchivoAdjunto archivoAdjunto = new ArchivoAdjunto();
					archivoAdjunto.setDatos(bytesArchivo);
					archivoAdjunto.setContent(content);
					archivoAdjunto.setTamanioArchivo(bytesArchivo.length);
					archivoAdjunto.setNombreArchivo("adjunto.jpg");
					
					CorreoMasivo correoMasivo = new CorreoMasivo();
					correoMasivo.setBuffer(bytesArchivo);
					correoMasivo.setArchivoAdjunto(archivoAdjunto);
					correoMasivo.setListaCorreoMasivo(listaCorreosBD);
					correoMasivo.setArchivoCargado(true);
					correoMasivo.setAsunto("Saludo de Navidads");
					correoMasivo.setContenidoCorreo("<img src=\"cid:imagenCorreo\">");
					
					negocioSessionRemote.enviarCorreoMasivo(correoMasivo);
				}
				retorno.put("exito", true);
			}
			
			String buffer = gson.toJson(retorno);
			respuesta.println(buffer);
		} catch (SQLException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		}
	}

}
