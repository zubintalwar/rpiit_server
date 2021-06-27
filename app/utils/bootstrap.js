const async = require("async");
const Admin = require("../Model/admin");
const bcrypt = require("bcryptjs");

exports.bootstrapAdmin = async function (callback) {
  let hashPassword = await bcrypt.hash("123456", 10);

  let adminData1 = {
    email: "admin@rpiit.com",
    password: hashPassword,
    // name: "Admin",

  };

  let adminData2 = {
    email: "admin@gmail.com",
    password: hashPassword,
    // name: "Admin",

  };

  async.parallel(
    [
      function (cb) {
        insertData(adminData1.email, adminData1, cb);
      },

      function (cb) {
        insertData(adminData2.email, adminData2, cb);
      },
    ],
    function (err, done) {
      // callback(err, 'Bootstrapping finished');
    }
  );
};

function insertData(email, adminData, callback) {
  let needToCreate = true;
  async.series(
    [
      function (cb) {
        let criteria = {
          email: email,
        };
        Admin.findOne(criteria, (err, data) => {
          if (data) {
            needToCreate = false;
          }
          cb();
        });
      },
      function (cb) {
        if (needToCreate) {
          const admin = new Admin(adminData);
          admin
            .save()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        } else {
          cb();
        }
      },
    ],
    function (err, data) {
      console.log("Bootstrapping finished for " + email);
      //callback(err, 'Bootstrapping finished')
    }
  );
}


