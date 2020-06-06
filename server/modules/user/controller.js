var connection = require('../../../config/database');
var _ = require('underscore');
var moment = require('moment');
var path = require('path');

module.exports = function() {

    const _self = {};

    _self.addUser = (req, callback) => {
        console.log('[i] Getting Employee Data..');
        if (req.files === null) {
            return callback('File not exist')
          }
        
          const file = req.files.file;
          const fileName = Date.now()+'_'+file.name;
          const toPath = `${path.dirname(require.main.filename)}/client/public/uploads/`;
          const currentDate = moment().format("DD-MM-YYYY, h:mm:ss a");
          const query = "INSERT INTO `user_details` (`name`, `mobile`, `picture`, `created_at`) VALUES ('"+req.body.name+"', '"+req.body.mobile+"', '"+fileName+"', '"+currentDate+"')";
          connection.query(query, (err, data) => {
            if(err) return callback(err);

            console.log('affected Rows:', data.affectedRows);
            file.mv(toPath+fileName, err => {
              if (err) {
                console.error(err);
                return callback(err);
              }
          
              console.log({ fileName: file.name, filePath: `/uploads/${fileName}` });
            });
            callback(null, 'Data successfully inserted');
          });
    }; 

    _self.getUserByMobile = (req, callback) => {
      console.log('[i] getting single user data...', req.body);
      const mobile = req.body.mobile;
      const query = 'SELECT EXISTS(SELECT * FROM `user_details` WHERE `mobile` = '+mobile+') as isExist';
      console.log('getUserByMobile -> query', query);
      connection.query(query, callback);
    }

    _self.getUsers = (req, callback) => {
      console.log('[i] getting user data...');
      const query = "SELECT * FROM user_details";
      connection.query(query, callback);
    }

    return _self;
}();