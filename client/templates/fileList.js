if (Meteor.isClient) {
  Template.fileList.helpers({
    files: [
      {name: "Personal", isDir: true},
      {name: "Documents", isDir: true},
      {name: "Pictures", isDir: true},
      {name: "Resume.docx", isDir: false},
    ]
  });

  Template.fileList.events({
    'click .fa': function(e) {
      alert("HI");
    }
  });
}
