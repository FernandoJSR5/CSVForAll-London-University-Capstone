Router.configure({
  layoutTemplate: 'loginLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'pageNotFound',
  yieldTemplates: {
      nav: {to: 'nav'},
      footer: {to: 'footer'},
  }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });
    this.route('upload', {
        path: '/upload_file',
        layoutTemplate: 'masterLayout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'pageNotFound',
    });
    this.route('list', {
        path: '/upload_list',
        layoutTemplate: 'masterLayout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'pageNotFound',
    });
    this.route('uploadEstablishment', {
        path: '/upload_establishments',
        layoutTemplate: 'masterLayout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'pageNotFound',
    });
    this.route('establishmentsList', {
        path: '/establishments_list',
        layoutTemplate: 'masterLayout',
        loadingTemplate: 'loading',
        notFoundTemplate: 'pageNotFound',
    });
});

Router.plugin('ensureSignedIn', {
  only: ['upload, list, uploadEstablishment, establishmentsList']
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');