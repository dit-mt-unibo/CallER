/**
 * Allows any request from an authenticated user.
 */

module.exports = async function(req, res, proceed) {

    if ( req.session.userId ) {

        return proceed();

    }

    return res.redirect('/admin/login');

}