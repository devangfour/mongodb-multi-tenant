import { useForm } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import { PageProps } from '@inertiajs/core'

interface Plan {
  id: number
  name: string
  price: number
}

interface Client {
  id: number
  name: string
  email: string
  status: 'running' | 'stopped'
  plan: Plan
}

interface Props extends PageProps {
  clients: Client[]
  plans: Plan[]
}

export default function Dashboard({ clients, plans }: Props) {
  const { data, setData, post, processing } = useForm({
    name: '',
    email: '',
    // password: '',
    // plan_id: plans[0]?.id,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('admin.clients.store'))
  }

  return (
    <div className="min-h-screen bg-sand-1">
      <Head title="Admin Dashboard" />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-sand-12 mb-8">Admin Dashboard</h1>
          
          {/* Create New Client Form */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-sand-12 mb-4">Create New Client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sand-11">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-sand-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sand-11">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-sand-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-sand-11">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="mt-1 block w-full rounded-md border-sand-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="plan" className="block text-sm font-medium text-sand-11">Plan</label>
                  <select
                    id="plan"
                    value={data.plan_id}
                    onChange={(e) => setData('plan_id', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-sand-4 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    {plans?.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - ${plan.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Creating...' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>

          {/* Clients List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-xl font-semibold text-sand-12">Clients</h2>
            </div>
            <div className="border-t border-sand-4">
              <table className="min-w-full divide-y divide-sand-4">
                <thead className="bg-sand-2">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sand-11 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sand-11 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sand-11 uppercase tracking-wider">Plan</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sand-11 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sand-11 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-sand-4">
                  {clients?.map((client) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-12">{client.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-12">{client.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-12">{client.plan.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          client.status === 'running' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sand-12">
                        <div className="flex space-x-2">
                          <button className="text-primary hover:text-primary/80">Start</button>
                          <button className="text-red-600 hover:text-red-800">Stop</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
