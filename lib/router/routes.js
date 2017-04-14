Router.configure({
  layoutTemplate: 'loginLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  yieldTemplates: {
      nav: {to: 'nav'}
  }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });
    this.route('uploadEstablishment', {
        path: '/upload_establishments',
        layoutTemplate: 'masterLayout'
    });
    this.route('establishmentsList', {
        path: '/establishments_list',
        layoutTemplate: 'masterLayout'
    });
    this.route('uploadSales', {
        path: '/upload_file',
        layoutTemplate: 'masterLayout'
    });
    this.route('salesList', {
        path: '/upload_list',
        layoutTemplate: 'masterLayout'
    });
});

Router.plugin('ensureSignedIn', {
  only: ['uploadEstablishment, establishmentsList, uploadSales, salesList']
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');