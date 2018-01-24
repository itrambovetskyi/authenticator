const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || null;


module.exports = function (UserPrinciple) {

  UserPrinciple.disableRemoteMethodByName("create");
  UserPrinciple.disableRemoteMethodByName("upsert");
  UserPrinciple.disableRemoteMethodByName("updateAll");
  UserPrinciple.disableRemoteMethodByName("updateAttributes");

  UserPrinciple.disableRemoteMethodByName("find");
  UserPrinciple.disableRemoteMethodByName("findById");
  UserPrinciple.disableRemoteMethodByName("findOne");

  UserPrinciple.disableRemoteMethodByName("deleteById");

  UserPrinciple.disableRemoteMethodByName("confirm");
  UserPrinciple.disableRemoteMethodByName("count");
  UserPrinciple.disableRemoteMethodByName("exists");
  UserPrinciple.disableRemoteMethodByName("resetPassword");

  UserPrinciple.disableRemoteMethodByName('__count__accessTokens');
  UserPrinciple.disableRemoteMethodByName('__create__accessTokens');
  UserPrinciple.disableRemoteMethodByName('__delete__accessTokens');
  UserPrinciple.disableRemoteMethodByName('__destroyById__accessTokens');
  UserPrinciple.disableRemoteMethodByName('__findById__accessTokens');
  UserPrinciple.disableRemoteMethodByName('__get__accessTokens');
  UserPrinciple.disableRemoteMethodByName('__updateById__accessTokens');

  UserPrinciple.prototype.createAccessToken = function (ttl, cb) {
    const me = this;
    const userSettings = me.constructor.settings;
    const expiresIn = Math.min(ttl || userSettings.ttl, userSettings.maxTTL);
    const accessToken = jwt.sign({userId: me.id}, secretKey, {expiresIn});

    return cb ? cb(null, Object.assign(me, {accessToken})) : {id: accessToken};
  };

  UserPrinciple.logout = function (tokenId, fn) {
    // You may want to implement JWT black list here
    fn();
  };

};
