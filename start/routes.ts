/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { normalize, sep } from 'node:path'
import app from '@adonisjs/core/services/app'

const AuthController = () => import('#controllers/auth_controller')
const GuildsController = () => import('#controllers/guilds_controller')
const ProfileController = () => import('#controllers/users_controller')

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.on('/').renderInertia('home')

router.get('/sign-up', [AuthController, 'signUp']).use(middleware.guest())
router.get('/sign-up/email-verification', [AuthController, 'emailVerification']).use(middleware.auth()).as('auth.email_verification')

router.get('/sign-in', [AuthController, 'signIn']).use(middleware.guest())
router.get('/account/profile', [ProfileController, 'index']).use([middleware.auth()])
router.get('/account/guilds', [ProfileController, 'guilds']).use([middleware.auth()])
// router.get('/verify-email', [AuthController, 'verifyEmail']).use(middleware.auth()).as('auth.verify_email')
router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
    router.post('/logout', [AuthController, 'logout'])
  })
  .prefix('auth')

router
  .group(() => {
    router.get('/', [GuildsController, 'index'])
    router.get('/create', [GuildsController, 'create']).use([middleware.auth()])
    router.get('/:id', [GuildsController, 'show']).as('guilds.show')
    router.get('/:id/edit', [GuildsController, 'edit']).use([middleware.auth()])
    router.put('/:id', [GuildsController, 'update']).use([middleware.auth()])
    router.delete('/:id', [GuildsController, 'remove']).use([middleware.auth()])
    router.post('/', [GuildsController, 'store']).use([middleware.auth()])
  })
  .prefix('guilds')

router.put('/profile', [ProfileController, 'update']).use(middleware.auth())

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})
