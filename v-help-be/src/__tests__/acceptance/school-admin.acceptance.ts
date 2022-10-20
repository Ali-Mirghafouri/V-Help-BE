import {VHelpBeApplication} from '../../application';
import {Client, expect} from '@loopback/testlab';
import {setupApplication} from './test-helper';

describe("School Admin acceptance", () => {

  let app: VHelpBeApplication;
  let client: Client;

  before(async () => {
    ({app, client} = await setupApplication());
  })

  describe("Tests school admin use cases", () => {
    const testAdminData = {
      email: 'admin.test@mail.com',
      username: 'admin.test',
      password: '12345678',
      fullname: 'Wong Wai Kiat',
      position: "Teacher",
      staffID: "b13212932",
      type: 'admin'
    }
    const schoolData = {
      schoolName: "HELP International School",
      address: "Jalan 1, Sungai Besi",
      city: "Kuala Lumpur"
    };
    // let adminToken : never;
    let rootToken : string;
    let lastSchoolId : string;
    let lastSchoolAdminId: string;

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

    // it("Register a new admin", async () => {
    //   const result = await client.post("/auth/register").send(testAdminData);
    //
    //   expect(result.status).equal(200);
    //   expect(result.body).to.not.be.empty();
    // });


    it("Create school", async () => {

      const result = await client.post("/schools")
        .send(schoolData)
        .auth(rootToken, {type: 'bearer'});

      console.debug(result.body);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    })

    it("Fetch school schools", async () => {
      const result = await client.get("/schools");

      console.debug(result.body);

      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.length).equal(1);
      lastSchoolId = result.body[0].schoolId;
    })

    it("Root can add school admin admin to school", async () => {
      const result = await client.post("/school-admins")
        .send({
          ...testAdminData,
          schoolId: lastSchoolId
        })
        .auth(rootToken, {type: 'bearer'})

      console.debug(result.body);
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
    })

    it("School admin was added", async () => {
      const result = await client.get("/school-admins")
        .query(`{filter:{include:["school"]}}`)
        .auth(rootToken, {type: 'bearer'})

      console.debug(result.body);
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      expect(result.body.length).equal(1)
      expect(result.body[0].schoolId).not.undefined();
      expect(result.body[0]._id).not.undefined();
      lastSchoolAdminId = result.body[0]._id;
    })

    // it("filter query works", async () => {
    //   const result = await client.get("/school-admins")
    //     .query({filter:{include:["school"]}})
    //     .auth(rootToken, {type: 'bearer'})
    //
    //   console.debug(result.body);
    //   expect(result.status).equal(200);
    //   expect(result.body).to.not.be.empty();
    //   expect(result.body.length).equal(1)
    //   expect(result.body[0].schoolId).not.undefined();
    //   expect(result.body[0]._id).not.undefined();
    //   lastSchoolAdminId = result.body[0]._id;
    // })

    it("School is connected", async () => {
      const result = await client.get(`/school-admins/${lastSchoolAdminId}/school`)
        .auth(rootToken, {type: 'bearer'})

      console.debug(result.body);
      expect(result.status).equal(200);
      expect(result.body).to.not.be.empty();
      // expect(result.body.length).equal(1)
      // expect(result.body[0].schoolId).not.undefined();
    })

  })

})