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
    'click .fileItem': function(e) {
      alert("hi");
      files =  [
        {name: "Happy", isDir: true},
        {name: "Documents", isDir: true},
        {name: "Pictures", isDir: true},
        {name: "Resume.docx", isDir: false},
      ];
    }
  });
}
