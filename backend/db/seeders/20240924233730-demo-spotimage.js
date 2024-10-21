"use strict";

const { SpotImage } = require("../models");

const { Op } = require('sequelize');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const demoSpotImages = [
  {
    spotId: 1,
    url: "https://upload.wikimedia.org/wikipedia/commons/3/36/Texas_capitol_day.jpg",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://miro.medium.com/v2/0*COnxtJpaZL3fK4KB.jpg",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://www.ttu.edu/_resources/homepage/content/images/highlight/brand.jpg",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://www.mickeyshannon.com/photos/texas-bluebonnets.jpg",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://static.texastribune.org/media/images/2016/11/10/TX2016-county-results.png",
    preview: false,
  },



  {
    spotId: 2,
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Miamimetroarea.jpg",
    preview: true,
  },
  






  {
    spotId: 3,
    url: "https://upload.wikimedia.org/wikipedia/commons/3/37/Ohio_Stadium_infobox_crop.JPG",
    preview: true,
  },

  {
    spotId: 4,
    url: "https://upload.wikimedia.org/wikipedia/commons/6/67/Sphere-exosphere-on-Jan-26-2024.jpg",
    preview: true,
  },

  {
    spotId: 5,
    url: "https://upload.wikimedia.org/wikipedia/commons/0/03/Santa_Cruz%2C_CA%2C_USA_-_panoramio_%2810%29.jpg",
    preview: true,
  },

  {
    spotId: 6,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg/1280px-Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
    preview: true,
  },

  {
    spotId: 7,
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cinderella_Castle%2C_Magic_Kingdom_Walt_Disney_World_2024_%28square_crop%29.jpg",
    preview: true,
  },

  {
    spotId: 8,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Front_view_of_Statue_of_Liberty_with_pedestal_and_base_2024.jpg/800px-Front_view_of_Statue_of_Liberty_with_pedestal_and_base_2024.jpg",
    preview: true,
  },
]

const spotImagesDelete = demoSpotImages.map((spotImage) => {
  return spotImage.spotId;
});


module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(demoSpotImages);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,
      {
        spotId: { [Op.in]: spotImagesDelete }
      }
    );
 
  },
};




module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(demoSpotImages);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';  // Add the table name to the options
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      options, // Pass the options object
      {
        spotId: { [Op.in]: spotImagesDelete }, // Properly structured where clause
      },
      {}
    );
  },
};