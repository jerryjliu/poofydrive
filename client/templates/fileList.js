if (Meteor.isClient) {
  Template.fileList.helpers({
    files: function() {
      return Files.find({'kFilesParent': Session.get('cwd')});
    }
  });

  Template.fileList.events({
    'click .fileItem': function(e) {
      var target = e.target;
      while (target.className !== "fileItem") {
        target = target.parentElement;
      }
      target = target.children[0];
      filename = $(target).data("filename");
      if ($(target).hasClass("fa-folder-o")) {
        Session.set("dir_map", Session.get("dir_map") + " > " + filename);
        console.log("cwd is " + filename);
        Session.set("cwd", filename);
      }
    }
  });
}
