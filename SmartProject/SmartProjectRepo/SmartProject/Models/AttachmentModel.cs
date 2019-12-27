namespace SmartProject.Models
{
    public class AttachmentModel
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public ProjectModel Project { get; set; }
    }
}