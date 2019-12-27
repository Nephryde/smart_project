using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage.Blob;
using SmartProject.Abstracts;
using SmartProject.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmartProject.Services
{
    public class AzureBlobService : IAzureBlobService
    {
        private readonly IConfiguration configuration;

        public AzureBlobService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<HttpResponseMessage> UploadFile(Stream fileStream, string fileName)
        {
            if (string.IsNullOrWhiteSpace(configuration["AzureBlobStorage:ConnectionString"]) || fileStream == null)
                return new HttpResponseMessage(HttpStatusCode.BadRequest);

            CloudBlobContainer blobContainer = AzureBlobHelper.GetBlobContainer(configuration["AzureBlobStorage:ConnectionString"]);

            CloudBlockBlob blockBlob = blobContainer.GetBlockBlobReference(fileName);

            await blockBlob.UploadFromStreamAsync(fileStream);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}