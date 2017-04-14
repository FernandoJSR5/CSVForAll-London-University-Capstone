Template.uploadSales.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadSales.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.uploadSales.events({
  'change [name="uploadCSV"]' ( event, template ) {
    template.uploading.set( true );

    Papa.parse( event.target.files[0], {
      header: true,
      dynamicTyping: true,
      complete( results, file ) {
        Meteor.call( 'parseUpload', results.data, ( error, response ) => {
          if ( error ) {
            console.log( error.reason );
            Materialize.toast('Error! the file is invalid!', 3000, 'red rounded');
          } else {
            template.uploading.set( false );
            Materialize.toast('Upload complete!', 3000, 'green rounded');
          }
        });
      }
    });
  }
});