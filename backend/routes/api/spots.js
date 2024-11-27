const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { SpotImage } = require("../../db/models");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Spot, User, Review, ReviewImage } = require("../../db/models");
const spot = require("../../db/models/spot");
// const { ERROR } = require("sqlite3");
const { Sequelize } = require("sequelize");
const user = require("../../db/models/user");

const router = express.Router();

const validateSpotId = [
  check("spotId").isInt({ gt: 0 }).withMessage("Spot couldn't be found"),
];

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid address."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid city."),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid state."),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid country."),
  // check("lat").isDecimal().withMessage("Latitude must be a decimal value."),
  // check("lng").isDecimal().withMessage("Longitude must be a decimal value."),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters."),
  check("price").isDecimal().withMessage("Price must be a decimal value."),
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
];


router.get(
  "/current",
  requireAuth,

  async (req, res) => {
    const { user } = req;

    let spots = [];

    spots = await Spot.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT AVG("Reviews".stars) FROM "Reviews"
              WHERE "Reviews"."spotId" = "Spot"."id")`
            ),
            "avgRating",
          ],
        ],

        // "id",
        // "ownerId",
        // "address",
        // "city",
        // "state",
        // "country",
        // "lat",
        // "lng",
        // "name",
        // "description",
        // "price",
        // "createdAt",
        // "updatedAt",
      },
      where: { ownerId: user.id },
      include: [
        // {
        //   model: Review,
        //   attributes: [
        //     [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],
        //   ],
        // },
        {
          model: SpotImage,
          attributes: ["id", "url"],
        },
      ],
      group: ["Spot.id", "SpotImages.id"],
    });

    let finalSpots = spots.map((spot) => {
      // let avgRating = null;
      // if (spot.Reviews.length > 0 && spot.Reviews[0].dataValues.avgRating) {
      //   avgRating = spot.Reviews[0].dataValues.avgRating;
      // }

      let previewImage = null;
      if (spot.SpotImages.length > 0) {
        previewImage = spot.SpotImages[0].url;
      }

      // let finalAvgRating = null;
      // if (avgRating) {
      //   finalAvgRating = parseFloat(avgRating).toFixed(1);
      // }

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        // lat: spot.lat,
        // lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating || null,
        previewImage,
      };
    });

    res.status(200);
    res.json({ Spots: finalSpots });
  }
);


router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  const reviews = await Review.findAll({
    attributes: [
      "id",
      "userId",
      "spotId",
      "review",
      "stars",
      "createdAt",
      "updatedAt",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
      {
        model: Spot,
        include: [
          {
            model: SpotImage,
            attributes: ["id", "url"],
            where: { preview: true },
            required: false,
          },
        ],
      },
    ],
  });

  res.status(200).json({ Reviews: reviews });
});

router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;

  if (!spotId) {
    return res.status(400).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const spot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        [
          Sequelize.literal(
            `(SELECT AVG("Reviews".stars) FROM "Reviews"
              WHERE "Reviews"."spotId" = "Spot"."id")`
          ),
          "avgRating",
        ],

        [
          Sequelize.literal(
            `(SELECT AVG("Reviews".stars) FROM "Reviews"
              WHERE "Reviews"."spotId" = "Spot"."id")`
          ),
          "numReviews",
        ],
      ],
    },

    include: [
      // {
      //   model: Review,
      //   attributes: [

      //     [Sequelize.fn("AVG", Sequelize.col("stars")), "avgRating"],

      //     [Sequelize.fn("COUNT", Sequelize.col("Reviews.id")), "numReviews"],

      //   ],
      // },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  // let avgRating = null;
  // if (spot.Reviews.length > 0 && spot.Reviews[0].dataValues.avgRating) {
  //   avgRating = spot.Reviews[0].dataValues.avgRating;
  // }

  // let numReviews = null;
  // if (spot.Reviews.length > 0 && spot.Reviews[0].dataValues.numReviews) {
  //   numReviews = spot.Reviews[0].dataValues.numReviews;
  // }

  let finalSpot = {
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: spot.dataValues.numReviews || null,
    avgStarRating: spot.dataValues.avgRating || null,
    SpotImages: spot.SpotImages,
    Owner: spot.User
      ? {
        id: spot.User.id,
        firstName: spot.User.firstName,
        lastName: spot.User.lastName,
      }
      : res.status(404).json({
        message: "Spot couldn't be found",
      }),
  };
  res.status(200).json(finalSpot);
});




// GET ALL SPOTS WORKING
router.get("/", async (req, res) => {
  let { page, size, maxLat, minLat, maxLng, minLng, minPrice, maxPrice } =
    req.query;

  const errors = {};


  if (page) {
    page = parseInt(page);
    if (isNaN(page) || page < 1) {
      errors.page = "Page must be greater than or equal to 1";
    }
  } else {
    page = 1;
  }


  if (size) {
    size = parseInt(size);
    if (isNaN(size) || size < 1) {
      errors.size = "Size must be greater than or equal to 1";
    }
  } else {
    size = 20;
  }


  if (maxLat && isNaN(maxLat)) {
    errors.maxLat = "Maximum latitude is invalid";
  }
  if (minLat && isNaN(minLat)) {
    errors.minLat = "Minimum latitude is invalid";
  }
  if (maxLng && isNaN(maxLng)) {
    errors.maxLng = "Maximum longitude is invalid";
  }
  if (minLng && isNaN(minLng)) {
    errors.minLng = "Minimum longitude is invalid";
  }

  // Validate price
  if (minPrice) {
    minPrice = parseFloat(minPrice);
    if (isNaN(minPrice) || minPrice < 0) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
  }
  if (maxPrice) {
    maxPrice = parseFloat(maxPrice);
    if (isNaN(maxPrice) || maxPrice < 0) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }

  const pagination = {
    limit: size,
    offset: size * (page - 1),
  };

  try {

    let spots = await Spot.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(
              `(SELECT AVG("Reviews".stars) FROM "Reviews"
              WHERE "Reviews"."spotId" = "Spot"."id")`
            ),
            "avgRating",
          ],
        ],
      },
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"],
        },
      ],
      ...pagination,
    });

    let finalSpots = spots.map((spot) => {
      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: parseFloat(spot.lat),
        lng: parseFloat(spot.lng),
        name: spot.name,
        description: spot.description,
        price: parseFloat(spot.price),
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating || null,
        previewImage:
          spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
      };
    });


    res.status(200).json({ Spots: finalSpots, page, size });
  } catch (error) {
    console.error("Error fetching spots:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Bad Request",
        errors: errors.mapped(),
      });
    }

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId,
      },
    });

    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot",
      });
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId,
      review,
      stars,
    });

    return res.status(201).json({
      id: newReview.id,
      spotId: newReview.spotId,
      userId: newReview.userId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt,
    });
  }
);


router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const userId = req.user?.id;

  if (userId !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const newImage = await SpotImage.create({
    spotId: spot.id,
    url,
    preview: preview || false,
  });

  return res.status(201).json(newImage);
});



router.post("/", validateSpot, requireAuth, async (req, res) => {
  const { address, city, state, country, name, description, price } =
    req.body;

  const { user } = req;

  // Check if required fields are missing
  if (
    !address ||
    !city ||
    !state ||
    !country ||
    // !lat ||
    // !lng ||
    !name ||
    !description ||
    !price
    
  ) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        address: !address ? "Address is required." : undefined,
        city: !city ? "City is required." : undefined,
        state: !state ? "State is required." : undefined,
        country: !country ? "Country is required." : undefined,
        // lat: !lat ? "Latitude is required." : undefined,
        // lng: !lng ? "Longitude is required." : undefined,
        name: !name ? "Name is required." : undefined,
        description: !description ? "Description is required." : undefined,
        price: !price ? "Price is required." : undefined,
      },
    });
  }

  try {
    // Create the new spot
    const newSpot = await Spot.create({
      ownerId: user.id,
      address,
      city,
      state,
      country,
      // lat,
      // lng,
      name,
      description,
      price,
    });

    return res.status(201).json(newSpot);
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal Server Error",
      details: error.message, // Include error message for debugging
    });
  }
});



router.put("/:spotId", validateSpot, requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { address, city, state, country, name, description, price } =
    req.body;

  if (!spotId) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      errors,
    });
  }

  const errors = {};
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  // if (!lat || isNaN(lat)) errors.lat = "Latitude is not valid";
  // if (!lng || isNaN(lng)) errors.lng = "Longitude is not valid";
  if (!name || name.length > 50)
    errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price || isNaN(price)) errors.price = "Price per day is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  if (req.user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  spot.address = address || spot.address;
  spot.city = city || spot.city;
  spot.state = state || spot.state;
  spot.country = country || spot.country;
  // spot.lat = lat || spot.lat;
  // spot.lng = lng || spot.lng;
  spot.name = name || spot.name;
  spot.description = description || spot.description;
  spot.price = price || spot.price;

  await spot.save();

  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    // lat: spot.lat,
    // lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
  });
});



router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (req.user.id !== spot.ownerId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await SpotImage.destroy({ where: { spotId } });

  await Spot.destroy({ where: { id: spotId } });

  return res.json({ message: "Successfully deleted" });
});



module.exports = router;
