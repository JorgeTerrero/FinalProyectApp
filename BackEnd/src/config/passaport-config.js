const _user = require('../models/Users');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'} , 
        async (email , password , done) =>{

            try {

                const userDB = await _user.findOne({email: email});
                if(!userDB){
                    return done(null , false , {message: 'User Dont Exits'});
                }

                const isMatch = await bcrypt.compareSync(password , userDB.passwordSalt);

                if(!isMatch){
                    return done(null , false , {message: 'Password Incorrect'});
                }else{
                    return done(null , userDB);
                }


                
            } catch (err) {
               return done(null , false , err);
            }


        })
    );

    passport.serializeUser( (user , done) =>{
        done(null , user.id);
    });

    passport.deserializeUser((id , done)=>{
         _user.findById(id , (err , user)=>{
              done(err , user);
         });
    });
}
