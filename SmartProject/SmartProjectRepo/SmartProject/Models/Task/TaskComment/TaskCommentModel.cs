using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models.Task
{
    public class TaskCommentModel
    {
        public int Id { get; set; }
        public TaskModel Task { get; set; }
        public UserBasicInfo User { get; set; }
        public string Content { get; set; }
        public bool IsActive { get; set; }
    }
}
