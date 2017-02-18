const refresh = require('../tool/refresh-mongo');

before((done) => {
  refresh(done);
});