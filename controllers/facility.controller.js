const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { facilityService } = require("../services");

const createFacility = catchAsync(async (req, res) => {
  const facility = await facilityService.createFacility(
    req.body,
    req.file.originalname
  );
  res.status(httpStatus.CREATED).send({ facility });
});

const getFacility = async (req, res) => {
  try {
    const getFacilities = await facilityService.getFacility();
    res.json({ success: true, facilities: getFacilities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateFacility = catchAsync(async (req, res) => {
  const { facilityId } = req.params;
  const updatedData = req.body;
  const updatedFacility = await facilityService.updateFacility(
    facilityId,
    updatedData,
    req.file.originalname
  );
  res.json({ success: true, facility: updatedFacility });
});

const deleteFacility = catchAsync(async (req, res) => {
  const { facilityId } = req.params;
  await facilityService.deleteFacility(facilityId);
  res.json({ success: true, message: "Facility deleted successfully" });
});

module.exports = {
  createFacility,
  getFacility,
  updateFacility,
  deleteFacility,
};
