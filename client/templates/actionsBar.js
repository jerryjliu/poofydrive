Meteor.subscribe("fileUploads");
Template.uploadForm.helpers({
  theFiles: function () {
    files = FileCollection.find().fetch();
    for (var i = 0; i < files.length; i++) {
      url = files[i].url();
      url = url.split("?")[0];
      console.log(url);
      dir_map = Session.get("dir_map");
      console.log(Session.get("dir_map"));
      Meteor.call('uploadFile', url, dir_map);
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
