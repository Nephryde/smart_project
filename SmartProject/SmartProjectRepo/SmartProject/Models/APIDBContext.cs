using Microsoft.EntityFrameworkCore;
using SmartProject.Models.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class APIDBContext : DbContext
    {
        public APIDBContext(DbContextOptions<APIDBContext> options) : base (options)
        {

        }

        public DbSet<TaskTypeModel> TaskTypes { get; set; }
        public DbSet<TaskPriorityModel> TaskPriorities { get; set; }
        public DbSet<TaskStatusModel> TaskStatuses { get; set; }
        public DbSet<TaskModel> Task { get; set; }
    }
}
