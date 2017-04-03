Template.nav.onRendered(function(){
	$('.button-collapse').sideNav({ 
    menuWidth: 260, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  });
  $(".dropdown-button").dropdown();	
});

Template.nav.helpers({
  genderIs: function(gender){
    if(Meteor.user() === null) return null;
    return Meteor.user().profile.gender === gender;
  }
});