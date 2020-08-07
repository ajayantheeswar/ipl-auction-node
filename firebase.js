const admin = require("firebase-admin");

const serviceAccount = require("./ipl-auction-94401-firebase-adminsdk-v595g-3c8bf471b8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ipl-auction-94401.firebaseio.com",
  storageBucket: "ipl-auction-94401.appspot.com",
});

exports.bucket = admin.storage().bucket()



