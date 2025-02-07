const userModel = require("../models/users");
const transactionModel = require("../models/transactions");
const serviceModel = require("../models/services");

const topupBalance = async (req, res) => {
  try {
    const { balance } = await userModel.getBalance(req.email);
    const { top_up_amount: amount } = req.body;
    const data = {
      email: req.email,
      amount: balance + amount,
    };

    await userModel.updateBalance(data);
    const newBalance = await userModel.getBalance(req.email);

    const transaction_data = {
      userEmail: req.email,
      serviceCode: "USER TOPUP",
      transactionType: "TOPUP",
      description: `Top up balance`,
      amount,
    };

    await transactionModel.createTransaction(transaction_data);

    res.status(200).json({
      status: 0,
      message: "Topup balance berhasil",
      data: newBalance,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const transaction = async (req, res) => {
  try {
    const { service_code: reqCode } = req.body;

    const services = await serviceModel.getAllServices();
    const searchedService = services.find(
      (item) => item.service_code === reqCode
    );

    if (!searchedService) {
      return res.status(400).json({
        status: 102,
        message: "service atau layanan tidak ditemukan",
        data: null,
      });
    }

    const { balance } = await userModel.getBalance(req.email);

    if (balance < searchedService.service_tarif) {
      return res.status(400).json({
        status: 105,
        message: "balance / saldo tidak cukup",
        data: null,
      });
    }

    const data = {
      userEmail: req.email,
      serviceCode: searchedService.service_code,
      transactionType: "PAYMENT",
      description: `Pembayaran ${searchedService.service_name}`,
      amount: searchedService.service_tarif,
    };

    const { id } = await transactionModel.createTransaction(data);

    const newBalance = balance - searchedService.service_tarif;
    await userModel.updateBalance({ email: req.email, amount: newBalance });

    const transaction = await transactionModel.getCurrentTransaction(id);

    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: transaction,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const transactions = await transactionModel.getAllTransaction(req.email);

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      data: transactions,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: error.status || null,
      message: error.message,
      data: null,
    });
  }
};

module.exports = { topupBalance, transaction, getAllTransaction };
