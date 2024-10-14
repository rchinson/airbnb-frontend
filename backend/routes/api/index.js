// backend/routes/api/index.js
const router = require("express").Router();

// backend/routes/api/index.js
// ...
const sessionRouter = require("./session.js");
const ReviewImageRouter = require("./review-image.js");
const spotImageRouter = require("./spot-image.js");
const reviewRouter = require("./reviews.js");
const usersRouter = require("./users.js");
const spotsRouter = require("./spots.js");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const { restoreUser } = require("../../utils/auth.js");

const { requireAuth } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/reviews", reviewRouter);
router.use("/spot-images", spotImageRouter);
router.use("/review-images", ReviewImageRouter);
router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/spots", spotsRouter);

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// ...
module.exports = router;
