require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const cors = require("cors");

const {
  sequelize,
  User,
  Category,
  Notification,
} = require("./database/models");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    const {
      username,
      role_id,
      email,
      password,
      walletAddress,
      contractAddress,
      affiliation,
    } = req.body;
    if (!(username && password && role_id && email && walletAddress)) {
      res.status(400).send("Ensure you have filled the required fields");
    }
    const oldUser = await User.findOne({
      where: { email: email },
    });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      role_id: role_id,
      email: email.toLowerCase(),
      password: encryptedPassword,
      walletAddress: walletAddress,
      contractAddress: contractAddress,
      affiliation: affiliation,
    });

    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "5h",
    });

    user.token = token;

    return res.status(201).json("Success");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("Please provide all input");
    }

    const user = await User.findOne({
      where: { email: email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
      user.token = token;
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    if (req.query.role_id) {
      const users = await User.findAll({
        where: {
          role_id: req.query.role_id,
        },
      });
      // const userCount = await User.count({
      //   where: {
      //     role_id: req.query.role_id,
      //   },
      // });
      return res.json({ users });
    }
    if (req.query.uuid) {
      const user = await User.findOne({
        where: {
          uuid: req.query.uuid,
        },
      });
      return res.json(user);
    }
    if (req.query.walletAddress) {
      const user = await User.findOne({
        where: {
          walletAddress: req.query.walletAddress,
        },
      });
      return res.json(user);
    }
    // if (req.query.userStatus) {
    //   const users = await User.findAll({
    //     where: {
    //       disabled: true
    //     }
    //   })
    //   return res.json(users)
    // }
    if (!req.query.role_id && !req.query.uuid && !req.query.walletAddress) {
      const users = await User.findAll({});
      return res.json(users);
    }
  } catch (error) {
    console.log(error);
  }
});

// app.get("/notifications", async (req, res) => {
//   try {
//     const notificationCount = await Notification.count()
//     return res.json(notificationCount)
//   } catch (error) {
//     console.log(error)
//   }
// });

app.post("/notifications", async (req, res) => {
  try {
    const { status, from, to, category_id } = req.body;

    if (!(status && from && to && category_id)) {
      res.status(400).send("Ensure you have filled the required fields");
    }

    const notification = await Notification.create({
      status: status,
      from: from,
      to: to,
      category_id: category_id,
    });
    return res.json("Success");
  } catch (error) {
    console.log(error);
  }
});
app.put("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const contractAddress = req.body.contractAddress;

  try {
    const result = await User.update(
      {
        contractAddress: contractAddress,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
  }
});

app.put("/notifications/:id", async (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  try {
    const result = await Notification.update(
      {
        status: status,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).json("Success");
  } catch (error) {
    console.log(error);
  }
});

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid },
    });

    return res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: {
        to: req.query.to,
        status: req.query.status,
      },
      include: [
        {
          model: Category,
        },
        {
          model: User,
        },
      ],
    });
    return res.json(notifications);
  } catch (error) {
    console.log(error);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000");
  await sequelize.authenticate();
  console.log("Database Connected");
});
