/* *
 * index.js
 * Nandagopan Dilip
 * 301166925
 * 29/10/2022
 */

exports.home = function(req, res, next) {
    console.log('===> Original URL: ' + req.session.url);
    res.render('index', { 
        title: 'Home',
        userName: req.user ? req.user.username : ''
    });
};