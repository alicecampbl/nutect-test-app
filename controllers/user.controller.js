const userModel = require("../models/users");
const { generateToken } = require("../tokenize/TokenManager");
const { nanoid } = require("nanoid");

const userRegistration = async (req, res) => {
  // handling on models
  try {
    await userModel.addUser(req.body);
    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    await userModel.loginUser(req.body);
    const token = generateToken({ email: req.body.email });
    res.status(200).json({
      status: 0,
      message: "Login sukses",
      data: {
        token,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    await userModel.checkEmail(req.email);
    const profile = await userModel.getUserPofile(req.email);

    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: {
        profile,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    if (!req.body.first_name || !req.body.last_name) {
      return res.status(400).json({
        status: 102,
        message: "input tidak boleh kosong!",
        data: null,
      });
    }

    const data = {
      email: req.email,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
    };

    await userModel.checkEmail(req.email);
    await userModel.updateProfile(data);
    const profile = await userModel.getUserPofile(req.email);

    res.status(200).json({
      status: 0,
      message: "Update profile berhasil",
      data: profile,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const updateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: 0, message: "Tidak boleh kosong!", data: null });
    }

    const { fieldname: fileName } = req.file;
    const dummyLink = `https://dummylink.com/${fileName}-${nanoid(12)}`;

    await userModel.updateProfileImage(req.email, dummyLink);

    const profile = await userModel.getUserPofile(req.email);

    res.status(200).json({
      status: 0,
      status: "Update profile image berhasil",
      data: profile,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const getBalance = async (req, res) => {
  try {
    await userModel.checkEmail(req.email);
    const { balance } = await userModel.getBalance(req.email);

    res.status(200).json({
      status: 0,
      message: "Get balance berhasil",
      data: {
        balance,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  getProfile,
  updateProfile,
  getBalance,
  updateImage,
};
