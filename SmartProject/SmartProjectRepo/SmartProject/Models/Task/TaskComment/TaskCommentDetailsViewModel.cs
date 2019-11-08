using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models.Task.TaskComment
{
    public class TaskCommentDetailsViewModel
    {
        public int CommentId { get; set; }
        public string UserName { get; set; }
        public string Content { get; set; }
        public bool IsActive { get; set; }
    }
}
