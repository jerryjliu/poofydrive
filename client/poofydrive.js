if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

<<<<<<< HEAD
  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);


      // Allows us to access Google Drive by getting permission
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
=======
  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });

>>>>>>> origin/master
}
