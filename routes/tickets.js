const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");

const Control = require("../controllers/tickets_Control");

//=================================================================================================

router.get("/:page", catchAsync(Control.indexPage));

router.get("/details/:id", catchAsync(Control.showPage));

//=================================================================================================

module.exports = router;
