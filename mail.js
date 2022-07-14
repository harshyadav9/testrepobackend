const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY



let apiInstance = new Sib.EmailCampaignsApi();
let campaignId = 3;

let emailTo = new Sib.SendTestEmail();

emailTo = {
    "emailTo": ["harshy110@gmail.com", "swatiyadav2704@gmail.com"]
};



// apiInstance.getEmailCampaign(campaignId).then(function (data) {
//     console.log('API called successfully. Returned data: ' + JSON.stringify(data));
// }, function (error) {
//     console.error(error);
// });

apiInstance.getEmailCampaign(campaignId).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function (error) {
    console.error(error);
});