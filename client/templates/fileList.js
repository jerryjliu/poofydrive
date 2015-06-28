if (Meteor.isClient) {
  Template.fileList.helpers({
    files: function() {
      return Files.find({});
    }
  });

  Template.fileList.events({
    'click .fileItem': function(e) {
      alert("hi");
    }
  });
}
