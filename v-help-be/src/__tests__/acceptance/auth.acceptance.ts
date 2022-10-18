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
    it("Register a new volunteer", async () => {
      const result = await client.post("/auth/register").send(volunteerData);

      console.debug(result.body?.error?.details);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    })
  })

})