// var express = require('express');
// var router = express.Router();

// // const messages = [
// //   {
// //     text: 'Hi there!',
// //     username: 'Amando',
// //     postdate: new Date(),
// //   },
// //   {
// //     text: 'Hello World!',
// //     username: 'Charles',
// //     postdate: new Date(),
// //   },
// // ];

// /* GET home page. */
// // router.get('/message', function (req, res, next) {
// //   res.render('message', { title: 'Mini Messageboard', messages: messages });
// // });
// // /* GET new form. */
// // router.get('/new_message', function (req, res, next) {
// //   res.render('msgform', { title: 'Mini Messageboard', messages: messages });
// // });

// /* Post new submission */
// router.post('/new', function (req, res, next) {
//   const { name, message } = req.body;
//   messages.push({ user: name, text: message, date: new Date() });
//   res.redirect('message');
// });

// module.exports = router;