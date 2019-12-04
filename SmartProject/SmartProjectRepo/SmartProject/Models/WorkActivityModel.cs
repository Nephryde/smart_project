using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class WorkActivityModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<LoggedWorkTimeModel> TimeLogs { get; set; }
    }
}
