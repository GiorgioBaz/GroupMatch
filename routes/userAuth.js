const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const nodemailer = require("nodemailer");
const User = require("../models/user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
	const body = req.body;
	const userEmail = body.email;

	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;

		if (!userEmail.includes("@") || !userEmail.includes(".com")) {
			return res.send({
				success: false,
				message: "Please enter a valid email",
			});
		}

		if (!user)
			res.send({
				success: false,
				message: "Incorrect email or password",
			});
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send({
					success: true,
					message: "Successfully Authenticated",
				});
				console.log(req.user);
			});
		}
	})(req, res, next);
});

app.post("/register", (req, res) => {
	const body = req.body;
	const userEmail = body.email;

	if (!userEmail.includes("@") || !userEmail.includes(".com")) {
		return res.send({
			success: false,
			message: "Please enter a valid email",
		});
	}

	User.findOne({ email: req.body.email }, async (err, doc) => {
		if (err) throw err;

		if (doc)
			res.send({
				success: false,
				message: "An account already exists with this email.",
			});

		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
			});
			await newUser.save();
			res.send({ success: true, message: "Welcome to GroupMatch!" });
		}
	});
});

app.post("/forgotpassword", (req, res) => {
	const body = req.body;
	const newPassword = body.password;
	const userEmail = body.email;
	const inputtedCode = body.resetCode;

	User.findOne({ email: userEmail }, (err, user) => {
		if (err) throw err;

		if (!userEmail) {
			return res.send({
				success: false,
				message:
					"Please check your email for incorrect spelling or missing characters",
			});
		}

		if (!user) {
			return res.send({
				success: false,
				message:
					"Not a registered account, please check your email for incorrect spelling or missing characters",
			});
		}
		if (user && !newPassword) {
			let transporter = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: process.env.EMAIL,
					pass: process.env.PASSWORD,
				},
			});
			console.log(process.env.EMAIL);
			console.log(process.env.PASSWORD);

			let mailOptions = {
				from: "groupmatchapp@gmail.com",
				to: userEmail,
				subject: "GroupMatch Application Password Reset!",
				html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
          <head>
          <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
          <meta content="width=device-width" name="viewport"/>
          <!--[if !mso]><!-->
          <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
          <!--<![endif]-->
          <title></title>
          <!--[if !mso]><!-->
          <!--<![endif]-->
          <style type="text/css">
              body {
                margin: 0;
                padding: 0;
              }
          
              table,
              td,
              tr {
                vertical-align: top;
                border-collapse: collapse;
              }
          
              * {
                line-height: inherit;
              }
          
              a[x-apple-data-detectors=true] {
                color: inherit !important;
                text-decoration: none !important;
              }
            </style>
          <style id="media-query" type="text/css">
              @media (max-width: 660px) {
          
                .block-grid,
                .col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
          
                .block-grid {
                  width: 100% !important;
                }
          
                .col {
                  width: 100% !important;
                }
          
                .col>div {
                  margin: 0 auto;
                }
          
                img.fullwidth,
                img.fullwidthOnMobile {
                  max-width: 100% !important;
                }
          
                .no-stack .col {
                  min-width: 0 !important;
                  display: table-cell !important;
                }
          
                .no-stack.two-up .col {
                  width: 50% !important;
                }
          
                .no-stack .col.num4 {
                  width: 33% !important;
                }
          
                .no-stack .col.num8 {
                  width: 66% !important;
                }
          
                .no-stack .col.num4 {
                  width: 33% !important;
                }
          
                .no-stack .col.num3 {
                  width: 25% !important;
                }
          
                .no-stack .col.num6 {
                  width: 50% !important;
                }
          
                .no-stack .col.num9 {
                  width: 75% !important;
                }
          
                .video-block {
                  max-width: none !important;
                }
          
                .mobile_hide {
                  min-height: 0px;
                  max-height: 0px;
                  max-width: 0px;
                  display: none;
                  overflow: hidden;
                  font-size: 0px;
                }
          
                .desktop_hide {
                  display: block !important;
                  max-height: none !important;
                }
              }
            </style>
          </head>
          <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #eaeaef;">
          <!--[if IE]><div class="ie-browser"><![endif]-->
          <table bgcolor="#eaeaef" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #eaeaef; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top;" valign="top">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#eaeaef"><![endif]-->
          <div style="background-color:#1aa19c;">
          <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #1aa19c;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#1aa19c;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#1aa19c;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#1aa19c"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#1aa19c;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
          <div style="width:100% !important;">
          <!--[if (!mso)&(!IE)]><!-->
          <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
          <!--<![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 4px solid #1AA19C; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
          </div>
          </div>
          <div style="background-color:#fff;">
          <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#fff;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#fff"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#fff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
          <div style="width:100% !important;">
          <!--[if (!mso)&(!IE)]><!-->
          <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
          <!--<![endif]-->
          <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
          <div style="font-size:1px;line-height:22px"> </div>}
          <div style="font-size:1px;line-height:25px"> </div>
          <!--[if mso]></td></tr></table><![endif]-->
          </div>
          <!--[if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
          </div>
          </div>
          <div style="background-color:transparent;">
          <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f8f8f9;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f8f8f9;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#f8f8f9"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#f8f8f9;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
          <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
          <div style="width:100% !important;">
          <!--[if (!mso)&(!IE)]><!-->
          <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
          <!--<![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
          </div>
          </div>
          <div style="background-color:transparent;">
          <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #fff;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#fff;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#fff"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#fff;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
          <div style="width:100% !important;">
          <!--[if (!mso)&(!IE)]><!-->
          <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
          <!--<![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 60px; padding-right: 0px; padding-bottom: 12px; padding-left: 0px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <div align="center" class="img-container center fixedwidth" style="padding-right: 40px;padding-left: 40px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 40px;padding-left: 40px;" align="center"><![endif]-->
          <!--[if mso]></td></tr></table><![endif]-->
          </div>
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 50px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
          <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
          <div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
          <p style="font-size: 30px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 36px; margin: 0;"><span style="font-size: 30px; color: #2b303a;"><strong>Reset your account password below</strong></span></p>
          </div>
          </div>
          <!--[if mso]></td></tr></table><![endif]-->
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
          <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:10px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
          <div style="line-height: 1.5; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #555555; mso-line-height-alt: 18px;">
          <p style="font-size: 15px; line-height: 1.5; text-align: center; word-break: break-word; font-family: inherit; mso-line-height-alt: 23px; margin: 0;"><span style="color: #808389; font-size: 15px;">Click the button below to reset your account password, using your code: <strong>${user._id}</strong></span></p>
          </div>
          </div>
          <!--[if mso]></td></tr></table><![endif]-->
          <div align="center" class="button-container" style="padding-top:15px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 15px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46.5pt; width:198.75pt; v-text-anchor:middle;" arcsize="97%" stroke="false" fillcolor="#0068a5"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, sans-serif; font-size:16px"><![endif]-->
          <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#0068a5;border-radius:60px;-webkit-border-radius:60px;-moz-border-radius:60px;width:auto; width:auto;;border-top:1px solid #0068a5;border-right:1px solid #0068a5;border-bottom:1px solid #0068a5;border-left:1px solid #0068a5;padding-top:15px;padding-bottom:15px;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;"><span style="font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><a href="http://localhost:3000/resetpassword" style="color:white"> <strong>Reset Your Password</strong></a></span></span></div>
          <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
          </div>
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 60px; padding-right: 0px; padding-bottom: 12px; padding-left: 0px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
          </div>
          </div>
          <div style="background-color:transparent;">
          <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #f8f8f9;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f8f8f9;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#f8f8f9"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#f8f8f9;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
          <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
          <div style="width:100% !important;">
          <!--[if (!mso)&(!IE)]><!-->
          <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
          <!--<![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 20px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid #BBBBBB; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
          </div>
          </div>
          <div style="background-color:transparent;">
          <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #2b303a;">
          <div style="border-collapse: collapse;display: table;width: 100%;background-color:#2b303a;">
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#2b303a"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#2b303a;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
          <div style="width:100% !important;">
          <!--[if (!mso)&(!IE)]><!-->
          <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
          <!--<![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 4px solid #1AA19C; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
          <!--[if mso]></td></tr></table><![endif]-->
          </div>
          <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
          
          <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 25px; padding-right: 40px; padding-bottom: 10px; padding-left: 40px;" valign="top">
          <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #555961; width: 100%;" valign="top" width="100%">
          <tbody>
          <tr style="vertical-align: top;" valign="top">
          <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
          </tr>
          </tbody>
          </table>
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if (!mso)&(!IE)]><!-->
          </div>
          <!--<![endif]-->
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
          </div>
          </div>
          </div>
          <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
          </td>
          </tr>
          </tbody>
          </table>
          <!--[if (IE)]></div><![endif]-->
          </body>
          </html>`,
			};

			transporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					console.log("Error Occurs: ", err);
				} else {
					console.log("Email Sent");
					return res.send({
						success: true,
						message: "A reset email has been sent",
					});
				}
			});
		}
	});

	User.findOne({ email: userEmail }, (err, user) => {
		if (user && !user.passwordRequested) {
			const currentUserId = user._id;

			User.findOneAndUpdate(
				{ email: userEmail },
				{ passwordRequested: true }
			).then();
		} else if (user && user.passwordRequested && newPassword) {
			if (newPassword.length < 8) {
				return res.send({
					success: false,
					message: "Password cannot be shorter than 8 characters",
				});
			}
			if (!newPassword) {
				return res.send({
					success: false,
					message: "Password cannot be blank!",
				});
			} else {
				User.findOne(
					{ _id: inputtedCode, email: userEmail },
					async (err, user) => {
						//This query is an ID check to see if the user already exists
						if (!user) {
							return res.send({
								success: false,
								message: "Incorrect reset code",
							});
						}

						if (user && user.passwordRequested) {
							User.findOneAndUpdate(
								{ _id: inputtedCode },
								{ passwordRequested: false }
							).then(); //find the unique user entry and execute an update to log the account's successful email verification

							User.findOneAndUpdate(
								{ email: userEmail },
								{ password: await bcrypt.hash(newPassword, 10) }
							).then(() => {
								req.logOut();
								return res.send({
									success: true,
									message: "Your password has been changed!",
								});
							});
						}
					}
				);
			}
		}
	});
});

app.post("/logout", function (req, res) {
	req.logout();
	res.send("Successfully Logged Out");
});
//Gets the currently logged in user
app.get("/currentUser", (req, res) => {
	res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

//----------------------------------------- Postman Routes Only ---------------------------------------------------

// DELETES ALL USERS IN THE DB ---- USE WISELY
app.delete("/deleteAll", async function (req, res) {
	await User.deleteMany({});
	res.send("Successfully Deleted All Records");
});

// Gets a specific user by email
app.post("/user", function (req, res) {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) throw err;
		if (!user) res.send("Ya dun goofed lad");
		else {
			res.send(user);
		}
	});
});

// Convienient Way to Get All Users in DB
app.get("/allUsers", function (req, res) {
	User.find({}, (err, user) => {
		if (err) throw err;
		if (!user) res.send("Ya dun goofed lad");
		else {
			res.send(user);
		}
	});
});

module.exports = app;
