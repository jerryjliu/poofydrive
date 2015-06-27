if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.productList.helpers({
    products: [
      {title: "Happy face", description: "I am a happy face"},
      {title: "Happy face", description: "I am a happy face"},
      {title: "Happy face", description: "I am a happy face"},
      {title: "Happy face", description: "I am a happy face"},
      {title: "Happy face", description: "I am a happy face"},
      {title: "Happy face", description: "I am a happy face"},
    ]
  })

}
