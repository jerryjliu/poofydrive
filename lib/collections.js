var StorageProvider_Dropbox = "dropbox";
var StorageProvider_Google = "google";


// User:
// 		id:
// 		email:
// 		storage_providers: [{
// 			storage_provider_email:
// 			storage_provider_key:
// 			storage_provider_name:
// 		}]

// 		files: [
// 			<list of file id's>
// 		]
// 

// Files:
// 		id:
// 		uid:
// 		parent:
// 		name:
// 		is_dir:
// 		chunks: [{
// 			chunk_storage_provider:
// 			seqnum:
// 		}]

Users = new Mongo.Collection("Users");
Files = new Mongo.Collection("Files");


var kUsersID = "_id";
var kUsersEmail = "email";
var kUsersSP = "storage_providers";
var kUsersSPEmail = "storage_provider_email";
var kUsersSPKey = "storage_provider_key";
var kUsersSPName = "storage_provider_name";


var kFilesID = "_id";
var kFilesUserID = "uid";
var kFilesParent = "parent";
var kFilesName = "name";
var kFilesIsDir = "is_dir";

var kFilesChunks = "chunks";
var kFilesChunksStorageProvider = "chunk_storage_provider";
var kFilesChunksSeqnum = "seqnum";
