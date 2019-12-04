using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ProjectUserModel
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public ProjectModel Project { get; set; }
        public int UserId { get; set; }
        public UserBasicInfo User { get; set; }
        public ProjectRolesModel Role { get; set; }
    }
}
