using SmartProject.Models.Task;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class UserBasicInfo
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        [InverseProperty("ProjectManager")]
        public ICollection<ProjectModel> ProjectManagers { get; set; }
        [InverseProperty("ProjectCreator")]
        public ICollection<ProjectModel> ProjectCreators { get; set; }
        public ICollection<ProjectUserModel> ProjectUsers { get; set; }
        public ICollection<TaskCommentModel> TaskComments { get; set; }
        public ICollection<ReleaseUserModel> ReleaseUsers { get; set; }
        public ICollection<LoggedWorkTimeModel> TimeLogs { get; set; }
    }
}
