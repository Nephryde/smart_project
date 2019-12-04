using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class LoggedWorkTimeModel
    {
        public int Id { get; set; }      
        public decimal LoggedTime { get; set; }
        public WorkActivityModel WorkActivity { get; set; }
        public DateTime Date { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        public UserBasicInfo User { get; set; }
        public int TaskId { get; set; }
        public TaskModel Task { get; set; }
    }
}
