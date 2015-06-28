Meteor.subscribe("fileUploads");
Template.uploadForm.helpers({
  theFiles: function () {
    files = FileCollection.find().fetch();
    console.log(files);
    for (var i = 0; i < files.length; i++) {
      url = files[i].url();
      if (!url) {
        continue
      }
      url = url.split("?")[0];
      pieces = url.split("/");
      filename = pieces.pop();
      url = pieces.join("/") + "/";
      dir_map = Session.get("dir_map");
      fileId = files[i]._id;
      Meteor.call('uploadFile', filename, url, dir_map, fileId, "");
      Files.insert({"kFilesUserID": Session.get("uid"), "kFilesParent": dir_map, "kFilesName": filename, "kFilesIsDir": 0});
    }
    return FileCollection.find();
  }
});

Template.uploadForm.events({
  'click #deleteFileButton ': function (event) {
    console.log("deleteFile button ", this);
    FileCollection.remove({_id: this._id});
  },
  'change .your-upload-class': function (event, template) {
    console.log("uploading...")
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
      var yourFile = new FS.File(file);
      FileCollection.insert(yourFile, function (err, fileObj) {
        console.log("callback for the insert, err: ", err);
        if (!err) {
          console.log("inserted without error");
        }
        else {
          console.log("there was an error", err);
        }
      });
    });
  }
});
