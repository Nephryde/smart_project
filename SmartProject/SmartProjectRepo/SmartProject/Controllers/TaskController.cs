﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        public TaskController(AuthenticationContext context)
        {
            _context = context;
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

        // GET: api/Task/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<TaskCommentModel>> GetTaskCommentModel(int id)
        //{
        //    var taskCommentModel = await _context.TaskComments.FindAsync(id);

        //    if (taskCommentModel == null)
        //    {
        //        return NotFound();
        //    }

        //    return taskCommentModel;
        //}

        // PUT: api/Task/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskCommentModel(int id, TaskCommentModel taskCommentModel)
        {
            if (id != taskCommentModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskCommentModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskCommentModelExists(id))
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

        // POST: api/Task
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<TaskCommentModel>> PostTaskCommentModel(TaskCommentModel taskCommentModel)
        {
            _context.TaskComments.Add(taskCommentModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskCommentModel", new { id = taskCommentModel.Id }, taskCommentModel);
        }



        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TaskCommentModel>> DeleteTaskCommentModel(int id)
        {
            var taskCommentModel = await _context.TaskComments.FindAsync(id);
            if (taskCommentModel == null)
            {
                return NotFound();
            }

            _context.TaskComments.Remove(taskCommentModel);
            await _context.SaveChangesAsync();

            return taskCommentModel;
        }

        private bool TaskCommentModelExists(int id)
        {
            return _context.TaskComments.Any(e => e.Id == id);
        }
    }
}