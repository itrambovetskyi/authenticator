'use strict';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || null;

module.exports = function(PrincipleAccessToken) {

  PrincipleAccessToken.createAccessTokenId = function(fn) {
    const accessToken = jwt.sign({userId: 1}, secretKey);

    fn(null, accessToken);
  };

  PrincipleAccessToken.observe('before save', function(ctx, next) {
    if (!ctx.instance || ctx.instance.id) {
      // We are running a partial update or the instance already has an id
      return next();
    }

    PrincipleAccessToken.createAccessTokenId(function(err, id) {
      if (err) return next(err);
      ctx.instance.id = id;
      next();
    });
  });

  PrincipleAccessToken.resolve = function (id, cb) {
    if (id) {
      try {
        const data = jwt.verify(id, secretKey);
        cb(null, {userId: data.userId});
      } catch (err) {
        // Should override the error to 401
        cb(err);
      }
    } else {
      cb();
    }
  };
};
