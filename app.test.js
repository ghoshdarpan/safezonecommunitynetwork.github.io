const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('..backend/app'); 

// Configure chai to use chaiHttp
chai.use(chaiHttp);
const should = chai.should();

describe('App', () => {
  it('should return "Server is running on port 3000" when GET /', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Server is running on port 3000');
        done();
      });
  });

});
