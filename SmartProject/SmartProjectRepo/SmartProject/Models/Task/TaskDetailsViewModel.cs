using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models.Task
{
    public class TaskDetailsViewModel
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int ReleaseId { get; set; }
        public string ReleaseName { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public int UserAssignedId { get; set; }
        public string UserAssignedName { get; set; }
        public DateTime ModifiedDate { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime? DeadlineDate { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string Type { get; set; }
        public decimal? EstimatedTime { get; set; }
        public int Progress { get; set; }
        public string Description { get; set; }
    }
}
