const nodemailer = require("nodemailer");


const sendEmailLink = async (email, link) => {
/*  console.log("l,,emaillll",email,link)  */
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
/*         host: "smtp.gmail.com",
  port: 465, */
  service: 'gmail',
  port: 465,
  secure: false,
  auth: {
  //  user: 'scoreapp2222@gmail.com', // generated ethereal user
//    pass: 'Scoreapp@2222', // generated ethereal password
user: 'scoreapp2021@gmail.com', // generated ethereal user
pass: 'yjjbvssiusanftdr', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
}
    });

    let mailOptions = {
        from: 'scoreapp2021@gmail.com',
        to: email,
        subject: 'Modifier votre mot de passe',
        html: `
      
      <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body style=" padding: 0;margin: 0;font-family: Arial, Helvetica, sans-serif;">
    <div style="text-align: center;background: #153d77;box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.25) !important;font-size: 34px;padding: 25px 0;color:white;">
       SCORES </div>
      <div style=" color:  #153d77; font-weight: bold; padding: 28px;height: 30vh;text-align:center">
         <p style="text-align:center">Pour modifier le mot de passe , merci de visiter ce lien.</p>
         <br>
         <a style="text-decoration: none;color: #fff;font-weight: bold;margin-top:100px;cursor:pointer" href="${link}">
            <button style=" background-color: #153d77;padding: 14px 28px;border: none;cursor: pointer;font-weight: bold;color: #fff;border-radius: 25px;">Restorer votre mot de passe</button>
         </a>
      </div>
      <footer style="background: #153d77;color:  #fff;text-align:center;padding:25px;font-size: 18px !important;">
        SCORES-APP
      </footer> 
  
  
  
  </body>
      
  </html>
      
      `
    };
   /*  console.log("mailOptions",mailOptions) */
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
const sendEmailLinkProf = async (email, link) => {
    /*  console.log("l,,emaillll",email,link)  */
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
    /*         host: "smtp.gmail.com",
      port: 465, */
      service: 'gmail',
      port: 465,
      secure: false,
      auth: {
      //  user: 'scoreapp2222@gmail.com', // generated ethereal user
    //    pass: 'Scoreapp@2222', // generated ethereal password
    user: 'scoreapp2021@gmail.com', // generated ethereal user
    pass: 'yjjbvssiusanftdr', // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
    }
        });
    
        let mailOptions = {
            from: 'scoreapp2021@gmail.com',
            to: email,
            subject: 'Modifier votre mot de passe',
            html: `
          
          <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>
      <body style=" padding: 0;margin: 0;font-family: Arial, Helvetica, sans-serif;">
        <div style="text-align: center;background: #153d77;box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.25) !important;font-size: 34px;padding: 25px 0;color:white;">
           SCORES </div>
          <div style=" color:  #153d77; font-weight: bold; padding: 28px;height: 30vh;text-align:center">
             <p style="text-align:center">Pour modifier le mot de passe , merci de visiter ce lien.</p>
             <br>
             <a style="text-decoration: none;color: #fff;font-weight: bold;margin-top:100px;cursor:pointer" href="${link}">
                <button style=" background-color: #153d77;padding: 14px 28px;border: none;cursor: pointer;font-weight: bold;color: #fff;border-radius: 25px;">Restorer votre mot de passe</button>
             </a>
          </div>
          <footer style="background: #153d77;color:  #fff;text-align:center;padding:25px;font-size: 18px !important;">
            SCORES-APP
          </footer> 
      
      
      
      </body>
          
      </html>
          
          `
        };
       /*  console.log("mailOptions",mailOptions) */
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    
    }
const sendEmailLinkPat = async (email, link) => {
        /*  console.log("l,,emaillll",email,link)  */
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
        /*         host: "smtp.gmail.com",
          port: 465, */
          service: 'gmail',
          port: 465,
          secure: false,
          auth: {
          //  user: 'scoreapp2222@gmail.com', // generated ethereal user
        //    pass: 'Scoreapp@2222', // generated ethereal password
        user: 'scoreapp2021@gmail.com', // generated ethereal user
        pass: 'yjjbvssiusanftdr', // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
        }
            });
        
            let mailOptions = {
                from: 'scoreapp2021@gmail.com',
                to: email,
                subject: 'Modifier votre mot de passe',
                html: `
              
              <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
          </head>
          <body style=" padding: 0;margin: 0;font-family: Arial, Helvetica, sans-serif;">
            <div style="text-align: center;background: #153d77;box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.25) !important;font-size: 34px;padding: 25px 0;color:white;">
               SCORES </div>
              <div style=" color:  #153d77; font-weight: bold; padding: 28px;height: 30vh;text-align:center">
                 <p style="text-align:center">Pour modifier le mot de passe , merci de visiter ce lien.</p>
                 <br>
                 <a style="text-decoration: none;color: #fff;font-weight: bold;margin-top:100px;cursor:pointer" href="${link}">
                    <button style=" background-color: #153d77;padding: 14px 28px;border: none;cursor: pointer;font-weight: bold;color: #fff;border-radius: 25px;">Restorer votre mot de passe</button>
                 </a>
              </div>
              <footer style="background: #153d77;color:  #fff;text-align:center;padding:25px;font-size: 18px !important;">
                SCORES-APP
              </footer> 
          
          
          
          </body>
              
          </html>
              
              `
            };
           /*  console.log("mailOptions",mailOptions) */
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        
        }
const sendEmail = async (email, password) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'scoreapp2222@gmail.com', // generated ethereal user
            pass: 'yjjbvssiusanftdr', // generated ethereal password
        },
        
    });

    let mailOptions = {
        from: 'scoreapp2222@gmail.com',
        to: email,
        subject: 'Modifier votre mot de passe',
        html: `
      <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
  </head>

  <body style=" padding: 0;margin: 0;font-family: Arial, Helvetica, sans-serif;">
      <div
          style="text-align: center;background: #153d77;box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.25) !important;font-size: 34px;padding: 25px 0;color:white;">
          SCORES </div>
      <div style=" color:  #153d77; font-weight: bold; padding: 28px;height: 30vh;text-align:center">
          <p style="text-align:center">Mot de passe généré.</p>
          <br>
              <p
                  style=" background-color: #153d77;padding: 14px 28px;border: none;cursor: pointer;font-weight: bold;color: #fff;border-radius: 25px;">
                  ${password}</p>
      </div>
      <footer style="background: #153d77;color:  #fff;text-align:center;padding:25px;font-size: 18px !important;">
          SCORES-APP
      </footer>
  
  
  
  </body>
  
  </html>  
  `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const validEmailLink = async (email,patient) => {  
    // create reusable transporter object using the default SMTP transport
 /*    console.log(patient.password,patient,333333333) */
    let links ="http://185.104.172.119:3001/"
    let transporter = nodemailer.createTransport({
/*         host: "smtp.gmail.com",
  port: 465, */
  service: 'gmail',
  port: 465,
  secure: false,
  auth: {
  //  user: 'scoreapp2222@gmail.com', // generated ethereal user
//    pass: 'Scoreapp@2222', // generated ethereal password
user: 'scoreapp2021@gmail.com', // generated ethereal user
pass: 'yjjbvssiusanftdr', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
}
    });

    let mailOptions = {
        from: 'scoreapp2021@gmail.com',
        to: email,
        subject: `Validation de la création d'un compte.`,
        html: `
      
      <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
  </head>
  <body style=" padding: 0;margin: 0;font-family: Arial, Helvetica, sans-serif;">
    <div style="text-align: center;background: #153d77;box-shadow: 0px 5px 3px rgba(0, 0, 0, 0.25) !important;font-size: 34px;padding: 25px 0;color:white;">
       SCORES </div>
      <div style=" color:  #153d77; font-weight: bold; padding: 28px;height: 30vh;text-align:center">
      <p style="text-align:center">Bonjour ${patient.name} ${patient.lastname}</p>
      <p style="text-align:center"> Vous pouvez accéder à votre espace client  <a style="text-decoration: none;font-weight: bold;margin-top:100px;cursor:pointer" href="${links}">
      Scores
   </a> à l'aide des identifiants suivants :</p>
         <p style="text-align:center">E-mail :${email}</p>
         <p style="text-align:center">Mot de passe :${patient.password}</p>
         <br>
        
      </div>
      <footer style="background: #153d77;color:  #fff;text-align:center;padding:25px;font-size: 18px !important;">
        SCORES-APP
      </footer> 
  
  
  
  </body>
      
  </html>
      
      `
    };
   /*  console.log("mailOptions",mailOptions) */
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
module.exports = { sendEmail, sendEmailLink ,validEmailLink,sendEmailLinkProf,sendEmailLinkPat}