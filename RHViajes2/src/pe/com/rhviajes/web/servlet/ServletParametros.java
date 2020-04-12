package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
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
import pe.com.viajes.negocio.ejb.ParametroRemote;
import pe.com.viajes.negocio.exception.ConvertirStringAIntegerException;
import pe.com.viajes.negocio.util.UtilConstantes;

/**
 * Servlet implementation class ServletParametros
 */
@WebServlet("/servlets/ServletParametros")
public class ServletParametros extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletParametros.class);
	private static final long serialVersionUID = 1L;
	
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ParametroSession!pe.com.viajes.negocio.ejb.ParametroRemote")
	private ParametroRemote parametroRemote;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletParametros() {
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
		Gson gson = new GsonBuilder().setDateFormat(UtilConstantes.PATTERN_GSON).create();
		String accion = request.getParameter("accion");
		Map<String,Object> retorno = new HashMap<String, Object>();
		try {
			if ("consultarIGV".equals(accion)){
				retorno.put("objeto", parametroRemote.consultarParametro(UtilWeb.obtenerEnteroPropertieMaestro("codigoParametroIGV","aplicacionDatos"), obtenerIdEmpresa(request)).getValor());
				retorno.put("mensaje", "Consulta satisfactoria");
				retorno.put("exito", true);
			}
		} catch (ConvertirStringAIntegerException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (SQLException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		}
		respuesta.println(gson.toJson(retorno));
	}

}
