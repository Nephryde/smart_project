using System;
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

        // GET: api/Task
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<TaskCommentDetailsViewModel>>> GetTaskComments(int id)
        {
            var query = await (from tc in _context.TaskComments
                               join u in _context.UserBasicInfo on tc.User.Id equals u.Id
                               join t in _context.Task on tc.Task.Id equals t.Id
                               where tc.Task.Id == id
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
