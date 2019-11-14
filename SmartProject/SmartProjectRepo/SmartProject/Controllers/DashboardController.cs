using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartProject.Models;
using SmartProject.Models.Task;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AuthenticationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public DashboardController(AuthenticationContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Dashboard
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<YourTasksViewModel>>> GetTask()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);

            var query = await (from t in _context.Task
                               join u in _context.UserBasicInfo on t.UserCreated.Id equals u.Id
                               join ts in _context.TaskStatuses on t.Status.Id equals ts.Id
                               join tp in _context.TaskPriorities on t.Priority.Id equals tp.Id
                               where t.UserAssigned.Id == user.UserBasic.Id
                               select new YourTasksViewModel
                               {
                                   TaskId = t.Id,
                                   Title = t.Title,
                                   Author = t.UserCreated.FullName,
                                   AddedDate = t.AddedDate,
                                   TypeName = t.Type.TypeName,
                                   Status = t.Status,
                                   Priority = t.Priority
                               })
                               .ToListAsync();

            return query;
        }

        // GET: api/Dashboard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDetailsViewModel>> GetTaskModel(int id)
        {
            var query = await (from t in _context.Task
                               join u in _context.UserBasicInfo on t.UserCreated.Id equals u.Id
                               join ts in _context.TaskStatuses on t.Status.Id equals ts.Id
                               join tp in _context.TaskPriorities on t.Priority.Id equals tp.Id
                               join tr in _context.Releases on t.Release.Id equals tr.Id
                               where t.Id == id
                               select new TaskDetailsViewModel
                               {
                                   TaskId = t.Id,
                                   Title = t.Title,
                                   ProjectId = t.Release.Project.Id,
                                   ProjectName = t.Release.Project.Name,
                                   ReleaseId = t.Release.Id,
                                   ReleaseName = t.Release.Name,
                                   AuthorId = t.UserCreated.Id,
                                   AuthorName = t.UserCreated.FullName,
                                   UserAssignedId = t.UserAssigned.Id,
                                   UserAssignedName = t.UserAssigned.FullName,
                                   ModifiedDate = t.ModifiedDate,
                                   AddedDate = t.AddedDate,
                                   DeadlineDate = t.DeadlineDate,
                                   Status = t.Status.StatusName,
                                   Priority = t.Priority.PriorityName,
                                   Type = t.Type.TypeName,
                                   EstimatedTime = t.EstimatedTime,
                                   Progress = t.Status.Id,
                                   Description = t.Description
                               })
                               .SingleOrDefaultAsync();

            var x = query;

            //var taskModel = await _context.Task
            //    .Include(x => x.UserCreated)
            //    .Include(x => x.Priority)
            //    .Include(x => x.Status)
            //    .Include(x => x.Type)
            //    .FirstOrDefaultAsync(x => x.Id == id);

            //if (taskModel == null)
            //{
            //    return NotFound();
            //}

            return query;
        }

        // PUT: api/Dashboard/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskModel(int id, TaskModel taskModel)
        {
            if (id != taskModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskModelExists(id))
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

        // POST: api/Dashboard
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TaskModel>> PostTaskModel(TaskModel taskModel)
        {
            _context.Task.Add(taskModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskModel", new { id = taskModel.Id }, taskModel);
        }

        // DELETE: api/Dashboard/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskModel>> DeleteTaskModel(int id)
        {
            var taskModel = await _context.Task.FindAsync(id);
            if (taskModel == null)
            {
                return NotFound();
            }

            _context.Task.Remove(taskModel);
            await _context.SaveChangesAsync();

            return taskModel;
        }

        private bool TaskModelExists(int id)
        {
            return _context.Task.Any(e => e.Id == id);
        }
    }
}
