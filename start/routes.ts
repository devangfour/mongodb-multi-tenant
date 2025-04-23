import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { middleware } from './kernel.js'

router.on('/').renderInertia('home')

// Debug middleware
const debugMiddleware = async (ctx: HttpContext, next: NextFn) => {
  console.log('Request received:', {
    method: ctx.request.method(),
    url: ctx.request.url(),
    body: ctx.request.body(),
    headers: ctx.request.headers()
  })
  return next()
}

// Public auth routes
router.get('/login', async ({ inertia }) => {
    return inertia.render('Login')
}).middleware(middleware.guest())

router.post('/login', async (ctx) => {
    console.log('Route handler started')
    const controller = new AuthController()
    return controller.login(ctx)
})

router.post('/logout', async (ctx) => {
    const controller = new AuthController()
    return controller.logout(ctx)
})

// Admin routes
router.group(() => {
    router.get('/dashboard', async (ctx) => {
        const ClientsController = (await import('#controllers/clients_controller')).default
        const controller = new ClientsController()
        return controller.index(ctx)
    }).as('admin.dashboard')
    
    router.post('/clients', async (ctx) => {
        const ClientsController = (await import('#controllers/clients_controller')).default
        const controller = new ClientsController()
        return controller.store(ctx)
    }).as('admin.clients.store')
})
    .prefix('/admin')
    .middleware([middleware.auth(), middleware.adminOnly()])

// Client routes
router.group(() => {
    router.get('/dashboard', async ({ inertia }) => {
        return inertia.render('Client/Dashboard')
    })
})
    .prefix('/client')
    .middleware([middleware.auth(), middleware.clientOnly()])
