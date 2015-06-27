// Methods for processing, chunking, and then uploading a file.

if (Meteor.isServer) {
	Meteor.methods({

		//should return all chunks
		processFile: function(filename, capacityArray) {
			var total = 0;
			for (var i in capacityArray) {
				total += capacityArray[i];
			}
			for (var i in capacityArray) {
				capacityArray[i] /= total;
			}

			var fs = Npm.require("fs");
			var fileContents = fs.readFileSync(filename);

			if (fileContents.length == 0) {
				return null;
			}

			var a = 0;
			var curFraction = 0;
			var returnArray = [];
			var outputFile = filename + "_part_0";
			returnArray.append(outputFile);
			for(var i = 0; i < fileContents.length; i++) {
				var fraction = i / fileContents.length;
				if (fraction > curFraction) {
					a++;
					var outputFile = filename + "_part_" + a;
					curFraction += capacityArray[a];
					returnArray.append(outputFile);
				}
				fs.appendFileSync(outputFile, fileContents[i]);
			}
			return returnArray;
		},
		uploadFile: function(filename) {
			//get information about all providers
			var providersArray = StorageProviders.find().fetch();
			var capacityArray = [];
			for (var i in providersArray) {
				var provider = providersArray[i];
				var capacity = provider[kStorageProvidersCapacity];
				capacityArray.push(capacity);
			}

			outputChunks = processFile(filename, capacityArray);

			//insert file entry to FSEntries, get file

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
			}



		},

		downloadFile: function(filename) {
			// get information about file in database (where is it stored?)
		}
	});
}