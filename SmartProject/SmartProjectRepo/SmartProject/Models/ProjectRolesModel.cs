using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ProjectRolesModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ProjectUserModel> ProjectUsers { get; set; }
    }
}
