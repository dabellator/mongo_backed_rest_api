module.exports = function(app) {
  require('./controllers/developers_controller')(app);
  require('./directives/developer_form_directive')(app);
};

