import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import DiscordStrategy from 'passport-discord';
import { config } from './config.js';

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.use(
  new DiscordStrategy(
    {
      clientID: config.discord.clientID,
      clientSecret: config.discord.clientSecret,
      callbackURL: config.discord.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

export default passport;
