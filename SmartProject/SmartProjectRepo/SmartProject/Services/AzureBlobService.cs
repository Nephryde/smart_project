using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage.Blob;
using SmartProject.Abstracts;
using SmartProject.Dtos;
using SmartProject.Helpers;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmartProject.Services
{
    public class AzureBlobService : IAzureBlobService
    {
        private readonly IConfiguration configuration;
        private readonly IAttachmentRepository attachmentRepository;

        public AzureBlobService(IConfiguration configuration, IAttachmentRepository attachmentRepository)
        {
            this.configuration = configuration;
            this.attachmentRepository = attachmentRepository;
        }

        public async Task<HttpResponseMessage> UploadFile(Stream fileStream, string fileName, int projectId)
        {
            if (string.IsNullOrWhiteSpace(configuration["AzureBlobStorage:ConnectionString"]) || fileStream == null)
                return new HttpResponseMessage(HttpStatusCode.BadRequest);

            CloudBlobContainer blobContainer = AzureBlobHelper.GetBlobContainer(configuration["AzureBlobStorage:ConnectionString"]);

            CloudBlockBlob blockBlob = blobContainer.GetBlockBlobReference(fileName);

            await blockBlob.UploadFromStreamAsync(fileStream);

            await attachmentRepository.Add(new AttachmentDto
            {
                ProjectId = projectId,
                Path = blockBlob.Uri.AbsoluteUri,
                Name = fileName
            });

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}