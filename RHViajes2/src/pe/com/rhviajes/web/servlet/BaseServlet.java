package pe.com.rhviajes.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import pe.com.viajes.bean.base.BaseVO;
import pe.com.viajes.bean.negocio.Usuario;

/**
 * Servlet implementation class BaseServlet
 */
@WebServlet("/servlets/BaseServlet")
public abstract class BaseServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	public static final String ACCION_LISTAR = "listar";
	public static final String ACCION_BUSCAR = "buscar";
	public static final String ACCION_CONSULTAR = "consultar";
	public static final String ACCION_GUARDAR = "guardar";
	public static final String ACCION_ACTUALIZAR = "actualizar";
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BaseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected abstract void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected abstract void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
	
	protected String obtenerIp(HttpServletRequest request){
		return request.getRemoteAddr();
	}
	
	protected Usuario obtenerUsuario(HttpServletRequest request){
		return (Usuario) obtenerSession(request).getAttribute("USUARIO_SESSION");
	}

	protected HttpSession obtenerSession (HttpServletRequest request){
		return request.getSession(false);
	}
	
	protected Integer obtenerIdEmpresa (HttpServletRequest request){
		return ((BaseVO)obtenerSession(request).getAttribute("EMPRESA_SESSION")).getCodigoEntero();
	}
	
	protected BaseVO obtenerEmpresa (HttpServletRequest request){
		return ((BaseVO)obtenerSession(request).getAttribute("EMPRESA_SESSION"));
	}
}
