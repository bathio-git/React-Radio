var request = require("request");

var data = {
    'url': 'https://n10as.out.airtime.pro/n10as_a',
    'return': 'apple_music,spotify',
    'api_token': 'test'
};

request({
    uri: 'https://api.audd.io/',
    form: data,
    method: 'POST'
  }, function (err, res, body) {
    console.log(body);
});

var axios = require("axios");

var data = {
    'api_token': 'test',
    'url': 'https://npr-ice.streamguys1.com/live.mp3',
    'radio_id': '3249',
};

axios({
    method: 'post',
    url: 'https://api.audd.io/addStream/',
    data: data,
    headers: { 'Content-Type': 'multipart/form-data' },
})
.then((response) => {
    console.log(response);
})
.catch((error) =>  {
    console.log(error);
});