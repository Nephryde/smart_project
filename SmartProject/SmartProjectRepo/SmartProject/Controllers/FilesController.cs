using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartProject.Abstracts;
using SmartProject.Models;

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
        [Route("Upload/{projectId}")]
        public async Task<HttpResponseMessage> Post(int projectId)
        {
            try
            {
                IFormFileCollection files = HttpContext.Request.Form.Files;

                if (files.Count == 0)
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);

                MemoryStream fileStream = new MemoryStream();
                files[0].CopyTo(fileStream);

                return await azureBlobService.UploadFile(fileStream, files[0].FileName, projectId);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }

        [HttpGet]
        [Route("Attachments/{projectId}")]
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