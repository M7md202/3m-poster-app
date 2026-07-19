const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// أول "نقطة تواصل" (Endpoint) عشان نتأكد إن السيرفر شغال
app.post('/api/publish', (req, res) => {
    const { postContent, accessToken } = req.body;
    console.log("استلمت طلب نشر:", postContent);
    
    // هنا هنحط كود النشر لفيسبوك لاحقاً
    res.json({ message: "الطلب وصل للسيرفر بنجاح!" });
});

app.listen(3000, () => {
    console.log('السيرفر شغال على البورت 3000');
});