const { Deals } = require("../models");

const addDeals = async (data) => {
  try {
    const deals = await Deals.create({ ...data });
    return { message: "Deal Added successfully", deals };
  } catch (error) {
    console.error("Error adding room:", error);
    throw error;
  }
};

const getDeals = async () => {
  try {
    const deals = await Deals.find();
    return deals;
  } catch (error) {
    console.error("Error getting Category :", error);
    throw error;
  }
};

module.exports = {
  addDeals,
  getDeals,
};
