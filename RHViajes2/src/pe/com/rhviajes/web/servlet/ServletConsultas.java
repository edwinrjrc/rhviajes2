package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import pe.com.rhviajes.web.util.UtilWeb;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.exception.ConversionStringDateException;
import pe.com.viajes.negocio.exception.ConvertirStringAIntegerException;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

/**
 * Servlet implementation class ServletConsultas
 */
@WebServlet("/servlets/ServletConsultas")
public class ServletConsultas extends BaseServlet{
	private static Logger log = Logger.getLogger(ServletServicioAgencia.class);
	private static final long serialVersionUID = 1L;
	
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletConsultas() {
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
		Gson gson = new GsonBuilder().setDateFormat(UtilWeb.PATTERN_GSON).create();
		String accion = request.getParameter("accion");
		Map<String,Object> retorno = new HashMap<String, Object>();
		try {
			if("consultaTipoCambio".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				if (request.getParameter("formulario") != null && mapeo.get("monedaOrigen") != null && mapeo.get("monedaDestino") != null){
					Integer idMonedaOrigen = UtilWeb.convertirStringAInteger(mapeo.get("monedaOrigen").toString());
					Integer idMonedaDestino = UtilWeb.convertirStringAInteger(mapeo.get("monedaDestino").toString());
					Date fecha = UtilWeb.convertirStringADate(mapeo.get("fecha").toString());
					Integer idEmpresa = obtenerIdEmpresa(request);
					retorno.put("objeto", consultaNegocioSessionRemote.consultarTipoCambio(idMonedaOrigen, idMonedaDestino,fecha,idEmpresa));
					retorno.put("mensaje", "Consulta exitosa");
					retorno.put("exito", true);
				}
			}
			else if("consultaTipoServicio".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Integer tipoServicio = UtilWeb.convertirStringAInteger(mapeo.get("tipoServicio").toString());
				Integer idEmpresa = obtenerIdEmpresa(request);
				retorno.put("objeto", consultaNegocioSessionRemote.consultarTipoServicio(tipoServicio , idEmpresa));
				retorno.put("mensaje", "Consulta exitosa");
				retorno.put("exito", true);
			}
			else if("consultarProveedor".equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Integer idProveedor = UtilWeb.convertirStringAInteger(mapeo.get("idProveedor").toString());
				Integer idEmpresa = obtenerIdEmpresa(request);
				retorno.put("objeto", consultaNegocioSessionRemote.consultarProveedor(idProveedor , idEmpresa));
				retorno.put("mensaje", "Consulta exitosa");
				retorno.put("exito", true);
			}
		} catch (ConvertirStringAIntegerException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (ConversionStringDateException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (ErrorConsultaDataException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		}
		respuesta.println(gson.toJson(retorno));
	}

}
