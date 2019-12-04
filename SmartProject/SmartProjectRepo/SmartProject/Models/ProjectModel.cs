using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Models
{
    public class ProjectModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime? CloseDate { get; set; }
        [ForeignKey("ProjectManagerId")]
        public UserBasicInfo ProjectManager { get; set; }
        [ForeignKey("ProjectCreatorId")]
        public UserBasicInfo ProjectCreator { get; set; }
        public ICollection<ReleaseModel> Releases { get; set; }
        public ICollection<ProjectUserModel> ProjectUsers { get; set; }
    }
}
