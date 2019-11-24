using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartProject.Models;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly AuthenticationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProjectController(AuthenticationContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Project
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Object>>> GetProjects()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);
            
            var query = await (from pr in _context.Projects
                               join pu in _context.ProjectUser on pr.Id equals pu.ProjectId
                               where pu.UserId == user.UserBasic.Id
                               select new Dictionary<string, object>
                               {
                                   {"projectId", pr.Id },
                                   {"projectName", pr.Name },
                                   {"projectManagerName", pr.ProjectManager.FullName },
                                   {"projectClosed", pr.CloseDate < DateTime.Today ? true : false },
                                   {"projectAddedDate", pr.AddedDate },
                                   {"projectManagerId", pr.ProjectManager.Id }
                               })
                               .ToListAsync();

            return query;
        }

        [HttpGet]
        [HttpGet("{id}")]
        [Route("Releases/{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetProjectReleases(int id)
        { 
            var query = await (from r in _context.Releases
                               join pr in _context.Projects on r.Project.Id equals pr.Id
                               where r.Project.Id == id
                               select new Dictionary<string, object>
                               {                                 
                                   {"releaseName", r.Name },                        
                                   {"tasksCount", r.Tasks.Count },
                                   {"deadlineDate", r.DeadlineDate },
                                   {"releaseId", r.Id }
                               })
                               .ToListAsync();

            return query;
        }

        // GET: api/Project/5
        [HttpGet]
        [Route("GetProjectManagers")]
        public async Task<ActionResult<IEnumerable<Object>>> GetProjectManagers()
        {
            var query = await (from usr in _context.UserBasicInfo
                               select new Dictionary<string, object>
                               {
                                   {"id", usr.Id },
                                   {"fullName", usr.FullName }
                               })
                               .ToListAsync();

            return query;
        }

        // PUT: api/Project/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectModel(int id, ProjectModel projectModel)
        {
            if (id != projectModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Project
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Route("AddNewProject")]
        public async Task<ActionResult<ProjectModel>> PostProjectModel(ProjectModel projectModel)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);

            ProjectModel newProject = new ProjectModel()
            {
                Name = projectModel.Name,
                AddedDate = DateTime.Now
            };

            

            UserBasicInfo projManager = _context.UserBasicInfo.FirstOrDefault(x => x.Id == projectModel.ProjectManager.Id);
            newProject.ProjectManager = projManager;
            UserBasicInfo projCreator = _context.UserBasicInfo.FirstOrDefault(x => x.Id == user.UserBasic.Id);
            newProject.ProjectCreator = projCreator;

            try
            {
                _context.Projects.Add(newProject);              
                await _context.SaveChangesAsync();

                ProjectUserModel projMan = new ProjectUserModel()
                {
                    ProjectId = newProject.Id,
                    UserId = projectModel.ProjectManager.Id
                };
                _context.ProjectUser.Add(projMan);

                if(projManager.Id != user.UserBasic.Id)
                {
                    ProjectUserModel projCre = new ProjectUserModel()
                    {
                        ProjectId = newProject.Id,
                        UserId = user.UserBasic.Id
                    };
                    _context.ProjectUser.Add(projCre);
                }
                    
                var result = await _context.SaveChangesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // DELETE: api/Project/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectModel>> DeleteProjectModel(int id)
        {
            var projectModel = await _context.Projects.FindAsync(id);
            if (projectModel == null)
            {
                return NotFound();
            }

            _context.Projects.Remove(projectModel);
            await _context.SaveChangesAsync();

            return projectModel;
        }

        private bool ProjectModelExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }
}
