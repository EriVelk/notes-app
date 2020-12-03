const indexController = {};

indexController.renderIndex = (req, res) => {
    res.render('index', {
        title: 'Auth with NodeJs and Express'
    });
}

module.exports = indexController;