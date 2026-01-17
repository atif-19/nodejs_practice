const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');
const app = require('express')();
// implementing local authentication strategy
passport.use(new LocalStrategy(async (User, password, done) => {
  try {
    const username = await Person.findOne({ username: User });
    // we should not print the password in logs for security reasons
    // console.log("Received username:", User);
    // console.log("Received password:", password);
    if (!username) {
      // done(error,user,info)'
      console.log("Username not found");
      return done(null, false, { message: 'Incorrect username' });
    }
    if (password !== username.password) {
      console.log("Password mismatch");
      return done(null, false, { message: 'Incorrect password' });
    }
    else {
      console.log("Authentication successful");
      return done(null, username);
    }
  }
  catch (error) {
    console.error("Error during authentication:", error);
    done(error);
  }
}));
// initialize passport middleware
app.use(passport.initialize());

// we want to authenticate user before accessing this route
const localAuthMiddleware = passport.authenticate('local', { session: false });

module.exports = localAuthMiddleware;