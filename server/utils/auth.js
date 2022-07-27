const jwt = require('jsonwebtoken');

const secret = 'typo'
const maxAge = '6h'

module.exports = {
    authMiddleware: ({ req }) => {
        let token = req.body.token || req.query.token || req.headers.authorization

        if(req.headers.authorization) {
            token = token.split(' ').pop().trim()
        }

        if(!token) {
            return req
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: maxAge })
            req.user = data;
        } catch (err) {
            console.error(err)
        }
        return req;
    },
    signToken: ({email, name, _id}) => {
        const payload = { email, name, _id}
        return jwt.sign({ data: payload }, secret, {expiresIn: maxAge })
    }
}