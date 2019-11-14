using SmartProject.Models.Task;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public UserBasicInfo UserCreated { get; set; }
        public UserBasicInfo? UserAssigned { get; set; }
        public decimal? EstimatedTime { get; set; }      
        public DateTime AddedDate { get; set; }
        public DateTime? DeadlineDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public TaskTypeModel Type { get; set; }
        public TaskStatusModel Status { get; set; }
        public TaskPriorityModel Priority { get; set; }
        public ReleaseModel Release { get; set; }
        public string Description { get; set; }
        public ICollection<TaskCommentModel> TaskComments { get; set; }
    }
}
