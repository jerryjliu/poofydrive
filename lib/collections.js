
var kFSEntriesID = "id";
var kFSEntriesParent = "parent";
var kFSEntriesName = "name";
var kFSEntriesType = "type";
FSEntries = new Mongo.Collection("FSEntries"); //info about entries in file system

var kStorageProvidersCapacity = "capacity";
var kStorageProvidersNames = "names";
StorageProviders = new Mongo.Collection("StorageProviders"); //info about your storage providers, e.g. Dropbox, Google Drive