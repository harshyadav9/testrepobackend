const url = `localhost:3000/confirm`
const csvData = `data:image/png;base64,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`






const emailHtml = (textheader, roll_no, pass) => (

  `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
    .u-row {
      width: 600px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
  
    .u-row .u-col-100 {
      width: 600px !important;
    }
  
  }
  
  @media (max-width: 620px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: calc(100% - 40px) !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  
  p {
    margin: 0;
  }
  
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  
  * {
    line-height: inherit;
  }
  
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  
  table, td { color: #000000; } @media (max-width: 480px) { #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_column_3 .v-col-padding { padding: 30px 0px !important; } #u_column_11 .v-col-padding { padding: 30px 0px !important; } }
      </style>
    
    
  
  <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
      
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #228b22;width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="background-color: #228b22;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="https://assets.unlayer.com/projects/91671/1658553232120-terilogo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 580px;" width="580"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <h2 style="margin: 0px; color: #ecf0f1; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 20px;">
      Welcome to GREEN Olympiad
    </h2>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div id="u_column_3" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 16px;">
      Kindly save this email. You can refer to the following details for any communication related to the examination.
    </h4>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">${textheader}<strong>${roll_no}</strong>   </span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 18px; line-height: 25.2px;">Password : <strong>${pass}</strong>   </span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div id="u_column_11" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 18px;">
      For assistance, call helpdesk between 10 am to 5 pm IST at 011-46571473 (Sunday Closed)
    </h4>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
          
    <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">With regards,</span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">GREEN Olympiad Secretariat</span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`
)




const emailOtpHtml = (otp) => (`<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: calc(100% - 40px) !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } @media (max-width: 480px) { #u_column_2 .v-col-padding { padding: 30px 0px !important; } #u_column_3 .v-col-padding { padding: 30px 0px !important; } #u_column_11 .v-col-padding { padding: 30px 0px !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="background-color: #228b22;width: 600px;padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_2" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #228b22;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://assets.unlayer.com/projects/91671/1658553232120-terilogo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 580px;" width="580"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 5px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h2 style="margin: 0px; color: #ecf0f1; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 20px;">
    Welcome to GREEN Olympiad
  </h2>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_3" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 16px;">
    Kindly save this email. You can refer to the following details for any communication related to the examination.
  </h4>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;">OTP for email verification is : <strong>${otp}</strong></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div id="u_column_11" class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 50px 0px 35px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <h4 style="margin: 0px; line-height: 100%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: 'Playfair Display',serif; font-size: 18px;">
    For assistance, call helpdesk between 10 am to 5 pm IST at 011-46571473 (Sunday Closed)
  </h4>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-padding" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div class="v-col-padding" style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">With regards,</span></p>
<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">GREEN Olympiad Secretariat</span></p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`
)








const paymentConfirmationHtml = (textheader, roll_no, pass) => (`<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">    
    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>

<style type="text/css">

</style>
</head>
<body style="background-color: #5d11e9; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->


<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#f4f4f4" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: -15px 10px 40px 10px;">
                        <a href="#" target="_blank">
                            <img alt="Logo" src="cid:809Ruby90O" width="250" height="250" style="display: block; width: 169px; max-width: 169px; min-width: 169px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 28px; font-weight: 400; margin: 0; letter-spacing: 0px;">Welcome to Green Olympiad </h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  
                  We're excited to have you get started. First, you need to confirm your account.</p>
                </td>
              </tr>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td align="center" style="border-radius: 36px;" >${textheader}:  </td>
                              <td align="center" style="border-radius: 36px;" >${roll_no}</td>
                              
                          </tr>
                           <tr>
                              <td align="center" style="border-radius: 36px;" >Password:  </td>
                              <td align="center" style="border-radius: 36px;" >${pass}</td>
                              
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- COPY -->
             
              <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;"></p>
                  </td>
                </tr>
              <!-- COPY -->
             
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Cheers,<br>The Teri Team</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- NAVIGATION -->
              <!-- <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: 0;">
                    <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">Dashboard</a> -
                    <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">Billing</a> -
                    <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">Help</a>
                  </p>
                </td>
              </tr> -->
              <!-- PERMISSION REMINDER -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: 0;">You received this email because you just signed up for a new account. If it looks weird, <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">view it in your browser</a>.</p>
                </td>
              </tr>
              <!-- UNSUBSCRIBE -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: 0;">If these emails get annoying, please feel free to <a href="http://litmus.com" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                </td>
              </tr>
              <!-- ADDRESS -->
             
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>
    
</body>
</html>
`);



module.exports = { emailHtml, emailOtpHtml, paymentConfirmationHtml }