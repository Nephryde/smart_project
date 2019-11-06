using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartProject.Models;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly APIDBContext _context;

        public DashboardController(APIDBContext context)
        {
            _context = context;
        }

        // GET: api/Dashboard
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTask()
        {
            return await _context.Task
                .Include(x => x.Priority)
                .Include(x => x.Status)
                .Include(x => x.Type)
                .ToListAsync();
        }

        // GET: api/Dashboard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTaskModel(int id)
        {
            var taskModel = await _context.Task.FindAsync(id);

            if (taskModel == null)
            {
                return NotFound();
            }

            return taskModel;
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
