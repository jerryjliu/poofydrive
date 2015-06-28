// Methods for processing, chunking, and then uploading a file.

if (Meteor.isServer) {
  FS.debug = true;
  Meteor.publish("fileUploads", function () {
    console.log("publishing fileUploads");
    return FileCollection.find();
  });

  function processFile(filename, dir, capacityArray, fileId) {
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
        FileCollection.remove({_id: fileId});
			}
		}
		var fileContents;
    try {
      fileContents = fs.readFileSync(dir + filename);
    } catch (e) {
      if (e.code === 'ENOENT') {
      }
    }
    if (!fileContents) {
      return null;
    }
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
	}

	function unprocessFile(filename, dir, numParts) {
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
	}

	Meteor.methods({

		//should return all chunks
		processFile: processFile,
		// should have uploaded file
		uploadFile: function(filename, dir, parent, fileId, dropboxToken) {
			//get information about all providers
			var user = Users.find({user_id: this.userId}).fetch();
			//var providersArray = user[kUsersSP];
			providersArray = [{
				storage_provider_email: 'asdfasdf',
				storage_provider_key: 'asdfasdf',
				storage_provider_name: StorageProvider_Dropbox,
				storage_provider_capacity: 60
			},
			{
				storage_provider_email: 'asdfasdf',
				storage_provider_key: 'asdfasdf',
				storage_provider_name: StorageProvider_Google,
				storage_provider_capacity: 40
			},
			];
			var capacityArray = [];
			for (var i in providersArray) {
				var provider = providersArray[i];
				var capacity = provider[kUsersSPCapacity];
				capacityArray.push(capacity);	
			}
      console.log("HEYYY");
      console.log(dir);
      console.log("HEYYY");

			outputChunks = processFile(filename, dir, capacityArray, fileId);
      if (!outputChunks) {
        return null;
      }

			//build file entry to Files
			fsinsert = {};
			fsinsert[kFilesUserID] = user[kUsersUserID];
			fsinsert[kFilesParent] = parent;
			fsinsert[kFilesName] = filename;
			fsinsert[kFilesIsDir] = 0;
			fsinsert[kFilesChunks] = [];

			//console.log("before for loop: " + providersArray.length);
      
      console.log("Before");
      console.log(FileCollection.find().fetch());
      FileCollection.remove({_id: fileId});
      console.log("After");
      console.log(FileCollection.find().fetch());
      
			//upload these chunks to the storage providers - identified using providersArray
			//also insert entries into FSChunkEntries
			for (var i in providersArray) {
				var provider = providersArray[i];
				var providerId = provider[kUsersSPName];
				var chunk = outputChunks[i];
				var path = "temppath2";
				console.log("outside if loop");
				//dropbox
				if (providerId == StorageProvider_Dropbox) {
					var url_string = "https://api-content.dropbox.com/1/files_put/auto/" + path; 
					var fs = Npm.require("fs");
					var chunkContents = fs.readFileSync(chunk);
					//var newChunk = chunkContents.toString('utf8');
					var newChunk = chunkContents.toString("binary");
					console.log("pre chunk: ", dropboxToken);
					// set value of access_tokenn
					var account_info = HTTP.call("POST", url_string, {params: { overwrite: "true" }, content: newChunk, headers: {'Authorization': 'Bearer ' + dropboxToken}});		
					console.log("successful?");
					console.log(account_info);

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
			if (user[kUsersFiles] == null) {
				user[kUsersFiles] = [];
			}
			var file_ids = user[kUsersFiles];
			file_ids.push(fid);
			Users.update({user_id: this.userId},
			{
				$set: {files: file_ids}
			});
		},

		unprocessFile: unprocessFile,
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
		deleteFile: function(filename, dir, dropboxToken) {
			var user = Users.findOne({user_id: this.userId});
			var file = Files.findOne({uid: this.userId, name: filename});
			var fid = file["_id"];
			var chunks = file[kFilesChunks];
			//identify each of these chunks and download from providers
			console.log("delte before for");
			for (var i in chunks) {
				var chunk = chunks[i];
				var storage_provider = chunk[kFilesChunksStorageProvider];
				var seqnum = chunk[kFilesChunksSeqnum];
				if (storage_provider == StorageProvider_Dropbox) {
					console.log("delete before http");
					var url_string = "https://api-content.dropbox.com/1/fileops/delete"; 
					var account_info = HTTP.call("POST", url_string, {params: {root: "", path: "temppath"}}, {headers: {'Authorization': 'Bearer ' + dropboxToken, 'Content-Type': 'text/html'}});		
					console.log("delete after http");

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
		},
		
		'authFile': function(code) {
			console.log(code);
			console.log("server code");
			console.log("inner");

			// user enters login information, change redirect URI
			// get authorization token
			var access = HTTP.call("POST", "https://api.dropbox.com/1/oauth2/token", {params: {code: code, grant_type: "authorization_code", redirect_uri: "http://localhost:3000/dropboxauth", client_id: "muq1fnhg0cfrx3v", client_secret: "z4ukcmrqsvub78i"}});
		
			//var obj = JSON.parse(access);
			var content_obj = JSON.parse(access['content']);
        	token = content_obj['access_token'];
        	
        	console.log(token);

        	// tests returning account info
        	var account_info = HTTP.call("GET", "https://api.dropbox.com/1/account/info", {headers: {Authorization: 'Bearer ' + token}});		
			
        	console.log(account_info);
        	Meteor.call('uploadFile', 'test', '../../../../../test_dir/', "HOME/", token);
        	//Meteor.call('deleteFile', 'test', '../../../../../test_dir/', token);
		}
	
	});
}
