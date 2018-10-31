/* 
 * Author :libaishun
 * Email: libaishun007@gmail.com
 * Configuration file for app
 */
var config = {}

config.default = {
  'httpPort':8000,
  'httpsPort':8001,
  'envName':'default'
};

config.production = {
  'httpPort':9000,
  'httpSport':9001,
  'envName':'production'
};

var env = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

var envToExport = typeof(config[env]) == 'object' ? config[env] : config['default'];

module.exports = envToExport;
