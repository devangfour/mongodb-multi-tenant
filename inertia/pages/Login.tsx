import { useForm } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import { useState, useEffect } from 'react'

export default function Login() {
  const { data, setData, post, errors, processing } = useForm({
    email: 'admin@example.com',
    password: 'password123',
  })

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    console.log('Login component mounted')
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('=== Form Submission Started ===')
    console.log('Form data:', data)
    
    post('/login', {
      onStart: () => {
        console.log('Request started')
      },
      onProgress: (progress) => {
        console.log('Request progress:', progress)
      },
      onSuccess: (page) => {
        console.log('Request succeeded:', page)
      },
      onError: (errors) => {
        console.error('Request failed:', errors)
        setErrorMessage('Invalid credentials, please try again')
      },
      onFinish: () => {
        console.log('Request finished')
      }
    })
  }

  return (
    <div className="min-h-screen bg-sand-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head title="Login" />
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-sand-12">
            Sign in to your account
          </h2>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-sand-4 placeholder-sand-9 text-sand-12 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={data.email}
                onChange={(e) => {
                  console.log('Email changed:', e.target.value)
                  setData('email', e.target.value)
                }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-sand-4 placeholder-sand-9 text-sand-12 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={data.password}
                onChange={(e) => {
                  console.log('Password changed')
                  setData('password', e.target.value)
                }}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={processing}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {processing ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
