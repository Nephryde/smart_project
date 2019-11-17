using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ProjectModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime? CloseDate { get; set; }
        public UserBasicInfo ProjectManager { get; set; }
        public ICollection<ReleaseModel> Releases { get; set; }
        public ICollection<ProjectUserModel> ProjectUsers { get; set; }
    }
}
