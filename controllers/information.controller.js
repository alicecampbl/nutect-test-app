const serviceModel = require("../models/services");
const bannerModel = require("../models/banners");

const getAllService = async (req, res) => {
  const services = await serviceModel.getAllServices();

  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: services,
  });
};

const getAllBanner = async (req, res) => {
  const banners = await bannerModel.getAllBanners();

  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: banners,
  });
};

module.exports = { getAllService, getAllBanner };
