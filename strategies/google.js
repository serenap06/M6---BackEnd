const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const Author = require("../modules/authors/service");
const jwt = require("jsonwebtoken");
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let author = await Author.findOne({
        googleID: profile.id,
      });
      if (!author) {
        author = new Author({
          name: profile.name.givenName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          googleID: profile.id,
        });
        await author.save();
      }
      const token = jwt.sign(
        { id: author._id },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN,
      );
      done(null, { token });
    } catch (e) {
      done(e);
    }
  },
);

module.exports = googleStrategy;
