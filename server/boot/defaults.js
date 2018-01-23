module.exports = function (app) {
  const Role = app.models.Role;
  const UserPrinciple = app.models.UserPrinciple;

  UserPrinciple.create([
    { id: 1, username: 'it-admin', email: 'igortram@gmail.com', password: 'qwertyui' },
    { id: 2, username: 'it', email: 'igortram@gmail.com', password: 'qwertyui' }
    ], (err, users) => {
    if (err) {
      console.log(err);
      return;
    }

    Role.create({ name: 'admin' }, (err, role) => {
      if (err) {
        console.log(err);
        return;
      }

      role.principals.create({ principalType: 'USER', principalId: users[0].id }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  });
};
