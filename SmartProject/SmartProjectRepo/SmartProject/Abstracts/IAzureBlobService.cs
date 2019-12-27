using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmartProject.Abstracts
{
    public interface IAzureBlobService
    {
        public Task<HttpResponseMessage> UploadFile(Stream fileStream, string fileName, int projectId);
    }
}