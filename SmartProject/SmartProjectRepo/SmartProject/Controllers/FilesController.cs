using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartProject.Abstracts;
using SmartProject.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IAzureBlobService azureBlobService;
        private readonly IAttachmentRepository attachmentRepository;

        public FilesController(IAzureBlobService azureBlobService, IAttachmentRepository attachmentRepository)
        {
            this.azureBlobService = azureBlobService;
            this.attachmentRepository = attachmentRepository;
        }

        [HttpPost]
        [Route("Upload")]
        public async Task<HttpResponseMessage> Post(IFormFile file, int projectId)
        {
            try
            {
                if (file == null)
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);

                MemoryStream fileStream = new MemoryStream();
                file.CopyTo(fileStream);

                return await azureBlobService.UploadFile(fileStream, file.FileName, projectId);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        [HttpGet]
        [Route("Attachments")]
        public async Task<IEnumerable<AttachmentModel>> Get(int projectId)
        {
            try
            {
                return await attachmentRepository.GetByProjectId(projectId);
            }
            catch (Exception ex)
            {
                throw new NullReferenceException();
            }
        }
    }
}