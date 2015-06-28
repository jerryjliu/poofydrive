// Methods for processing, chunking, and then uploading a file.

if (Meteor.isServer) {
  FS.debug = true;

	Meteor.methods({

		//should return all chunks
		processFile: function(filename, dir, capacityArray) {
			var total = 0;
			for (var i in capacityArray) {
				total += capacityArray[i];
			}
			for (var i in capacityArray) {
				capacityArray[i] /= total;
			}

			var fs = Npm.require("fs");
			var fileContents = fs.readFileSync(dir + filename);

			if (fileContents.length == 0) {
				return null;
			}

			var a = 0;
			var curFraction = 0;
			var returnArray = [];
			var outputFile = dir + filename + "_part_0";
			returnArray.append(outputFile);
			for(var i = 0; i < fileContents.length; i++) {
				var fraction = i / fileContents.length;
				if (fraction > curFraction) {
					a++;
					var outputFile = dir + filename + "_part_" + a;
					curFraction += capacityArray[a];
					returnArray.append(outputFile);
				}
				fs.appendFileSync(outputFile, fileContents[i]);
			}
			return returnArray;
		},
		// should have uploaded files
		uploadFile: function(filename, dir) {
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
			fsinsert[kFilesUserID] = user[kUsersID];
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
				fsinsert[kFilesChunks].append(fschunkinsert);
			}
			FSEntries.insert(fsinsert);
		},

		downloadFile: function(filename, dir) {
			// get information about file in database (where is it stored?)

		}
	});
}
