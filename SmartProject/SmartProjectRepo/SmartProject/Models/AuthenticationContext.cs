using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartProject.Models.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class AuthenticationContext : IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options) : base(options)
        {
            
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<ProjectUserModel>()
        //        .HasKey(pu => new { pu.ProjectId, pu.UserId });
        //    modelBuilder.Entity<ProjectUserModel>()
        //        .HasOne(pu => pu.Project)
        //        .WithMany(b => b.ProjectUsers)
        //        .HasForeignKey(pu => pu.ProjectId);
        //    modelBuilder.Entity<ProjectUserModel>()
        //        .HasOne(pu => pu.User)
        //        .WithMany(c => c.ProjectUsers)
        //        .HasForeignKey(pu => pu.UserId);
        //}

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<TaskTypeModel> TaskTypes { get; set; }
        public DbSet<TaskPriorityModel> TaskPriorities { get; set; }
        public DbSet<TaskStatusModel> TaskStatuses { get; set; }
        public DbSet<TaskModel> Task { get; set; }
        public DbSet<UserBasicInfo> UserBasicInfo { get; set; }
        public DbSet<ProjectModel> Projects { get; set; }
        public DbSet<ProjectUserModel> ProjectUser { get; set; }
        public DbSet<TaskCommentModel> TaskComments { get; set; }


    }
}
