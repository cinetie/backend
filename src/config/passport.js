/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import dotenv from "dotenv";

const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const passport = require("passport");



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      name: "google",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const firstName = profile._json.given_name;
        const lastName = profile._json.family_name;
        const email = profile.emails[0].value;
        const user = { firstName, lastName, email };
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      name: "facebook",
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: "/auth/facebook/redirect",
      profileFields: ["emails", "name"],
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        const firstName = profile._json.first_name;
        const lastName = profile._json.last_name;
        const email = profile.emails[0].value;
        const user = { firstName, lastName, email };
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
