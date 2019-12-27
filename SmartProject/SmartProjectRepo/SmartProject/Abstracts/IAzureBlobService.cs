using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmartProject.Abstracts
{
    public interface IAzureBlobService
    {
        public Task<HttpResponseMessage> UploadFile(Stream fileStream, string fileName);
    }
}