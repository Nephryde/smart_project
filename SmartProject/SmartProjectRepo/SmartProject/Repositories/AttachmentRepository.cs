using Microsoft.EntityFrameworkCore;
using SmartProject.Abstracts;
using SmartProject.Dtos;
using SmartProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartProject.Repositories
{
    public class AttachmentRepository : IAttachmentRepository
    {
        private readonly AuthenticationContext context;

        public AttachmentRepository(AuthenticationContext context)
        {
            this.context = context;
        }

        public async Task Add(AttachmentDto attachmentDto)
        {
            await context.Attachments.AddAsync(new AttachmentModel
            {
                ProjectId = attachmentDto.ProjectId,
                Path = attachmentDto.Path,
                Name = attachmentDto.Name
            });

            await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<AttachmentModel>> GetByProjectId(int projectId)
            => await context.Attachments.Where(am => am.ProjectId == projectId).ToArrayAsync();
    }
}
