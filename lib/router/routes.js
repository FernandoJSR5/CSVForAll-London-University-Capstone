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
        layoutTemplate: 'masterLayout'
    });
    this.route('list', {
        path: '/upload_list',
        layoutTemplate: 'masterLayout'
    });
});

Router.plugin('ensureSignedIn', {
  only: ['upload, list']
});

//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');