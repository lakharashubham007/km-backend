const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { dealsService } = require("../services");

const addDeals = catchAsync(async (req, res) => {
  const deal = await dealsService.addDeals(req.body);
  res
    .status(httpStatus.CREATED)
    .send({ deal: deal, message: "Deal Saved Successfully!" });
});

const getDeals = async (req, res) => {
  try {
    const deals = await dealsService.getDeals();
    res.json({ success: true, deals: deals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  addDeals,
  getDeals,
};
