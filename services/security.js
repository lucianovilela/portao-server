const mongoose = require("./db");
const { User, Portao } = require("../models");


const userToken = {};
const portaoToken = {};

const isValidTokenUser = async (email, token) => {
  if (userToken[email] === token) {
    return true;
  }
  return await User.findOne({ email: email }).then((user) => {
    if (user.token === token) {
      userToken[email] = user.token;
      return true;
    }
    return false;
  });
};
const isValidTokenPortao = async (id, token) => {
  if (portaoToken[id] === token) {
    //console.log("estava na memoria", id, token);
    return true;
  }
  return await Portao.findOne({ _id: new mongoose.Types.ObjectId(id) }).then(
    (portao) => {
      if (portao.token === token) {
        portaoToken[id] = portao.token;
        return true;
      }
      return false;
    }
  );
};


module.exports = { isValidTokenUser, isValidTokenPortao };
