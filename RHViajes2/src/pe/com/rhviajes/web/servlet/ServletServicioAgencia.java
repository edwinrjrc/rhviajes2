package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
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
import pe.com.viajes.bean.base.BaseVO;
import pe.com.viajes.bean.negocio.DetalleServicioAgencia;
import pe.com.viajes.bean.negocio.Pasajero;
import pe.com.viajes.bean.negocio.ServicioAgencia;
import pe.com.viajes.bean.negocio.ServicioAgenciaBusqueda;
import pe.com.viajes.negocio.ejb.ConsultaNegocioSessionRemote;
import pe.com.viajes.negocio.ejb.SoporteRemote;
import pe.com.viajes.negocio.ejb.UtilNegocioSessionRemote;

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
	
	private UtilNegocioSessionRemote utilNegocioSessionRemote;
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
		Gson gson = new GsonBuilder().setDateFormat(UtilWeb.PATTERN_GSON).create();
		String accion = request.getParameter("accion");
		Map<String,Object> retorno = new HashMap<String, Object>();
		try {
			if (ACCION_LISTAR.equals(accion)){
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(request.getParameter("formulario"));
				ServicioAgenciaBusqueda servicioAgencia = new ServicioAgenciaBusqueda();
				SimpleDateFormat sdf = new SimpleDateFormat(UtilWeb.PATTERN_GSON);
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
				SimpleDateFormat sdf = new SimpleDateFormat(UtilWeb.PATTERN_GSON);
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
				Integer idTipoServicio = Double.valueOf(mapeo.get("idTipoServicio").toString()).intValue();
				retorno.put("objeto", soporteRemote.consultarConfiguracionServicio(idTipoServicio,this.obtenerIdEmpresa(request)));
				retorno.put("objeto2",consultaNegocioSessionRemote.consultarMaestroServicio(idTipoServicio, this.obtenerIdEmpresa(request)));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
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
				Pasajero pasajero = new Pasajero();
				pasajero.getDocumentoIdentidad().getTipoDocumento().setCodigoEntero(Double.valueOf(mapeo.get("tipoDocumento").toString()).intValue());
				pasajero.getDocumentoIdentidad().setNumeroDocumento(mapeo.get("numeroDocumento").toString());
				pasajero.setEmpresa(this.obtenerEmpresa(request));
				retorno.put("objeto", consultaNegocioSessionRemote.consultarPasajero(pasajero));
				retorno.put("mensaje", "Busqueda realizada satisfactoriamente");
				retorno.put("exito", true);
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
		} catch (SQLException e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			retorno.put("mensaje", e.getMessage());
			retorno.put("exito", false);
		}
		respuesta.println(gson.toJson(retorno));
	}
}
