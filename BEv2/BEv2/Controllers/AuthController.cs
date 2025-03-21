using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BE.DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private static Dictionary<string, string> _refreshTokens = new();
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            if ((model.Username == "Admin" || model.Username == "User") && model.Password == "123")
            {
                var accessToken = GenerateJwtToken(model.Username, model.Username);
                var refreshToken = GenerateRefreshToken();

                _refreshTokens[model.Username] = refreshToken; // Lưu refresh token vào bộ nhớ

                return Ok(new { accessToken, refreshToken });
            }
            return Unauthorized("Invalid credentials.");
        }

        [HttpPost("refresh-token")]
        public IActionResult RefreshToken([FromBody] RefreshTokenRequest model)
        {
            var principal = GetPrincipalFromExpiredToken(model.AccessToken);
            if (principal == null) return Unauthorized("Invalid access token");

            var username = principal.Identity?.Name;
            if (username == null || !_refreshTokens.ContainsKey(username) || _refreshTokens[username] != model.RefreshToken)
            {
                return Unauthorized("Invalid refresh token");
            }

            var newAccessToken = GenerateJwtToken(username, username);
            var newRefreshToken = GenerateRefreshToken();

            _refreshTokens[username] = newRefreshToken; // Cập nhật refresh token mới

            return Ok(new { accessToken = newAccessToken, refreshToken = newRefreshToken });
        }
        private string GenerateJwtToken(string username, string role)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Role, role) // Add a single role
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpiresInMinutes"])),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray());
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }

            return principal;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok(new { message = "This is a protected route!" });
        }
    }
}
