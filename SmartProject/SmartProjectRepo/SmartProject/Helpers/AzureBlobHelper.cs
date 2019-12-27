using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace SmartProject.Helpers
{
    public class AzureBlobHelper
    {
        public static CloudBlobContainer GetBlobContainer(string connectionString)
        {
            CloudBlobClient blobClient = CloudStorageAccount.Parse(connectionString).CreateCloudBlobClient();

            CloudBlobContainer blobContainer = blobClient?.GetContainerReference("smartprojectcontainer");

            blobContainer.CreateIfNotExistsAsync();

            return blobContainer;
        }
    }
}