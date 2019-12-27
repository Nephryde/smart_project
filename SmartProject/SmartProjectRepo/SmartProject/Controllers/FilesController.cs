using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SmartProject.Abstracts;
using SmartProject.Models;

namespace SmartProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    { 
        private readonly AuthenticationContext context;
        private readonly IAzureBlobService azureBlobService;

        public FilesController(AuthenticationContext context, IConfiguration configuration, IAzureBlobService azureBlobService)
        {
            this.context = context;
            this.azureBlobService = azureBlobService;
        }

        [HttpPost]
        [Route("Upload")]
        public async Task<HttpResponseMessage> Post(IFormFile file)
        {
            try
            {
                if (file == null)
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);

                MemoryStream fileStream = new MemoryStream();
                file.CopyTo(fileStream);

                return await azureBlobService.UploadFile(fileStream, file.FileName);
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }
        }
    }
}