// Methods for processing, chunking, and then uploading a file.

if (Meteor.isServer) {
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
			var providersArray = StorageProviders.find().fetch();
			var capacityArray = [];
			for (var i in providersArray) {
				var provider = providersArray[i];
				var capacity = provider[kStorageProvidersCapacity];
				capacityArray.push(capacity);
			}

			outputChunks = processFile(filename, dir, capacityArray);

			//insert file entry to FSEntries, get insert id
			fsinsert = {};
			fsinsert[kFSEntriesParent] = dir;
			fsinsert[kFSEntriesName] = filename;
			fsinsert[kFSEntriesType] = 0;

			fid = FSEntries.insert(fsinsert);

			//upload these chunks to the storage providers - identified using providersArray
			//also insert entries into FSChunkEntries
			for (var i in providersArray) {
				var provider = providersArray[i];
				var providerId = provider[kStorageProvidersID];
				var chunk = outputChunks[i];
				//dropbox
				if (providerId == 0) {
					//upload chunk to dropbox
				}
				//google
				else if (providerId == 1) {
					//upload chunk to google
				}

				//insert into FSChunkEntries
				fschunkinsert = {};
				fschunkinsert[kFSChunkEntriesFID] = fid;
				fschunkinsert[kFSChunkEntriesPID] = providerId;
				fschunkinsert[kFSChunkEntriesSeqnum] = i;
				FSChunkEntries.insert(fschunkinsert);
			}
		},

		downloadFile: function(filename, dir) {
			// get information about file in database (where is it stored?)
			
		}
	});
}