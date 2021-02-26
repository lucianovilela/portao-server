const mongoose = require("../services/db");

const Portao = mongoose.model(
  "Portao",
  new mongoose.Schema({
    descricao: "string",
    key: { type: "string", index: true },
    status: "string",
    token: "string",
    updated: { type: Date, default: Date.now },
  })
);

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    nome: "string",
    email: { type: "String", index: true },
    token: "string",
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
