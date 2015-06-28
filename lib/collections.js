
var kFSEntriesID = "id";
var kFSEntriesParent = "parent";
var kFSEntriesName = "name";
var kFSEntriesType = "isDir";
FSEntries = new Mongo.Collection("FSEntries"); //info about entries in file system

var kFSChunkEntriesID = "id";
var kFSChunkEntriesFID = "fid"; //file id
var kFSChunkEntriesPID = "pid"; //provider id
var kFSChunkEntriesSeqnum = "seqnum"; //sequence number (which chunk is this in the file)?
FSChunkEntries = new Mongo.Collection("FSChunkEntries"); // into about how each file maps to chunks"

var kStorageProvidersID = "id"; //0 = dropbox, 1 = google
var kStorageProvidersCapacity = "capacity";
var kStorageProvidersNames = "names";
var kStorageProvidersLink = "link"; 
StorageProviders = new Mongo.Collection("StorageProviders"); //info about your storage providers, e.g. Dropbox, Google Drive
