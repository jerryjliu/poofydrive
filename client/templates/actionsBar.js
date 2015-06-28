var FilesStore = new FS.Store.GridFS('files-uploaded');

Files = new FS.Collection('files', {
  stores: [FilesStore],
})

Meteor.subscribe('files')

Template.uploadForm.events({
  'change .fileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      var fileObj = new FS.File(file);
      console.log(fileObj);
      console.log(Files);
      Files.insert(fileObj);
      console.log(fileObj.url);
    });
  }
});
