package pe.com.rhviajes.web.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import pe.com.viajes.bean.base.BaseVO;
import pe.com.viajes.negocio.ejb.SeguridadRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class ServletRol
 */
@WebServlet("/servlets/ServletRol")
public class ServletRol extends BaseServlet {
	
	private static final long serialVersionUID = 1L;
       
	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SeguridadSession!pe.com.viajes.negocio.ejb.SeguridadRemote")
	public SeguridadRemote seguridadRemote;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletRol() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    @Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
    @Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	response.setContentType("text/html; charset=UTF-8");
    	response.setCharacterEncoding("UTF-8");
		PrintWriter respuesta = response.getWriter();
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd'T'HH:mm:ss")
				.create();
		
		try {
			List<BaseVO> listaRoles = this.seguridadRemote.listarRoles(1);
			Map<String, Object> objetos= new HashMap<String, Object>();
			objetos.put("roles", listaRoles);
			
			respuesta.println(gson.toJson(objetos));
		} catch (ErrorConsultaDataException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
