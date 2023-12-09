const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app.js");

const User = require("../../models/User.js");

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test /api/auth.signup route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  beforeEach(() => {});

  afterEach(async () => {
    await User.deleteMany();
  });

  test("test /api/auth/signup with correctData", async () => {
    const signupData = {
      username: "Vladislav",
      email: "voadkasyan.2006@gmail.com",
      password: "12345678",
    };
    const { body, statusCode } = await request(app)
      .post("/api/auth/signup")
      .send(signupData);

    expect(statusCode).toBe(201);
    expect(body.username).toBe(signupData.username);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.username).toBe(signupData.username);
  });
});
