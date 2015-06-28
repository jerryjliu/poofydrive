Router.route('/fileList')
Router.configure({
  layoutTemplate: 'layout',
})
Router.route('/right')
Router.route('/', {name: "loggedIn"}); 

Router.route('/dropboxauth', function() {
	var code = this.params.query.code;
	console.log("Code: " + code);
	Meteor.call('authFile', code);
	this.render('logged-in');
});
