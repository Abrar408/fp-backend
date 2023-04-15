const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../model/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((newUser) => {
    done(null, newUser);
  });  
});

passport.use(
    new LinkedInStrategy(
      {
        clientID: '77dyc56olu1htu',
        clientSecret: 'hAEk83PwDMCD58Xv',
        callbackURL: "/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
      },
      function (req, accessToken, refreshToken, profile, done) {
        // console.log(accessToken)
        // console.log(profile)  
        // return done(null, profile);
        User.findOne({oAuthID:profile.id}).then((user)=>{
          if(!user){
            new User({ 
              oAuthID:profile.id,
              username: profile.displayName,
              email: profile.emails[0].value
            }).save().then((currUser) => {
              console.log('new user: ' + currUser);
              done(null, currUser);
            })
            .catch((err) => {console.log('error: ' + err)})
          } else {
            console.log('id already exists');
            done(null, user);
          }
        }) 
      }
    )
  );


  
 