"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    let input = req.query.input;

    let getNum = convertHandler.getNum(input);
    let getUnit = convertHandler.getUnit(input);

    if (!getNum && !getUnit) {
      //res.status(400).send("invalid number and unit");
      res.send("invalid number and unit");
    } else if (!getNum) {
      //res.status(400).send("invalid number");
      res.send("invalid number");
    } else if (!getUnit) {
      //res.status(400).send("invalid unit");
      res.send("invalid unit");
    } else {
      let convert = convertHandler.convert(getNum, getUnit);
      let rtnUnit = convertHandler.getReturnUnit(getUnit);

      res.status(200).json({
        initNum: getNum,
        initUnit: getUnit,
        returnNum: convert,
        returnUnit: rtnUnit,
        string: convertHandler.getString(getNum, getUnit, convert, rtnUnit),
      });
    }
  });
};
