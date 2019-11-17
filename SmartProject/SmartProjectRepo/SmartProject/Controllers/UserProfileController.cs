using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SmartProject.Models;
using Microsoft.EntityFrameworkCore;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly AuthenticationContext _context;
        private UserManager<ApplicationUser> _userManager;

        public UserProfileController(AuthenticationContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //GET : api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);

            var query = await (from u in _context.UserBasicInfo
                               join au in _context.ApplicationUsers on u.Id equals au.UserBasic.Id
                               where u.Id == user.UserBasic.Id
                               select new
                               {
                                   u.Id,
                                   u.FullName,
                                   au.Email
                               })
                               .FirstOrDefaultAsync();

            return query;
        }
    }
}