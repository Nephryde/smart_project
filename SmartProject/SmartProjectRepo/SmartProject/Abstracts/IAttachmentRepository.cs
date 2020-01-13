using SmartProject.Dtos;
using SmartProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Abstracts
{
    public interface IAttachmentRepository
    {
        Task Add(AttachmentDto attachmentDto);
        Task<IEnumerable<AttachmentModel>> GetByProjectId(int projectId);
    }
}
