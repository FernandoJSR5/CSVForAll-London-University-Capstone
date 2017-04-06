Template.uploadEstablishment.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadEstablishment.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.uploadEstablishment.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );
    Papa.parse( event.target.files[0], {
      header: true,
      dynamicTyping: true,
      complete( results, file ) {
        Meteor.call( 'parseUploadEstablishment', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
            Materialize.toast('Error! de file is invalid!', 3000, 'red rounded');
          } else {
            template.uploading.set( false );
            Materialize.toast('Upload complete!', 3000, 'green rounded');
          }
        });
      }
    });
  }
});