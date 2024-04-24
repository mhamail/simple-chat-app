const User = require("../models/authModel");
const messageModel = require("../models/messageModel");
const { getIo } = require("../lib/Socketio");

module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  // console.log(myId);
  try {
    const friendGet = await User.find({});
    const filter = friendGet.filter((d) => d.id !== myId);
    // console.log(filter);
    res.status(200).json({ success: true, friends: filter });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Sever Error",
      },
    });
  }
};

module.exports.messageUploadDB = async (req, res) => {
  const io = getIo();
  const senderId = req.myId;
  const { senderName, recieverId, message } = req.body;
  console.log(req.body);
  // const senderId = req.myId;

  try {
    const insertMessage = await messageModel.create({
      senderId: senderId,
      senderName: senderName,
      recieverId: recieverId,
      message: {
        text: message,
        image: "",
      },
    });
    io.emit("sendMessage", insertMessage);
    res.status(201).json({
      success: true,
      message: insertMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: {
        errorMessage: error.message,
      },
    });
  }
};

module.exports.messageGet = async (req, res) => {
  const myId = req.myId;
  const fdId = req.params.id;

  try {
    let getAllMessage = await messageModel.find({});
    console.log(getAllMessage);

    getAllMessage = getAllMessage.filter(
      (m) =>
        (m.senderId === myId && m.recieverId === fdId) ||
        (m.recieverId === myId && m.senderId === fdId)
    );

    res.status(200).json({
      success: true,
      message: getAllMessage,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server error",
      },
    });
  }
};
