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
                                   {"projectManagerId", pr.ProjectManager.Id },
                                   {"projectCreatorId", pr.ProjectCreator.Id }
                               })
                               .Distinct()
                               .ToListAsync();

            return query;
        }

        [HttpGet]
        [Route("GetProjectInfo/{id}")]
        public async Task<ActionResult<Object>> GetProjectInfo(int id)
        {
            var query = await (from pr in _context.Projects
                               join pu in _context.ProjectUser on pr.Id equals pu.ProjectId
                               where pr.Id == id
                               select new Dictionary<string, object>
                               {
                                   {"projectId", pr.Id },
                                   {"projectName", pr.Name },
                                   {"projectManagerName", pr.ProjectManager.FullName },
                                   {"projectCreatorName", pr.ProjectCreator.FullName },
                                   {"projectAddedDate", pr.AddedDate },
                                   {"projectClosedDate", pr.CloseDate },
                                   {"projectClosed", pr.CloseDate < DateTime.Today ? true : false },
                                   {"projectManagerId", pr.ProjectManager.Id },
                                   {"projectCreatorId", pr.ProjectCreator.Id }
                               })
                              .FirstOrDefaultAsync();

            return query;
        }

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
                                       {"openedTasks", _context.Task.Count(x => x.Status.Id != 7 && x.Release.Id == r.Id && r.Project.Id == id) },
                                       {"deadlineDate", r.DeadlineDate },
                                       {"releaseId", r.Id }
                                   })
                                   .ToListAsync();

            return query;
        }



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

        [HttpGet]
        [Route("GetProjectRoles")]
        public async Task<ActionResult<IEnumerable<Object>>> GetProjectRoles()
        {
            var query = await (from roles in _context.ProjectRoles
                               select new Dictionary<string, object>
                               {
                                   {"id", roles.Id },
                                   {"name", roles.Name }
                               })
                               .ToListAsync();

            return query;
        }

        [HttpGet("{id}")]
        [Route("GetProjectUsers/{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetProjectUsers(int id)
        {
            var query = await (from pr in _context.Projects
                               join prus in _context.ProjectUser on pr.Id equals prus.ProjectId
                               join usr in _context.UserBasicInfo on prus.UserId equals usr.Id
                               where pr.Id == id
                               select new Dictionary<string, object>
                               {
                                   {"userId", usr.Id },
                                   {"userFullName", usr.FullName },
                                   {"roleId", prus.Role.Id }
                               })
                               .ToListAsync();

            return query;
        }

        [HttpGet]
        [Route("GetUsers/{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetUsers(int id)
        {
            var list1 = await _context.UserBasicInfo.ToListAsync();
            var list2 = await (from usr in _context.UserBasicInfo
                               join pu in _context.ProjectUser on usr.Id equals pu.UserId
                               where pu.ProjectId == 5 select usr).ToListAsync();

            var answer = list1.Except(list2).ToList();

            //var query = await (from usr in _context.UserBasicInfo
            //                   where !(from usrr in _context.UserBasicInfo
            //                           join pu in _context.ProjectUser on usrr.Id equals pu.UserId
            //                           where pu.ProjectId == 5
            //                           select usrr.Id)
            //                   select new Dictionary<string, object>
            //                   {
            //                       {"id", usr.Id },
            //                       {"fullName", usr.FullName }
            //                   })
            //                   .ToListAsync();

            return answer;
        }

        [HttpGet]
        [Route("GetRoles")]
        public async Task<ActionResult<IEnumerable<ProjectRolesModel>>> GetRoles()
        {
            return await _context.ProjectRoles.ToListAsync();
        }

        [HttpGet]
        [Route("GetProjectTasks/{id}")]
        public async Task<ActionResult<Object>> GetProjectTasks(int id)
        {
            var query = await (from pr in _context.Projects
                               join r in _context.Releases on pr.Id equals r.Project.Id
                               join t in _context.Task on r.Id equals t.Release.Id
                               where pr.Id == id
                               select new Dictionary<string, object>
                               {
                                   {"start", t.AddedDate.ToString() },
                                   {"end", t.DeadlineDate.ToString() },
                                   {"title", t.Title },
                                   {"color", t.Type.Id }
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

        [HttpPost]
        [Route("AddNewRelease")]
        public async Task<ActionResult<ReleaseModel>> PostReleaseModel(ReleaseModel releaseModel)
        {
            ReleaseModel newRelease = new ReleaseModel()
            {
                Name = releaseModel.Name,
                Project = _context.Projects.FirstOrDefault(x => x.Id == releaseModel.Project.Id),
                AddedDate = DateTime.Today,
                DeadlineDate = releaseModel.DeadlineDate
            };

            try
            {
                _context.Releases.Add(newRelease);           
                var result = await _context.SaveChangesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("AddProjectUser")]
        public async Task<ActionResult<ProjectUserModel>> AddProjectUser(ProjectUserModel projectUser)
        {
            ProjectModel project = _context.Projects.FirstOrDefault(x => x.Id == projectUser.ProjectId);
            UserBasicInfo user = _context.UserBasicInfo.FirstOrDefault(x => x.Id == projectUser.UserId);
            ProjectRolesModel role = _context.ProjectRoles.FirstOrDefault(x => x.Id == projectUser.Role.Id);

            ProjectUserModel newProjectUser = new ProjectUserModel()
            {
                ProjectId = projectUser.ProjectId,
                Project = project,
                UserId = projectUser.UserId,
                User = user,
                Role = role
            };

            var x = newProjectUser;

            try
            {
                _context.ProjectUser.Add(newProjectUser);
                var result = await _context.SaveChangesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
        [HttpDelete]
        [Route("DeleteProjectUser/{userId}/{projectId}")]
        public async Task<ActionResult<ProjectUserModel>> DeleteProjectModel(int userId, int projectId)
        {
            var projectUserModel = await _context.ProjectUser.FirstOrDefaultAsync(x => x.UserId == userId && x.ProjectId == projectId && x.Role != null);
            if (projectUserModel == null)
            {
                return NotFound();
            }

            _context.ProjectUser.Remove(projectUserModel);
            await _context.SaveChangesAsync();

            return projectUserModel;
        }

        private bool ProjectModelExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("GetWorkTime")]
        public async Task<ActionResult<IEnumerable<Object>>> GetWorkTime()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);

            var query = await (from pr in _context.Projects
                               join pu in _context.ProjectUser on pr.Id equals pu.ProjectId
                               join r in _context.Releases on pr.Id equals r.Project.Id
                               join t in _context.Task on r.Id equals t.Release.Id
                               join lwt in _context.LoggedWorkTime on t.Id equals lwt.TaskId
                               join wa in _context.WorkActivities on lwt.WorkActivity.Id equals wa.Id
                               where pu.UserId == user.UserBasic.Id
                               select new Dictionary<string, object>
                               {
                                   {"projectName", pr.Name },
                                   {"releaseName", r.Name },
                                   {"taskId", t.Id },
                                   {"taskName", t.Title },
                                   {"time", lwt.LoggedTime },
                                   {"activity", wa.Name },
                                   {"date", lwt.Date },
                                   {"comment", lwt.Comment }
                               })
                               .Distinct()
                               .ToListAsync();

            return query;
        }

        [HttpGet]
        [Route("GetDailySchedule")]
        public async Task<ActionResult<IEnumerable<Object>>> GetDailySchedule()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);

            var query = await (from lwt in _context.LoggedWorkTime
                               join wa in _context.WorkActivities on lwt.WorkActivity.Id equals wa.Id
                               where lwt.UserId == user.UserBasic.Id && lwt.Date.Date == DateTime.UtcNow.Date
                               select new Dictionary<string, object>
                               {
                                   {"key", wa.Name },
                                   {"hours", lwt.LoggedTime },
                               })
                               .ToListAsync();

            return query;
        }
    }
}
