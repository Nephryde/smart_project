using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models.Task
{
    public class YourTasksViewModel
    {
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime AddedDate { get; set; }
        public string TypeName { get; set; }
        public TaskStatusModel Status { get; set; }
        public TaskPriorityModel Priority { get; set; }
    }
}
