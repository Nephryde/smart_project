﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
        public DbSet<ReleaseModel> Releases { get; set; }
        public DbSet<ReleaseUserModel> ReleaseUser { get; set; }
        public DbSet<WorkActivityModel> WorkActivities { get; set; }
        public DbSet<LoggedWorkTimeModel> LoggedWorkTime { get; set; }
        public DbSet<ProjectRolesModel> ProjectRoles { get; set; }

    }
}
