import {VHelpBeApplication} from '../../application';
import {Client, expect} from '@loopback/testlab';
import {setupApplication} from './test-helper';

describe("Authentication acceptance", () => {

  let app: VHelpBeApplication;
  let client: Client;

  before(async () => {
    ({app, client} = await setupApplication());
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

    it("Register a new admin", async () => {
      const result = await client.post("/auth/register").send(testAdminData);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    });

    it("Fetch school admins", async () => {
      const result = await client.get("/school-admins");

      console.debug(result.body);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.length).equal(1);
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

      // console.debug(result.body?.error?.details);

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


    it("Check if login works ", async () => {
      const result = await client.get("/auth/whoami").auth(
        volunteerTokens.accessToken,
        {type: 'bearer'}
        );

      console.log("result  -- ", result.body)
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    })
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
    })
  })
})