// Methods for processing, chunking, and then uploading a file.

if (Meteor.isServer) {
  FS.debug = true;

	Meteor.methods({

		//should return all chunks
		processFile: function(filename, dir, capacityArray) {
			console.log("chunking file");
			var total = 0;
			for (var i in capacityArray) {
				total += capacityArray[i];
			}
			for (var i in capacityArray) {
				capacityArray[i] /= total;
			}
			for (var i in capacityArray) {
				if (i > 0) {
					capacityArray[i] += capacityArray[i-1];
				}
			}

			var fs = Npm.require("fs");
			// delete existing temp files
			for (var i in capacityArray) {
				var outputFile = dir + filename + "_part_" + i;
				try {
					fs.unlinkSync(outputFile);
				}
				catch(err) {

				}
			}
			var fileContents = fs.readFileSync(dir + filename);
			if (fileContents.length == 0) {
				return null;
			}

			var a = 0;
			var returnArray = [];
			fs.writeFileSync(dir + filename + "_TESTING", fileContents);
			var prev = 0;
			for (var i in capacityArray) {
				var newlength = Math.floor(fileContents.length * capacityArray[i]);
				var bufslice = fileContents.slice(prev, newlength);
				var outputFile = dir + filename + "_part_" + i;
				fs.writeFileSync(outputFile, bufslice);
				returnArray.push(outputFile);
				prev = newlength;
			}
			return returnArray;
		},
		// should have uploaded file
		uploadFile: function(filename, dir, parent) {
			//get information about all providers
			var user = Users.find({user_id: this.userId}).fetch();
			var providersArray = user[kUsersSP];
			var capacityArray = [];
			for (var i in providersArray) {
				var provider = providersArray[i];
				var capacity = provider[kUsersSPCapacity];
				capacityArray.push(capacity);	
			}

			outputChunks = processFile(filename, dir, capacityArray);

			//build file entry to Files
			fsinsert = {};
			fsinsert[kFilesUserID] = user[kUsersUserID];
			fsinsert[kFilesParent] = dir;
			fsinsert[kFilesName] = filename;
			fsinsert[kFilesIsDir] = 0;
			fsinsert[kFilesChunks] = [];

			//upload these chunks to the storage providers - identified using providersArray
			//also insert entries into FSChunkEntries
			for (var i in providersArray) {
				var provider = providersArray[i];
				var providerId = provider[kUsersSPName];
				var chunk = outputChunks[i];
				//dropbox
				if (providerId == StorageProvider_Dropbox) {
					//upload chunk to dropbox
				}
				//google
				else if (providerId == StorageProvider_Google) {
					//upload chunk to google
				}

				//insert into FSChunkEntries
				fschunkinsert = {};
				fschunkinsert[kFilesChunksStorageProvider] = providerId;
				fschunkinsert[kFilesChunksSeqnum] = i;
				fsinsert[kFilesChunks].push(fschunkinsert);
			}
			var fid = Files.insert(fsinsert);

			//append fid to user
			var file_ids = user[kUsersFiles];
			file_ids.push(fid);
			Users.update({user_id: this.userId},
			{
				$set: {files: file_ids}
			});
		},

		unprocessFile: function(filename, dir, numParts) {
			console.log("unchunking file");
			var fs = Npm.require("fs");
			var outputFile = dir + filename;
			try {
				fs.unlinkSync(outputFile);
			}
			catch(e) {
			}
			for (var i = 0; i < numParts; i++) {
				var outputFilePart = dir + filename + "_part_" + i;
				var fileContents = fs.readFileSync(outputFilePart);
				fs.appendFileSync(outputFile, fileContents);
				fs.unlinkSync(outputFilePart);
			}
		},
		downloadFile: function(filename, dir) {
			// get information about file in database (where is it stored?)
			var file = Files.findOne({uid: this.userId, name: filename});
			var chunks = file[kFilesChunks];
			//identify each of these chunks and download from providers
			for (var i in chunks) {
				var chunk = chunks[i];
				var storage_provider = chunk[kFilesChunksStorageProvider];
				var seqnum = chunk[kFilesChunksSeqnum];
				if (storage_provider == StorageProvider_Dropbox) {
					//download from dropbox

				}
				else if (storage_provider == StorageProvider_Google) {
					//download from google

				}
			}
			unprocessFile(filename, dir, chunks.length);
		},
		deleteFile: function(filename, dir) {
			var user = Users.findOne({user_id: this.userId});
			var file = Files.findOne({uid: this.userId, name: filename});
			var fid = file["_id"];
			var chunks = file[kFilesChunks];
			//identify each of these chunks and download from providers
			for (var i in chunks) {
				var chunk = chunks[i];
				var storage_provider = chunk[kFilesChunksStorageProvider];
				var seqnum = chunk[kFilesChunksSeqnum];
				if (storage_provider == StorageProvider_Dropbox) {
					//delete from dropbox

				}
				else if (storage_provider == StorageProvider_Google) {
					//delete from google

				}
			}
			Files.remove({uid: this.userId, name: filename});
			//remove from users
			var file_ids = user[kUsersFiles];
			var to_delete = -1;
			for (var i in file_ids) {
				if (fid == file_ids[i]) {
					to_delete = i;
				}
			}
			file_ids.splice(to_delete, 1);
			Files.update({user_id: this.userId},
			{
				$set: {files: file_ids}
			});
		}
	});
}
