"use strict";

const { Review } = require("../models");

const { Op } = require('sequelize');
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const demoReviews = [
  {
    userId: 1,
    spotId: 3,
    review: "This was an awesome spot!",
    stars: 5,
  },
  {
    userId: 2,
    spotId: 2,
    review: "BETTER THAN THE BEST!",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 3,
    review: "It was really good!",
    stars: 5,
  },

  {
    userId: 2,
    spotId: 4,
    review: "I liked it",
    stars: 4,
  },
  {
    userId: 1,
    spotId: 4,
    review: "Not that great",
    stars: 2,
  },
  {
    userId: 2,
    spotId: 5,
    review: "AVERAGE",
    stars: 3,
  },
  {
    userId: 3,
    spotId: 2,
    review: "Below average",
    stars: 2,
  },
  {
    userId: 4,
    spotId: 4,
    review: "It was pretty good",
    stars: 4,
  },
  {
    userId: 5,
    spotId: 4,
    review: "very average",
    stars: 3,
  },
  {
    userId: 1,
    spotId: 5,
    review: "I didn't like it much",
    stars: 2,
  },
]

const reviewsDelete = demoReviews.map((review) => {
  return review.userId;
})


module.exports = {

  async up(queryInterface, Sequelize) {

    await Review.bulkCreate(demoReviews);

 
  },


  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options,
      {
        userId: { [Op.in]: reviewsDelete }
      }
    );
  
  },
};
