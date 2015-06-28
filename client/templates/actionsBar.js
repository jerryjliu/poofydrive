Meteor.subscribe("fileUploads");
Template.fileList.helpers({
  theFiles: function () {
    console.log("HI");
    files = FileCollection.find().fetch();
    for (var i = 0; i < files.length; i++) {
      console.log(files[i].url());
    }
    console.log("HI");
    return FileCollection.find();
  }
});

Template.fileList.events({
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


// Template.uploadForm.events({
//   'change .fileInput': function(event, template) {
//     FS.Utility.eachFile(event, function(file) {
//       var fileObj = new FS.File(file);
//       console.log(fileObj.url());
//       var file = Files.insert(fileObj);
//       var fileId = file._id;
//     });
//   }
// });

