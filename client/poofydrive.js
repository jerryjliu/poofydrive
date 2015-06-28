if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Meteor.startup(function() {
     Meteor.call('processFile', 'test', '../../../../../test_dir/', [0.6, 0.4]);
     Meteor.call('unprocessFile', 'test', '../../../../../test_dir/', 2);
  });

  // Template.hello.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.hello.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });

}
