package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
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
import pe.com.viajes.bean.negocio.Usuario;
import pe.com.viajes.negocio.ejb.SeguridadRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;
import pe.com.viajes.negocio.exception.ErrorEncriptacionException;
import pe.com.viajes.negocio.exception.ErrorRegistroDataException;
import pe.com.viajes.negocio.exception.RHViajesException;

/**
 * Servlet implementation class ServletUsuario
 */
@WebServlet("/servlets/ServletUsuario")
public class ServletUsuario extends BaseServlet {
	private static Logger log = Logger.getLogger(ServletUsuario.class);
	private static final long serialVersionUID = 1L;
    
	//@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SeguridadSession!pe.com.viajes.negocio.ejb.SeguridadRemote")
	//public SeguridadRemote seguridadRemote;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletUsuario() {
        super();
        // TODO Auto-generated constructor stub
    }
	
	SeguridadRemote obtenerInterfaceEjbRemote(String lookup) throws RHViajesException{
		try {
			Context ic = new InitialContext(obtenerParametros());
			return (SeguridadRemote) ic.lookup(lookup);
		} catch (NamingException e) {
			throw new RHViajesException(e);
		}
	}

	private Hashtable<String, String> obtenerParametros() {
		Hashtable<String, String> parametros = new Hashtable<String, String>();
		//parametros.put(Context.INITIAL_CONTEXT_FACTORY, "org.jboss.naming.remote.client.InitialContextFactory");
		parametros.put(Context.URL_PKG_PREFIXES, "org.jboss.ejb.client.naming");
		parametros.put(Context.PROVIDER_URL, "http-remoting://192.168.1.200:8080");
		parametros.put(Context.SECURITY_PRINCIPAL, "admin");
		parametros.put(Context.SECURITY_CREDENTIALS, "p4ssw0rd");
		return parametros;
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("do get");
		
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/html; charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter respuesta = response.getWriter();
		Gson gson = new GsonBuilder().setDateFormat(UtilWeb.PATTERN_GSON).create();
		
		String accion = request.getParameter("accion");
		String lookup = "java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SeguridadSession!pe.com.viajes.negocio.ejb.SeguridadRemote";
		SeguridadRemote seguridadRemote = null;
		try {
			seguridadRemote = obtenerInterfaceEjbRemote(lookup);
		} catch (RHViajesException e) {
			log.error(e.getMessage(), e);
		}
		if ("listar".equals(accion)){
			try {
				List<Usuario> listaUsuarios = seguridadRemote.listarUsuarios(obtenerIdEmpresa(request));
				Map<String, Object> objetos= new HashMap<String, Object>();
				objetos.put("usuarios", listaUsuarios);
				String conversion = gson.toJson(objetos);
				System.out.println(conversion);
				respuesta.println(conversion);
			} catch (ErrorConsultaDataException e) {
				log.error(e.getMessage(), e);
			}
		}
		else if ("consultaEdicion".equals(accion)){
			try {
				Map<String, Object> objetos= new HashMap<String, Object>();
				objetos.put("usuarioBean", seguridadRemote.consultarUsuario(Integer.valueOf(request.getParameter("idUsuario")), this.obtenerIdEmpresa(request)));
				
				respuesta.println(gson.toJson(objetos));
			} catch (NumberFormatException e) {
				log.error(e.getMessage(), e);
			} catch (ErrorConsultaDataException e) {
				log.error(e.getMessage(), e);
			}
		}
		else if ("grabarNuevoUsuario".equals(accion)){
			String beanUsuario = request.getParameter("beanUsuario");
			Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(beanUsuario);

			Usuario usuarioBean = new Usuario();
			usuarioBean.setUsuario(mapeo.get("usuario").toString());
			usuarioBean.setCredencial(mapeo.get("password").toString());
			usuarioBean.setNombres(mapeo.get("nombres").toString());
			usuarioBean.setApellidoPaterno(mapeo.get("apellidoPaterno").toString());
			usuarioBean.setApellidoMaterno(mapeo.get("apellidoMaterno").toString());
			usuarioBean.setIpCreacion(this.obtenerIp(request));
			usuarioBean.setIpModificacion(this.obtenerIp(request));
			usuarioBean.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
			usuarioBean.getUsuarioCreacion().setCodigoEntero(this.obtenerUsuario(request).getCodigoEntero());
			usuarioBean.setUsuarioModificacion(this.obtenerUsuario(request));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				usuarioBean.setFechaNacimiento(sdf.parse(mapeo.get("fechaNacimiento").toString()));
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
			Object roles = mapeo.get("rol");
			if (roles instanceof ArrayList){
				List<BaseVO> rolesLista = new ArrayList<BaseVO>();
				List arreglo = (ArrayList)roles;
				for (Object object : arreglo) {
					BaseVO rolBean = new BaseVO();
					rolBean.setCodigoEntero(Integer.valueOf(object.toString()));
					rolBean.getUsuarioCreacion().setCodigoEntero(this.obtenerUsuario(request).getCodigoEntero());
					rolBean.getUsuarioModificacion().setCodigoEntero(this.obtenerUsuario(request).getCodigoEntero());
					rolesLista.add(rolBean);
				}
				usuarioBean.setListaRoles(rolesLista);
			}
			
			try {
				seguridadRemote.registrarUsuario(usuarioBean);
			} catch (ErrorEncriptacionException | ErrorRegistroDataException
					| SQLException e) {
				log.error(e.getMessage(), e);
			}
		}
		else if("buscar".equals(accion)){
			try {
				String beanUsuario = request.getParameter("formulario");
				Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(beanUsuario);
				Usuario usuario = new Usuario();
				usuario.setUsuario((String) mapeo.get("usuario"));
				String codigoRol = (String) mapeo.get("codigoRol");
				BaseVO rol = new BaseVO();
				rol.setCodigoEntero(UtilWeb.parseInt(codigoRol));
				usuario.getListaRoles().add(rol);
				usuario.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
				Map<String, Object> objetos= new HashMap<String, Object>();
				objetos.put("usuarios", seguridadRemote.buscarUsuarios(usuario));
				
				respuesta.println(gson.toJson(objetos));
			} catch (ErrorConsultaDataException e) {
				log.error(e.getMessage(), e);
			}
		}
		else if ("grabarEditaUsuario".equals(accion)){
			String beanUsuario = request.getParameter("beanUsuario");
			Map<String, Object> mapeo = UtilWeb.convertirJsonAMap(beanUsuario);

			Usuario usuarioBean = new Usuario();
			usuarioBean.setCodigoEntero(Double.valueOf(mapeo.get("codigoEntero").toString()).intValue());
			usuarioBean.setNombres(mapeo.get("nombres").toString());
			usuarioBean.setApellidoPaterno(mapeo.get("apellidoPaterno").toString());
			usuarioBean.setApellidoMaterno(mapeo.get("apellidoMaterno").toString());
			usuarioBean.setIpCreacion(this.obtenerIp(request));
			usuarioBean.setIpModificacion(this.obtenerIp(request));
			usuarioBean.getEmpresa().setCodigoEntero(this.obtenerIdEmpresa(request));
			usuarioBean.getUsuarioCreacion().setCodigoEntero(this.obtenerUsuario(request).getCodigoEntero());
			usuarioBean.setUsuarioModificacion(this.obtenerUsuario(request));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				usuarioBean.setFechaNacimiento(sdf.parse(mapeo.get("fechaNacimiento").toString()));
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
			Object roles = mapeo.get("rol");
			if (roles instanceof ArrayList){
				List<BaseVO> rolesLista = new ArrayList<BaseVO>();
				List arreglo = (ArrayList)roles;
				for (Object object : arreglo) {
					BaseVO rolBean = new BaseVO();
					rolBean.setCodigoEntero(Integer.valueOf(object.toString()));
					rolBean.getUsuarioCreacion().setCodigoEntero(this.obtenerUsuario(request).getCodigoEntero());
					rolBean.getUsuarioModificacion().setCodigoEntero(this.obtenerUsuario(request).getCodigoEntero());
					rolesLista.add(rolBean);
				}
				usuarioBean.setListaRoles(rolesLista);
			}
			
			try {
				seguridadRemote.actualizarUsuario(usuarioBean);
			} catch (ErrorEncriptacionException | ErrorRegistroDataException e) {
				log.error(e.getMessage(), e);
			}
		}
		
	}
	
}
