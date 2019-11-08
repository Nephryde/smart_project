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
        public UserBasicInfo User { get; set; }
        public TaskTypeModel Type { get; set; }
        public DateTime AddedDate { get; set; }
        public TaskStatusModel Status { get; set; }
        public TaskPriorityModel Priority { get; set; }
        public ICollection<TaskCommentModel> TaskComments { get; set; }
    }
}
