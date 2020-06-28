var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', async function (req, res, next) {
    let result = await getPicture();
    res.send(result.data.map(img => ({ download_url: img.download_url, author: img.author })));
});

async function getPicture() {
    return axios.get('https://picsum.photos/v2/list?limit=5?random=1');
}
module.exports = router;