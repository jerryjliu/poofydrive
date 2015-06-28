StorageProvider_Dropbox = "dropbox";
StorageProvider_Google = "google";


// User:
// 		id:
//		user_id: (references the logged in user id)
// 		email:
// 		storage_providers: [{
// 			storage_provider_email:
// 			storage_provider_key:
// 			storage_provider_name:
//			storage_provider_capacity:
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


kUsersID = "_id";
kUsersUserID = "user_id";
kUsersEmail = "email";
kUsersSP = "storage_providers";
kUsersSPEmail = "storage_provider_email";
kUsersSPKey = "storage_provider_key";
kUsersSPName = "storage_provider_name";
kUsersSPCapacity = "storage_provider_capacity";
kUsersFiles = "files";

kFilesID = "_id";
kFilesUserID = "uid";
kFilesParent = "parent";
kFilesName = "name";
kFilesIsDir = "is_dir";

kFilesChunks = "chunks";
kFilesChunksStorageProvider = "chunk_storage_provider";
kFilesChunksSeqnum = "seqnum";
