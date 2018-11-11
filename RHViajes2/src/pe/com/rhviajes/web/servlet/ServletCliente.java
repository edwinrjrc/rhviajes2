package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import pe.com.rhviajes.web.util.UtilWeb;
import pe.com.viajes.bean.negocio.Cliente;
import pe.com.viajes.bean.negocio.ClienteBusqueda;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

/**
 * Servlet implementation class ServletCliente
 */
@WebServlet("/servlets/ServletCliente")
public class ServletCliente extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletServicioAgencia.class);
	private static final long serialVersionUID = 1L;
	
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/ConsultaNegocioSession!pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote")
	private ConsultaNegocioSessionRemote consultaNegocioSessionRemote;
       
    /**
     * @see BaseServlet#BaseServlet()
     */
    public ServletCliente() {
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
			if (ACCION_LISTAR.equals(accion)){
				Cliente cliente = new Cliente();
				cliente.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.consultarCliente2(cliente));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
			}
			else if (ACCION_BUSCAR.equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				Cliente cliente = new Cliente();
				if (mapeo.get("tipoDocumento") != null){
					cliente.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(UtilWeb.obtenerIntMapeo(mapeo.get("tipoDocumento")));
				}
				if (mapeo.get("numeroDocumento") != null){
					cliente.getDocumentoIdentidad().setNumeroDocumento(UtilWeb.obtenerCadenaMapeo(mapeo.get("numeroDocumento")));
				}
				if (mapeo.get("nombreCliente") != null){
					cliente.setNombres(UtilWeb.obtenerCadenaMapeo(mapeo.get("nombreCliente")));
				}
				cliente.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.consultarCliente2(cliente));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
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
