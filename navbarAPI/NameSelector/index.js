const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

module.exports = async function (context, req) {
  try {
    // Connect to Azure Blob storage using your storage account connection string
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AzureWebJobsStorage
    );

    // Access the container and blob where your JSON file is stored
    const containerName = "nameselector";
    const blobName = "InputValues.json";

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    if (req.method === "GET") {
      // Download the JSON file content
      const downloadResponse = await blockBlobClient.download();
      const content = await streamToString(downloadResponse.readableStreamBody);

      context.res = {
        status: 200,
        body: content,
        headers: {
          "Content-Type": "application/json"
        }
      };
    } else if (req.method === "POST") {
      // Retrieve the JSON data from the request body
      const { data } = req.body;

      // Convert the data to a string
      const updatedContent = JSON.stringify(data);

      // Upload the updated JSON content to the blob, replacing the existing content
      await blockBlobClient.upload(updatedContent, Buffer.byteLength(updatedContent));

      context.res = {
        status: 200,
        body: "JSON file updated successfully.",
      };
    } else {
      context.res = {
        status: 400,
        body: "Invalid HTTP method.",
      };
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

// Helper function to convert a ReadableStream to a string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}
