import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home')

// Public auth routes
router.get('/login', async ({ inertia }) => {
  return inertia.render('Login')
})
router.post('/login', () => import('#controllers/auth_controller').then((m) => m.login))
router.post('/logout', () => import('#controllers/auth_controller').then((m) => m.logout))

// Admin routes
router.group(() => {
  router.get('/dashboard', async ({ inertia }) => {
    return inertia.render('Admin/Dashboard')
  })
})
.prefix('/admin')
.middleware(['auth', 'adminOnly'])

// Client routes
router.group(() => {
  router.get('/dashboard', async ({ inertia }) => {
    return inertia.render('Client/Dashboard')
  })
})
.prefix('/client')
.middleware(['auth', 'clientOnly'])
