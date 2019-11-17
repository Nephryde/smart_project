using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ReleaseModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ProjectModel Project { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime? DeadlineDate { get; set; }
        public DateTime? ClosedDate { get; set; }
        public ICollection<ReleaseUserModel> ReleaseUsers { get; set; }
        public ICollection<TaskModel> Tasks { get; set; }
    }
}
