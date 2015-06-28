Router.route('/fileList')
Router.configure({
  layoutTemplate: 'layout',
})
Router.route('/loggedIn')
Router.route('/right')

Router.route('/', function(){
    this.render('logged-in');
});

Router.route('/dropboxauth', function() {
	var code = this.params.query.code;
	console.log("Code: " + code);
	Meteor.call('authFile', code);
	this.render('logged-in');
});