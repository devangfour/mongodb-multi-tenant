import { Head } from '@inertiajs/react'
import { PageProps } from '@inertiajs/core'

interface Props extends PageProps {
  user: {
    id: number
    fullName: string
    email: string
    role: string
  }
}

export default function Dashboard({ user }: Props) {
  return (
    <div className="min-h-screen bg-sand-1">
      <Head title="Client Dashboard" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="border-b border-sand-4 pb-4 mb-4">
              <h1 className="text-3xl font-bold text-sand-12">Welcome, {user.fullName}</h1>
              <p className="mt-1 text-sm text-sand-11">Manage your account and settings</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-sand-12 mb-4">Account Information</h2>
                <div className="bg-sand-2 rounded-lg p-4">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-sand-11">Email</dt>
                      <dd className="mt-1 text-sm text-sand-12">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-sand-11">Role</dt>
                      <dd className="mt-1 text-sm text-sand-12 capitalize">{user.role}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-sand-12 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <button className="bg-white border border-sand-4 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-sand-12">Create New Instance</h3>
                        <p className="mt-1 text-sm text-sand-11">Set up a new database instance</p>
                      </div>
                    </div>
                  </button>

                  <button className="bg-white border border-sand-4 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-sand-12">Manage Instances</h3>
                        <p className="mt-1 text-sm text-sand-11">View and manage your instances</p>
                      </div>
                    </div>
                  </button>

                  <button className="bg-white border border-sand-4 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-sand-12">Settings</h3>
                        <p className="mt-1 text-sm text-sand-11">Manage your account settings</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 