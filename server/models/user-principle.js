const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || null;


module.exports = function(UserPrinciple) {

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
