import {VHelpBeApplication} from '../../application';
import {Client, expect} from '@loopback/testlab';
import {setupApplication} from './test-helper';

describe("Authentication acceptance", () => {

  let app: VHelpBeApplication;
  let client: Client;
  let rootToken : any;

  before(async () => {
    ({app, client} = await setupApplication());
  })


  describe("Test root user login",  () => {
    it("Root user can login", async () => {
      const result = await client.post("/auth/login/root").send({
        username: "root",
        password: "root1234"
      })

      console.log("result  -- ", result.body)
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      rootToken = result.body.accessToken;
    })
  })

  describe("Tests school admin authentication", () => {
    const testAdminData = {
      email: 'admin.test@mail.com',
      username: 'admin.test',
      password: '12345678',
      fullname: 'Wong Wai Kiat',
      position: "Teacher",
      staffID: "b13212932",
      type: 'admin'
    }
    let adminToken : any;

    it("Register a new admin", async () => {
      const result = await client.post("/auth/register").send(testAdminData);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    });

    it("Fetch school admins", async () => {
      const result = await client.get("/school-admins").auth(rootToken, {type: 'bearer'});

      console.debug(result.body);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.length).equal(1);
    })

    it("New school admin can login", async () => {
      const result = await client.post("/auth/login").send({
        username: "admin.test",
        password: "12345678",
        emailVerified: false
      })

      console.debug(result.body)

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();

      adminToken = result.body;
    });

    it("Admin can retrieve their own user info ", async () => {
      const result = await client.get("/auth/info").auth(
        adminToken.accessToken,
        {type: 'bearer'}
      );

      console.log("result  -- ", result.body)
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.type).equal("admin")
    })

  })


  describe("Tests volunteer authentication", () => {
    const volunteerData = {
      email: 'volunteer@mail.com',
      username: 'volunteer1',
      password: '12345678',
      fullname: 'Shath',
      dateOfBirth: new Date("1990-01-15"),
      occupation: "Student",
      type: 'volunteer'
    }
    let volunteerTokens : {accessToken: string};

    it("Registers a a new volunteer", async () => {
      const result = await client.post("/auth/register").send(volunteerData);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    });

    it("New volunteer can login", async () => {
      const result = await client.post("/auth/login").send({
        username: "volunteer1",
        password: "12345678",
        emailVerified: false
      })

      console.debug(result.body)

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();

      volunteerTokens = result.body;
    });

    it("Should not allow another volunteer to register with same email", async () => {
      const result = await client.post("/auth/register").send(volunteerData);

      expect(result.status).not.equal(200);
      expect(result.body).to.not.be.empty();
    });


    it("Fetch volunteers", async () => {
      const result = await client.get("/volunteers");

      console.debug(result.body);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.length).equal(1);
    })

    it("Volunteer with Volunteer1 id exists", async () => {
      const result = await client.get("/volunteers");

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.length).equal(1);
      expect(result.body[0].username).equal('volunteer1');
    })


    it("Check if login works ", async () => {
      const result = await client.get("/auth/whoami").auth(
        volunteerTokens.accessToken,
        {type: 'bearer'}
        );

      console.log("result  -- ", result.body)
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    })

    it("Volunteer can retrieve their own user info ", async () => {
      const result = await client.get("/auth/info").auth(
        volunteerTokens.accessToken,
        {type: 'bearer'}
      );

      console.log("result  -- ", result.body)
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    })
  })

})