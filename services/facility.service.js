const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Facilities } = require("../models");

const createFacility = async (facilityBody, file) => {
  try {
    const newFacility = await Facilities.create({
      facilityName: facilityBody.facilityName,
      image: file,
    });
    return newFacility;
  } catch (error) {
    console.error("Error creating facility:", error);
    throw error;
  }
};

const getFacility = async (userId) => {
  try {
    const facilities = await Facilities.find();
    return facilities;
  } catch (error) {
    console.error("Error getting  Facilities :", error);
    throw error;
  }
};

const updateFacility = async (facilityId, updatedData, file) => {
  try {
    const updatedFacility = await Facilities.findByIdAndUpdate(
      facilityId,
      {
        facilityName: updatedData.facilityName,
        image: file,
      },
      { new: true }
    );

    if (!updatedFacility) {
      throw new Error("Facility not found");
    }

    return updatedFacility;
  } catch (error) {
    console.error("Error updating facility:", error);
    throw error;
  }
};

const deleteFacility = async (facilityId) => {
  try {
    const updatedFacility = await Facilities.findByIdAndUpdate(
      facilityId,
      { deleted: true },
      { new: true }
    );

    if (!updatedFacility) {
      throw new Error("Facility not found");
    }

    return updatedFacility;
  } catch (error) {
    console.error("Error soft deleting facility:", error);
    throw error;
  }
};

module.exports = {
  createFacility,
  getFacility,
  updateFacility,
  deleteFacility,
};
