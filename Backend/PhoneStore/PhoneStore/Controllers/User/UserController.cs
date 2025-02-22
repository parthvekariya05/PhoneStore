using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhoneStore.Data.Bill;
using PhoneStore.Data.PhoneDetail;
using PhoneStore.Data.User;
using PhoneStore.Model;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PhoneStore.Controllers.User
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public UserController(UserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetAllUser()
        {
            var phoneList = _userRepository.GetAllUser();
            return Ok(phoneList);
        }


        [HttpGet("{UserID}")]
        public IActionResult GetByUserID(int UserID)
        {
            var userList = _userRepository.GetByUserID(UserID);
            return Ok(userList);
        }

        [HttpDelete("{UserID}")]
        public IActionResult DeleteUser(int UserID)
        {
            var isDeleted = _userRepository.DeleteUser(UserID);
            if (isDeleted)
                return Ok(new { Message = "user deleted successfully." });
            else
                return NotFound(new { Message = "user not found or could not be deleted." });
        }


        [HttpPost]
        public IActionResult UserRegister([FromBody][Bind()] UserRegisterModel user)
        {
            if (user == null)
                return BadRequest(new { Message = "user data is required." });
            var isInserted = _userRepository.UserRegister(user);
            if (isInserted)
                return Ok(new { Message = "user Register successfully." });
            else
                return StatusCode(500, new { Message = "user could not be Register." });
        }


        [HttpPost]
        public IActionResult Login([FromBody] UserLoginModel user)
        {
            var userData = _userRepository.UserLogin(user);
            if (userData != null)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"] ),
                    new Claim(JwtRegisteredClaimNames.Jti,  Guid.NewGuid().ToString()),
                    new Claim("UserID", userData.UserID.ToString()),
                    new Claim("EmailAddress", userData.EmailAddress.ToString()),
                    new Claim("UserName", userData.UserName.ToString()),
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddDays(60),
                    signingCredentials: signIn
                    );

                string tockenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { Token = tockenValue, User = userData });
                
            }
            return BadRequest();
        }


        [HttpPut("{UserID}")]
        public IActionResult UserUpdate(int UserID, [FromBody] UserUpdateModel user)
        {
            if (user == null || UserID != user.UserID)
                return BadRequest(new { Message = "Invalid user data or ID mismatch." });

            var isUpdated = _userRepository.UserUpdate(user);
            if (isUpdated)
                return Ok(new { Message = "user updated successfully." });
            else
                return NotFound(new { Message = "user not found or could not be updated." });
        }


        [HttpPut("AdminUpdate")]
        public IActionResult AdminUpdate(int UserID, bool IsAdmin)
        {
            if (IsAdmin == null)
                return BadRequest(new { Message = "Invalid user data." });

            var isUpdated = _userRepository.AdminUpdate(UserID, IsAdmin);
            if (isUpdated)
                return Ok(new { Message = "admin updated successfully." });
            else
                return NotFound(new { Message = "admin not be updated." });
        }

        [HttpGet]
        public IActionResult UserCount()
        {
            var billList = _userRepository.UserCount();
            return Ok(billList);
        }


        [HttpGet("profile")]
        public IActionResult AdminProfile()
        {
            var adminProfile = new
            {
                Name = "Parth Patel",
                Role = "administrator",
                Avatar = "https://static.vecteezy.com/system/resources/previews/043/900/708/non_2x/user-profile-icon-illustration-vector.jpg",
            };

            return Ok(adminProfile);
        }
    }
}