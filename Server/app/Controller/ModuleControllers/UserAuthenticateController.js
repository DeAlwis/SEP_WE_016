/**
 * Created by User on 9/9/2016.
 * Developer :- Kasun
 */
var express = require('express');
var app = express();
var Module = require('../../models/Models');
var User = Module.User;
var UserRole = Module.UserRole;
var config = require('../../../config');
app.set('api-arms-auth-1q2w3e4r', config.secret);
var jwt = require('jsonwebtoken');

UserAuthenticateController = function() {

    this.authenticate = function(req,res) {
        User.findOne( {
                where: {userUserName: req[0].username}
            }
        ).then(function(user) {
                if (!user) {
                    res.json({ success: false, message: 'Authentication failed' });
                } else if (user) {
                    if (user.userPassword != req[0].password) {
                        res.json({ success: false, message: 'Authentication failed' });
                    }else{

                        UserRole.findOne( {
                                where: {id: user.userRoleId}
                            }
                        ).then(function(usertype) {

                                console.log(usertype.userRoleName);
                                console.log(user.userFullname);
                                console.log( user.id);

                                var user_data = {
                                    full_name: user.userFullname,
                                    username: user.userUserName,
                                    email: user.userEmail,
                                    usertype:usertype.userRoleName,
                                    userId: user.id
                                }

                                // create a token
                                var token = jwt.sign(user_data, app.get('api-arms-auth-1q2w3e4r'), {
                                    expiresIn: '10m',
                                    algorithm: 'HS256'
                                });
                                res.json({
                                    success: true,
                                    token: token
                                });

                            })
                    }
                }
            });
    }

}

module.exports = new UserAuthenticateController();
