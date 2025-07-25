import React, { useState, useEffect } from 'react';
import { Download, Mail, CheckCircle, Clock, User, Globe } from 'lucide-react';

interface Order {
  id: string;
  email: string;
  websiteUrl: string;
  businessType: string;
  targetAudience: string;
  designStyle: string;
  goals: string;
  hasReferral: boolean;
  referralEmail?: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // In a real app, this would fetch from your backend
  useEffect(() => {
    // Mock orders for demonstration
    const mockOrders: Order[] = [
      {
        id: 'RD001234',
        email: 'customer@example.com',
        websiteUrl: 'https://oldsite.com',
        businessType: 'ecommerce',
        targetAudience: 'Young professionals aged 25-35',
        designStyle: 'modern',
        goals: 'Increase online sales and improve user experience',
        hasReferral: false,
        amount: 200,
        status: 'pending',
        createdAt: '2025-01-27T10:30:00Z'
      }
    ];
    setOrders(mockOrders);
  }, []);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const downloadOrderData = (order: Order) => {
    const orderData = {
      orderId: order.id,
      customerEmail: order.email,
      websiteUrl: order.websiteUrl,
      businessType: order.businessType,
      targetAudience: order.targetAudience,
      designStyle: order.designStyle,
      goals: order.goals,
      hasReferral: order.hasReferral,
      referralEmail: order.referralEmail,
      amount: order.amount,
      createdAt: order.createdAt
    };

    const dataStr = JSON.stringify(orderData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `redojo-order-${order.id}.json`;
    link.click();
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'in-progress': return User;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ReDojo Admin Dashboard</h1>
          <p className="text-gray-600">Manage your website redesign orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
            <div className="text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'pending').length}
            </div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'in-progress').length}
            </div>
            <div className="text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.email}</div>
                        {order.hasReferral && (
                          <div className="text-xs text-green-600">Has referral</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={order.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline flex items-center"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          {order.websiteUrl.replace('https://', '').replace('http://', '')}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{order.businessType}</div>
                        <div className="text-sm text-gray-500 capitalize">{order.designStyle} style</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {order.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => downloadOrderData(order)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Order Details: {selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Email
                    </label>
                    <div className="text-sm text-gray-900">{selectedOrder.email}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website URL
                    </label>
                    <a 
                      href={selectedOrder.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {selectedOrder.websiteUrl}
                    </a>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Type
                    </label>
                    <div className="text-sm text-gray-900 capitalize">{selectedOrder.businessType}</div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Design Style
                    </label>
                    <div className="text-sm text-gray-900 capitalize">{selectedOrder.designStyle}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <div className="text-sm text-gray-900">{selectedOrder.targetAudience}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goals & Requirements
                  </label>
                  <div className="text-sm text-gray-900">{selectedOrder.goals}</div>
                </div>
                
                {selectedOrder.hasReferral && selectedOrder.referralEmail && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Referral Email
                    </label>
                    <div className="text-sm text-green-600">{selectedOrder.referralEmail}</div>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order Status
                    </label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  
                  <div className="space-x-3">
                    <button
                      onClick={() => downloadOrderData(selectedOrder)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Data</span>
                    </button>
                    
                    <a
                      href={`mailto:${selectedOrder.email}?subject=Your ReDojo Website Redesign - Order ${selectedOrder.id}`}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 flex items-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email Customer</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}