using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartProject.Models;
using SmartProject.Models.Task;
using SmartProject.Models.Task.TaskComment;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AuthenticationContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TaskController(AuthenticationContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Task/Task/5
        [HttpGet("{id}")]
        [Route("Task/{id}")]
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

            return query;
        }

        [HttpPost]
        [Route("AddNewTask")]
        public async Task<ActionResult<TaskModel>> PostTaskModel(TaskModel taskModel)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.Users.Include(x => x.UserBasic).FirstOrDefaultAsync(x => x.Id == userId);

            TaskModel newTask = new TaskModel()
            {
                Title = taskModel.Title,
                UserCreated = _context.UserBasicInfo.FirstOrDefault(x => x.Id == user.UserBasic.Id),
                UserAssigned = _context.UserBasicInfo.FirstOrDefault(x => x.Id == taskModel.UserAssigned.Id),
                EstimatedTime = taskModel.EstimatedTime,
                AddedDate = DateTime.Today,
                DeadlineDate = taskModel.DeadlineDate,
                Type = _context.TaskTypes.FirstOrDefault(x => x.Id == taskModel.Type.Id),
                Status = _context.TaskStatuses.FirstOrDefault(x => x.Id == 1),
                Priority = _context.TaskPriorities.FirstOrDefault(x => x.Id == taskModel.Priority.Id),
                Release = _context.Releases.FirstOrDefault(x => x.Id == taskModel.Release.Id),
                Description = taskModel.Description
            };

            try
            {
                _context.Task.Add(newTask);
                var result = await _context.SaveChangesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // GET: api/Task/Task/5
        [HttpGet("{id}")]
        [Route("ReleaseTasks/{id}")]
        public async Task<ActionResult<IEnumerable<Object>>> GetReleaseTasks(int id)
        {
            var query = await (from t in _context.Task
                               join r in _context.Releases on t.Release.Id equals r.Id
                               join u in _context.UserBasicInfo on t.UserAssigned.Id equals u.Id
                               where t.Release.Id == id
                               select new Dictionary<string, object>
                               {
                                   {"taskPriotiryId", t.Priority.Id },
                                   {"taskStatusId", t.Status.Id },
                                   {"taskTypeId", t.Type.Id },
                                   {"taskId", t.Id },
                                   {"taskTitle", t.Title },
                                   {"taskAuthor", t.UserCreated.FullName },
                                   {"taskAssignedTo", t.UserAssigned.FullName },
                                   {"taskType", t.Type.TypeName },
                                   {"taskStatus", t.Status.StatusName },
                                   {"taskPriority", t.Priority.PriorityName },
                                   {"taskAddedDate", t.AddedDate },
                                   {"taskDeadlineDate", t.DeadlineDate },
                                   {"taskModifiedDate", t.ModifiedDate }                             
                               })
                               .ToListAsync();

            var x = query;

            return query;
        }

        // GET: api/Task
        [HttpGet("{taskId}")]
        [Route("GetTaskComments/{taskId}")]
        public async Task<ActionResult<IEnumerable<TaskCommentDetailsViewModel>>> GetTaskComments(int taskId)
        {
            var query = await (from tc in _context.TaskComments
                               join u in _context.UserBasicInfo on tc.User.Id equals u.Id
                               join t in _context.Task on tc.Task.Id equals t.Id
                               where tc.Task.Id == taskId
                               select new TaskCommentDetailsViewModel
                               {
                                   CommentId = tc.Id,
                                   UserName = u.FullName,
                                   Content = tc.Content,
                                   IsActive = tc.IsActive
                               })
                               .ToListAsync();

            return query;
        }

        [HttpGet]
        [Route("Activities")]
        public async Task<ActionResult<IEnumerable<WorkActivityModel>>> GetTimeLogActivities()
        {
            return await _context.WorkActivities.ToListAsync();
        }

        [HttpGet]
        [Route("TaskTypes")]
        public async Task<ActionResult<IEnumerable<TaskTypeModel>>> GetTaskTypes()
        {
            return await _context.TaskTypes.ToListAsync();
        }

        [HttpGet]
        [Route("TaskStatuses")]
        public async Task<ActionResult<IEnumerable<TaskStatusModel>>> GetTaskStatutes()
        {
            return await _context.TaskStatuses.ToListAsync();
        }

        [HttpGet]
        [Route("TaskPriorities")]
        public async Task<ActionResult<IEnumerable<TaskPriorityModel>>> GetTaskPriorities()
        {
            return await _context.TaskPriorities.ToListAsync();
        }
    }
}
