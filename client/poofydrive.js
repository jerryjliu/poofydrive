if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.set('dir_map', "Home")
  Session.set('uid', 0);

  //Meteor.startup(function() {
  // Meteor.call('processFile', 'test', '../../../../../test_dir/', [0.6, 0.4]);
  //   Meteor.call('unprocessFile', 'test', '../../../../../test_dir/', 2);
  //});

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });


  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);


  Template.right.events({
    'click #serverTesting': function (event) {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
      

      // Allows us to access Google Drive by getting permission
        
        window.open("https://www.dropbox.com/1/oauth2/authorize?client_id=muq1fnhg0cfrx3v&response_type=code&redirect_uri=http://localhost:3000/dropboxauth", "_self");

        // Need to change to make this wait
        Meteor.loginWithGoogle({
            requestPermissions: [],
            loginStyle: "popup"
          }, function(err) {
            if(err) {
              console.log('Error: ', err);
            } else {
              Router.go('home');
            }
        })
     }
   });
}
