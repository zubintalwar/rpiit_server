const multer = require("../../middlewares/multer");

const express = require("express"),
  Route = express.Router(),
  Controller = require("../../Controller/mobile");

Route.post("/verifyStudent", Controller.Admin.verifyStudent);
Route.post("/login", Controller.Admin.login);
Route.post("/updateStudent/:id", Controller.Admin.updateStudent);
Route.get("/getAllStudent", Controller.Admin.getAllStudent);
Route.get("/getOneStudent", Controller.Admin.getOneStudent);
Route.get("/getAllAlumini", Controller.Admin.getAllAlumini);
Route.delete("/deleteMagzines/:magzineId", Controller.Admin.deleteMagzines);
Route.post("/addAnnouncement",multer.upload.single("image"), Controller.Admin.addAnnouncement);


module.exports = Route;