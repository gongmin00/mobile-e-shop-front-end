require('dotenv').config()
module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Smart Resume",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_APIKEY,
          authDomain:process.env.FIREBASE_AUTHDOMAIN,
          projectId:process.env.FIREBASE_PROJECTID,
          storageBucket: process.env.FIREBASE_STORAGEBUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
          appId:process.env.FIREBASE_APPID ,
          measurementId: process.env.FIREBASE_MEASUREMENTID,
        }
      },
    },
  ],
};
