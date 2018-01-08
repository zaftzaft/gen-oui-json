'use strict';

const fs = require("fs");
const readline = require("readline");


const csvParse = s => {
  return s.split(",").reduce((a,d) => {
    if(a[1]) {
      a[0][a[0].length-1] += `,${d}`;

      if(/"$/.test(d)) {
        a[1] = false;
        a[0][a[0].length-1] = a[0][a[0].length-1].replace(/"/g, "");
      }
    }
    else {
      if(/^"/.test(d)) {
        a[1] = true;
      }
      a[0].push(d);
    }

    return a;
  }, [[], false])[0]
};


let ouiData = {};

const parseOuiCsv = filename => {
  return new Promise((resolv, reject) => {
    let ouiHeadFlg = true;

    const oui = readline.createInterface({
      input: fs.createReadStream(filename)
    });

    oui.on("line", line => {
      if(ouiHeadFlg) {
        ouiHeadFlg = false;
        return;
      }
      const csv = csvParse(line);
      ouiData[csv[1]] = csv[2];
    });

    oui.on("close", () => {
      resolv(true);
    });
  });
};


Promise.all([
  parseOuiCsv("data/oui.csv"),
  parseOuiCsv("data/mam.csv"),
  parseOuiCsv("data/oui36.csv")
]).then(() => {
  console.log(JSON.stringify(ouiData));
});

