import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import fs from 'fs'
//import cors from 'cors'
import {
  getAllPosts,
  addPost,
  getPostById,
  updatePost,
  deletePost,
} from './db.js'

const app = express()
const port = 22246

// Middleware para parsear el body de las solicitudes
app.use(express.json())

//app.use(cors())

// Simulación de una base de datos de posts
let posts = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//const swaggerJsdoc = require('swagger-jsdoc')
//const swaggerUi = require('swagger-ui-express')

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Posts',
      version: '1.0.0',
      description: 'Una API para administrar posts',
    },
  },
  apis: ['./src/*.js'], // Ruta donde se encuentran tus archivos de definición de rutas
}

const swaggerSpec = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Ruta para obtener todos los posts
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Obtiene todos los posts
 *     responses:
 *       '200':
 *         description: OK
 */
app.get('/posts', async (req, res) => {
  try {
    const allPosts = await getAllPosts()
    res.status(200).json(allPosts)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

// Ruta para obtener un post específico por su ID
/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtiene un post por su ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *       '404':
 *         description: Post no encontrado
 *       '500':
 *         description: Error interno
 */
app.get('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await getPostById(postId)
    if (post) {
      res.status(200).json(post)
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

// Ruta para crear un nuevo post
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Post creado exitosamente
 *       '500':
 *         description: Error interno
 */
app.post('/posts', async (req, res) => {
  const postData = req.body
  try {
    const newPostId = await addPost(postData)
    res.status(201).json({ id: newPostId, ...postData }) // Retorna el ID del nuevo post
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

// Ruta para editar un post existente
/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Edita un post existente
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Post editado exitosamente
 *       '404':
 *         description: Post no encontrado
 *       '500':
 *         description: Error interno
 */
app.put('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  const postData = req.body
  try {
    const success = await updatePost(postId, postData)
    if (success) {
      res.status(200).json({ id: postId, ...postData }) // Retorna el ID del post actualizado
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

// Ruta para borrar un post existente
/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Borra un post existente
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID del post
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Post borrado exitosamente
 *       '404':
 *         description: Post no encontrado
 *       '500':
 *         description: Error interno
 */
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId
  try {
    const success = await deletePost(postId)
    if (success) {
      res.sendStatus(204) // Retorna 204 No Content si se borra correctamente
    } else {
      res.status(404).send('Post not found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
})

// Middleware para manejar errores 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Error interno del servidor')
})

// Middleware para manejar errores 501
app.use((req, res) => {
  res.status(501).send('Método no implementado')
})

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).send('Endpoint no encontrado')
})

// Middleware para manejar errores 400 (datos con formato incorrecto)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).send('Datos con formato incorrecto en el cuerpo de la solicitud')
  } else {
    next()
  }
})

// Middleware para registrar detalles de cada endpoint
app.use((req, res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    endpoint: req.path,
    method: req.method,
    payload: req.body,
    response: res.statusCode,
  }
  fs.appendFileSync('log.txt', JSON.stringify(logData) + '\n')
  next()
})

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
