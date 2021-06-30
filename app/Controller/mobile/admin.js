const universalFunction = require("../../UniversalFuntions"),
  db = require("../../services/dboperations"),
  Model = require("../../Model"),
  config = require("../../config"),
  validations = require("../../Validation");
const { sendMail } = require("../../utils/sendMail");

exports.addStudent = async (req, res) => {
  try {
    let {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      address,
      dob,
      branch,
      deviceToken,
      deviceType,
      image,
      semester,
      college,
      isTeacher,
      isStudent,
    } = req.body;

    let criteria = { email };
    let checkStudent = await db.findOne(Model.Student, criteria);
    if (checkStudent && checkStudent.isVerified === true)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ALREADY_EXISTS_EMAIL);
    if (checkStudent && checkStudent.isVerified === false)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.ACCOUNT_NOT_VERIFIED);
    let code = randomstring.generate(8);
    let password = code.toUpperCase();
    let hashPassword = await universalFunction.Password.getPassword(password);
    let dataToSave = {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      address,
      dob,
      branch,
      deviceToken,
      deviceType,
      image,
      semester,
      college,
      isTeacher,
      isStudent,
      isVeriFied: true,
      password: hashPassword,
    };
    await sendMail(email, subject, password).then(async (res) => {
      await User.update({ email }, dataToSave, { new: true, lean: true });
    });
    let saveData = await db.saveData(Model.Student, dataToSave);
    res.status(200).send({
      data: saveData,
      customMessage: "Your Account is under verification",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("=========================", err);
  }
};

exports.verifyStudent = async (req, res) => {
  try {
    let { studentId } = req.body;
    let studentData = await db.findOne(Model.Student, { _id: studentId });
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.INVALID_EMAIL);
    let updateStudentData = await db.update(
      Model.Student,
      { email },
      { isVeriFied: true },
      { new: true }
    );
    return res.status(200).send({
      data: updateStudentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllStudent = async (req, res) => {
  try {
    let studentData = await db.getData(Model.Student);
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: studentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getOneStudent = async (req, res) => {
  try {
    let studentData = await db.populateData(Model.Student, {
      _id: req.query.studentId,
    } ,{} , {} , "events");
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: studentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllSuggestion = async (req, res) => {
  try {
    let suggestionData = await Model.Suggestion.find().populate("studentId");
    if (!suggestionData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: suggestionData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getSingleSuggestion = async (req, res) => {
  try {
    let suggestionData = await Model.Suggestion.findOne({
      _id: req.params.id,
    }).populate("studentId");
    if (!suggestionData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: suggestionData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.replyToComplaint = async (req, res) => {
  try {
    let { compalaintId, reply } = req.body;
    let updateComplaint = await db.findAndUpdate(
      Model.Complaint,
      { _id: compalaintId },
      { adminResponse: reply },
      { new: true }
    );
    return res.status(200).send({
      data: updateComplaint,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.replyToSuggetion = async (req, res) => {
  try {
    let { suggetionId, reply } = req.body;
    let updateSuggetion = await db.findAndUpdate(
      Model.Suggestion,
      { _id: suggetionId },
      { adminResponse: reply },
      { new: true }
    );
    return res.status(200).send({
      data: updateSuggetion,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.deleteMagzines = async (req, res) => {
  try {
    let { magzineId } = req.params;
    let deleteMagzine = await db.remove(Model.Emagzines, { _id: magzineId });
    if (!deleteMagzine)
      return res.send({
        statusCode: 400,
        message: "Something went wrong",
      });
    res.send({
      statusCode: 200,
      message: "successfully deleted",
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.getAllAlumini = async (req, res) => {
  try {
    let studentData = await db.getData(Model.Alumini);
    if (!studentData)
      return res.send(config.ErrorStatus.STATUS_MSG.ERROR.SOMETHING_WENT_WRONG);
    return res.status(200).send({
      data: studentData,
      customMessage: "Successfully Verified",
      statusCode: 200,
    });
  } catch (err) {
    res.status(401).send(err);
    return console.log("ERROR", err);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    let {
      name,
      email,
      fatherName,
      phoneNumber,
      rollNumber,
      address,
      dob,
      branch,
    } = req.body;
    console.log(req.files);
    /**********************************HANDLE DRIVER***************************** */
    let checkStudent = await db.findOne(Model.Student, { _id: req.params.id });
    console.log(checkStudent, req.params.id);
    if (!checkStudent)
      return res.status(400).send({ message: "Student not exists" });
    let dataToSet = {
      name: name || checkStudent.name,
      fatherName: fatherName || checkStudent.fatherName,
      phoneNumber: phoneNumber || checkStudent.phoneNumber,
      address: address || checkStudent.address,
      dob: dob || checkStudent.dob,
      branch: branch || checkStudent.branch,
      rollNumber: rollNumber || checkStudent.rollNumber,
      updatedAt: Date.now(),
    };
    if (email) {
      let code = randomstring.generate(8);
      let password = code.toUpperCase();
      await sendMail(email, subject, password).then(async (res) => {
        await User.update({ email }, dataToSave, { new: true, lean: true });
      });
      dataToSet.email = email;
    }
    let updateStudent = await db.findAndUpdate(
      Model.Student,
      { _id: req.params.id },
      dataToSet,
      { new: true }
    );
    return res.send({
      data: updateStudent,
      message: "updated successfuly",
    });
  } catch (err) {
    console.log("===========", err);
    res.status(400).send({ message: "Please enter valid data" });
  }
};
