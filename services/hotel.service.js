const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Hotel } = require("../models");
const fs = require("fs").promises;
// const fs = require("fs");
const path = require("path");

const addBasicInfo = async (basicInfoBody) => {
  const { email } = basicInfoBody;
  // Check if a hotel with the given email already exists
  const existingHotel = await Hotel.findOne({ email });
  if (!existingHotel) {
    // Hotel with the given email does not exist, create a new entry
    const newHotel = await Hotel.create(basicInfoBody);
    return { created: true, addbasicInfo: newHotel };
  } else {
    // Hotel with the given email already exists
    console.log(
      "Hotel with the given email already exists. Retrieving details."
    );
    return { created: false, addbasicInfo: existingHotel };
  }
};

const addLocationInfo = async (hotelId, locationInfo) => {
  try {
    // Find the hotel by ID
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    
    // Check if location information has been updated
    const locationUpdated = Object.keys(locationInfo).some(
      (key) => locationInfo[key] !== hotel[key]
    );

    if (locationUpdated) {
      // Add or update location information
      hotel.address = locationInfo.address || hotel.address;
      hotel.city = locationInfo.city || hotel.city;
      hotel.state = locationInfo.state || hotel.state;
      hotel.country = locationInfo.country || hotel.country;
      hotel.zipcode = locationInfo.zipcode || hotel.zipcode;
      hotel.latitude = locationInfo.latitude || hotel.latitude;
      hotel.longitude = locationInfo.longitude || hotel.longitude;
      // Save the updated hotel information
      await hotel.save();
      return { hotel, statusCode: 200 }; // Send status code 200 if location info is updated
    } else {
      return { hotel, statusCode: 202 }; // Send status code 202 if location info is not updated
    }
  } catch (error) {
    throw new Error(`Error adding location info: ${error.message}`);
  }
};

const addMedia = async ({ hotelId, thumbnail, gallery }) => {
  try {
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    const thumbnailPath = thumbnail[0].originalname;
    const galleryPaths = gallery.map((file) => file.originalname);
    // const thumbnailPath = await saveFile(thumbnail, "thumbnails");
    // const galleryPaths = await Promise.all(gallery.map(file => saveFile(file, "gallery")));

    // Assuming you have an array field in your Hotel model to store gallery paths
    hotel.gallery = [...(hotel.gallery || []), ...galleryPaths];

    hotel.thumbnail = thumbnailPath;

    await hotel.save();

    return { message: "Media added successfully", thumbnailPath, galleryPaths };
  } catch (error) {
    console.error("Error in addMedia service:", error);
    throw error;
  }
};



const addPropertyRules = async (hotelId, propertyRulesInfo) => {
    
  try {
    // Find the hotel by ID
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    // const propertyRulesUpdated = Object.keys(propertyRulesInfo)
    // console.log(propertyRulesUpdated);
    
//     // Check if property rules information has been updated
    // const propertyRulesUpdated = Object.keys(propertyRulesInfo).some(
    //   (key) => propertyRulesInfo[key] !== hotel[key]
    // );
    // Exclude 'PaymentMethods' from comparison
    const keysToCheck = Object.keys(propertyRulesInfo).filter(key => key !== 'PaymentMethods');

    // Check if any property rules information (excluding 'PaymentMethods') has been updated
    const propertyRulesUpdated = keysToCheck.some(
      key => hotel[key] !== propertyRulesInfo[key]
    );
    

    if (propertyRulesUpdated) {
      // Add or update property rules information
      hotel.checkintime = propertyRulesInfo.checkintime || hotel.checkintime;
      hotel.checkouttime = propertyRulesInfo.checkouttime || hotel.checkouttime;
      hotel.paymentPolicy =
        propertyRulesInfo.paymentPolicy || hotel.paymentPolicy;
      hotel.ageRestriction =
        propertyRulesInfo.ageRestriction || hotel.ageRestriction;
      hotel.petsRules = propertyRulesInfo.petsRules || hotel.petsRules;
      hotel.childRules = propertyRulesInfo.childRules || hotel.childRules;

        // Update payment methods
        const paymentMethods = propertyRulesInfo.PaymentMethods || [];
        
        hotel.paymentMethods = paymentMethods.map((method) => ({
          label: method.label || '',
          value: method.value || '',
        }));

        await hotel.save();
      return { hotel, statusCode: 200 }; // Send status code 200 if propertyRulesInfo info is updated
    } else {
      return { hotel, statusCode: 202 }; // Send status code 202 if propertyRulesInfo info is not updated
    }
  } catch (error) {
    throw new Error(`Error adding location info: ${error.message}`);
  }
};


const addFacilities = async (hotelId, facilities) => {
  console.log("facilities in service: ",facilities);
  try {
    // Find the hotel by ID
    const hotel = await Hotel.findById(hotelId);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    // Update or add facilities information
    hotel.facilities = facilities;

    // Save the updated hotel information
    await hotel.save();

    return { hotel, statusCode: 200 }; // Send status code 200 if facilities info is updated
  } catch (error) {
    throw new Error(`Error adding facilities: ${error.message}`);
  }
};



const getHotels = async () => {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    console.error("Error getting  Facilities :", error);
    throw error;
  }
};
  
  
const createHotel = async (hotelBody) => {
  console.log("hotelBody", hotelBody);
  const newHotel = await Hotel.create(hotelBody);
  console.log("newHotel", newHotel);
  return newHotel;
};

module.exports = {
  createHotel,
  addBasicInfo,
  addLocationInfo,
  addMedia,
  addPropertyRules,
  addFacilities,
  getHotels
};
