FileCollection = new FS.Collection("fileCollection", {
  stores: [new FS.Store.FileSystem("fileCollection", {path: "~/meteor_uploads"})]
});
FileCollection.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  download: function (userId, doc) {
    return true;
  }
});
