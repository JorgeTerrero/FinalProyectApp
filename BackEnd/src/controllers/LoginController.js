const passport = require('passport');
const _login = {};

_login.UserLogin = async (req , res , next) =>{

    try {

        passport.authenticate('local' , (err , user , info)=>{

            if(err) {
                return res.json({
                    Ok:false,
                    err
                });
            }

            req.login(user , err =>{
                if(err){
                    return res.json({
                        Ok:false,
                        message: 'Email o Password Incorrect'
                    });
                }

                res.json({
                    Ok: true,
                    message: 'Welcome to the Application',
                    session: req.isAuthenticated()
                });
            });

        })(req , res , next);
        
    } catch (err) {
        res.status(400).json({
             Ok: false,
             err
        });
    }

};

_login.UserLogout = async (req , res) =>{
    try {

        const session = req.isAuthenticated();
        req.logout();
        res.json({
            Ok:true,
            message:'You Was LoggedOut',
            session
        });
        
    } catch (err) {
        res.status(400).json({
              Ok: false,
              err
        });
    }
};

module.exports = _login;