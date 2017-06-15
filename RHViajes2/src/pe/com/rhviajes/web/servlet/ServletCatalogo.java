package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
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
import pe.com.viajes.bean.base.BaseVO;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.ejb.SoporteRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

/**
 * Servlet implementation class ServletCatalogo
 */
@WebServlet("/servlets/ServletCatalogo")
public class ServletCatalogo extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletCatalogo.class);
	private static final long serialVersionUID = 1L;
       
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SoporteSession!pe.com.viajes.negocio.ejb.SoporteRemote")
	private SoporteRemote soporteRemote;
	@EJB(lookup="java:jboss/exported/RHViajesNegocioEAR/RHViajesNegocio/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletCatalogo() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("/index.jsp");
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
			if (ACCION_LISTAR.equals(accion)){
				int idmaestro = Integer.parseInt(request.getParameter("tipoMaestro"));
				retorno.put("objeto", soporteRemote.listarHijosMaestro(idmaestro , obtenerIdEmpresa(request)));
				retorno.put("mensaje", "Consulta completada");
				retorno.put("exito", true);
			}
			else if ("listarAerolineas".equals(accion)){
				BaseVO tipoProveedor = new BaseVO();
				tipoProveedor.setCodigoEntero(1);
				tipoProveedor.setEmpresa(obtenerEmpresa(request));
				retorno.put("objeto", soporteRemote.listarProveedorTipo(tipoProveedor));
				retorno.put("mensaje", "Consulta completada");
				retorno.put("exito", true);
			}
			else if ("listarMaestroServicios".equals(accion)){
				retorno.put("objeto", consultaNegocioSessionRemote.listarMaestroServicio(obtenerIdEmpresa(request)));
				retorno.put("mensaje", "Consulta completada");
				retorno.put("exito", true);
			}
		} catch (ErrorConsultaDataException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (Exception e){
			log.error(e.getMessage(), e);
			retorno.put("mensaje", "Ocurrio una excepcion no controlado");
			retorno.put("mensaje2", e.getMessage());
			retorno.put("exito", false);
		}
		respuesta.println(gson.toJson(retorno));
	}

}
