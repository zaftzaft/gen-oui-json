'use strict'

const oui = require("./oui.json");


console.log("package main");
console.log("var oui = map[uint64]string {");

Object.keys(oui).forEach(key => {
  const vendor = oui[key].replace(/\"/g, "");
  console.log(`  0x${parseInt(key, 16).toString(16)}: "${vendor}",`);
});


console.log("}");
