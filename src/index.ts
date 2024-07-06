import fastify from 'fastify'
import { userRoutes } from './routes/userRoutes'
import { errorHandler } from './middleware/_errors/errorHandler'


export const server = fastify()


server.listen({
     port: 3333,
}, () => {
     console.log("Server Running🔥")
})

// Rotas 
server.register(userRoutes)


server.setErrorHandler(errorHandler)