const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { hotelService } = require("../services");


const addBasicInfo = catchAsync(async (req, res) => {
  const { created, addbasicInfo } = await hotelService.addBasicInfo(req.body);
  if (created) {
    res.status(httpStatus.CREATED).send({ basicInfo: addbasicInfo, message: "Basic Information Saved Successfully!" });
  } else {
    res.status(httpStatus.OK).send({ basicInfo: addbasicInfo, message: "Existing Hotel Details!" });
  }
});


const addLocationInfo = catchAsync(async (req, res) => {
  const { hotelId } = req.params;
  const locationInfo = req.body;
  try {
    const { hotel, statusCode } = await hotelService.addLocationInfo(hotelId, locationInfo);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Location Info ${statusCode === 200 ? 'Saved' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const addMedia = async (req, res, next) => {
  try {
    
    const { hotelId } = req.params;
    const thumbnail = req.files.thumbnail; // Assuming the thumbnail is a single file
    
    // Extract gallery files from req.files array
    const gallery = req.files.gallery.filter(file => file.fieldname.startsWith('gallery'));
    
    // Call the service to handle the addition of media
    const result = await hotelService.addMedia({ hotelId, thumbnail, gallery });

    // Respond with the result
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in addMedia controller:", error);
    next(error);
  }
};


const addPropertyRules = catchAsync(async (req, res) => {
  const { hotelId } = req.params;
  const propertyRulesInfo = req.body;
  try {
    const { hotel, statusCode } = await hotelService.addPropertyRules(hotelId, propertyRulesInfo);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Property Rules Info ${statusCode === 200 ? 'Saved' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const addFacilities = catchAsync(async (req, res) => {
  const { hotelId } = req.params;
  const facilities = req.body.facilities;

  try {
    const { hotel, statusCode } = await hotelService.addFacilities(hotelId, facilities);
    res.status(statusCode).json({
      success: true,
      hotel: hotel,
      message: `Facilities Info ${statusCode === 200 ? 'Added' : 'Already Up to Date'} Successfully!`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



const getHotels = async (req, res) => {
  try {
    const getHotels = await hotelService.getHotels();
    res.json({ success: true, hotels: getHotels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const createHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.createHotel(req.body);
  res.status(httpStatus.CREATED).send({ hotel });
});


module.exports = {
  createHotel,
  addBasicInfo,
  addLocationInfo,
  addMedia,
  addPropertyRules,
  addFacilities,
  getHotels
};