const mongoose = require("../services/db");
const { v4: uuidv4 } = require("uuid");

const newKey = () => {
  return uuidv4();
};

const Portao = mongoose.model(
  "Portao",
  new mongoose.Schema({
    descricao: "string",
    key: "string",
    status: { type: String, default: "fechado" },
    token: "string",
    infoAberura :"object",
    updated: { type: Date, default: Date.now },
  })
  .pre('save',  function (next){
      if(this.status === "fechado"){
        this.key = newKey();
        this.infoAberura = {};
      }
      this.updated = Date.now;
      next();
  } )
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nome: "string",
    email: { type: "String", index: true },
    token: "string",
    photo : "string",
    updated: { type: Date, default: Date.now },
  })
);

const Historico = mongoose.model(
  "Historico",
  new mongoose.Schema({
    portao: { type: "ObjectId", ref: "Portao" },
    user: { type: "ObjectId", ref: "User" },
    lat : "number",
    long : "number",
    updated: { type: Date, default: Date.now },
  })
);

module.exports = { Portao, User, Historico };
