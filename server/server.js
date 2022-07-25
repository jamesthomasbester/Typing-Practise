const express = require('express');
const path = require('path');
const session = require('express-session');
const {typeDefs, resolvers} = require('./schemas')
const { ApolloServer } = require('apollo-server-express');
const db = require('./connection/connection')
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    typeDefs,
    resolvers
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: 'typo',
    cookie: {},
    resave: false,
    maxAge: 60000,
    saveUninitialized: true
}))

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`server running on http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
}

startApolloServer(typeDefs, resolvers)