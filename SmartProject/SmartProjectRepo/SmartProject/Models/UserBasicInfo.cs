using SmartProject.Models.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class UserBasicInfo
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public ICollection<ProjectUserModel> ProjectUsers { get; set; }
        public ICollection<TaskCommentModel> TaskComments { get; set; }
    }
}
