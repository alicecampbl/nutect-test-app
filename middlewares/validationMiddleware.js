const {
  registrationValidateSchema,
  loginValidateSchema,
  topupValidateSchema,
} = require("../validator/schema");

const InvariantError = require("../exceptions/InvariantError");

const registerBodyValidation = (req, res, next) => {
  const validationResult = registrationValidateSchema.validate(req.body);

  if (validationResult.error) {
    if (validationResult.error.details[0].path[0] === "email") {
      return next(
        new InvariantError("Parameter email tidak sesuai format", 102)
      );
    } else if (validationResult.error.details[0].path[0] === "password") {
      return next(new InvariantError("Password minimal 8 karakter", 102));
    } else {
      return next(new InvariantError("Parameter lain tidak boleh kosong", 102));
    }
  }

  next();
};

const loginBodyValidation = (req, res, next) => {
  const validationResult = loginValidateSchema.validate(req.body);

  if (validationResult.error) {
    if (validationResult.error.details[0].path[0] === "email") {
      return next(
        new InvariantError("Parameter email tidak sesuai format", 102)
      );
    } else if (validationResult.error.details[0].path[0] === "password") {
      return next(new InvariantError("Password minimal 8 karakter", 102));
    }
  }

  next();
};

const topupBodyValidation = (req, res, next) => {
  const validationResult = topupValidateSchema.validate(req.body);

  if (validationResult.error) {
    if (validationResult.error.details[0].path[0] === "top_up_amount") {
      return next(
        new InvariantError(
          "Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
          102
        )
      );
    }
  }

  next();
};

module.exports = {
  registerBodyValidation,
  loginBodyValidation,
  topupBodyValidation,
};
