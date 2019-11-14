using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ReleaseUserModel
    {
        public int Id { get; set; }
        public int ReleaseId { get; set; }
        public ReleaseModel Release { get; set; }
        public int UserId { get; set; }
        public UserBasicInfo User { get; set; }
    }
}
