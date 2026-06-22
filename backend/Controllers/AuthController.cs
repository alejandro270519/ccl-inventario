using CCL.Inventario.Api.Models;
using CCL.Inventario.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace CCL.Inventario.Api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly TokenService _tokenService;

    private static readonly Dictionary<string, string> _usuarios = new()
    {
        { "admin", "admin123" }
    };

    public AuthController(TokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (!_usuarios.TryGetValue(request.Usuario, out var password) || password != request.Contrasena)
            return Unauthorized(new { mensaje = "Credenciales inválidas" });

        var token = _tokenService.GenerarToken(request.Usuario);
        return Ok(new { token });
    }
}
