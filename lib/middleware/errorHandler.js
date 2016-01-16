var HttpStatusError = require('../http-status');
var PrettyError = require('pretty-error');

module.exports = function errorHandler(err, req, res, next){
  if(!err) {
    if(next) return next();
    else return res.end();
  }

  var pe = new PrettyError();

  err = new HttpStatusError(err, req);
  if(err.status_code >= 500) {
    console.error(pe.render(err));
    err.message = HttpStatusError.message_map[500]; //hide the real error from user agent.
  }

  res.status(err.status_code).send(err.message);
}
