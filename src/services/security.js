const mongoose = require("./db");
const { User, Portao } = require("../models");
var admin = require("firebase-admin");

const portaoToken = {};

const isValidTokenUser = async (email, token) => {
  return admin.auth()
    .verifyIdToken(token)
    .then(async (decode) => {
      if (email !== decode.email) throw new Error("Usuário inválido");
      let user = await User.findOne({ email: decode.email });

      if (!user) {
        user = new User({
          email: decode.email,
          photo: decode.picture,
          token: token,
        });
        await user.save();
      } else {
        user.token = token;
        await user.save();
      }
      return user;
    })
    .catch((err) => err);
}

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
}

module.exports = { isValidTokenUser, isValidTokenPortao };
