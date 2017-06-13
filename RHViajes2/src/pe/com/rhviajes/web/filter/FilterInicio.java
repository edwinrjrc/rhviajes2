package pe.com.rhviajes.web.filter;

import java.io.IOException;

import javax.ejb.EJB;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import pe.com.viajes.bean.base.BaseVO;
import pe.com.viajes.negocio.ejb.SeguridadRemote;
import pe.com.viajes.negocio.exception.ErrorConsultaDataException;

/**
 * Servlet Filter implementation class FilterInicio
 */
@WebFilter(filterName="FilterInicio", urlPatterns={"/paginas/*"})
public class FilterInicio implements Filter {

	@EJB(lookup="java:jboss/exported/RHViajes2EJBEAR/RHViajes2EJB/SeguridadSession!pe.com.viajes.negocio.ejb.SeguridadRemote")
	public SeguridadRemote seguridadRemote;
	
    /**
     * Default constructor. 
     */
    public FilterInicio() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		
		HttpServletRequest httpRequest = ((HttpServletRequest)request);
		HttpSession session = httpRequest.getSession(false);
		
		try {
			Object empresaBean = session.getAttribute("EMPRESA_SESSION");
			if (empresaBean == null){
				session.setAttribute("EMPRESA_SESSION", seguridadRemote.consultarEmpresa(httpRequest.getUserPrincipal().getName()));
			}
			
			Object usuarioBean = session.getAttribute("USUARIO_SESSION");
			if (usuarioBean == null){
				BaseVO empresa = (BaseVO) session.getAttribute("EMPRESA_SESSION");
				session.setAttribute("USUARIO_SESSION", seguridadRemote.consultarUsuario(httpRequest.getUserPrincipal().getName(), empresa.getCodigoEntero()));
			}
		} catch (ErrorConsultaDataException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
