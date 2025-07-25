import React, { useEffect } from 'react';

// Simple order tracking system
export const saveOrder = (orderData: any) => {
  const orders = JSON.parse(localStorage.getItem('redojo_orders') || '[]');
  const newOrder = {
    ...orderData,
    id: `RD${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  
  orders.push(newOrder);
  localStorage.setItem('redojo_orders', JSON.stringify(orders));
  
  // In production, send to your backend
  console.log('📋 New ReDojo Order:', newOrder);
  
  // Email notification (replace with real email service)
  console.log('📧 Email notification sent to admin');
  
  return newOrder;
};

export const getOrders = () => {
  return JSON.parse(localStorage.getItem('redojo_orders') || '[]');
};

export const updateOrderStatus = (orderId: string, status: string) => {
  const orders = getOrders();
  const updatedOrders = orders.map((order: any) => 
    order.id === orderId ? { ...order, status } : order
  );
  localStorage.setItem('redojo_orders', JSON.stringify(updatedOrders));
};

export default function OrderTracker() {
  useEffect(() => {
    // Check for new orders every 30 seconds
    const interval = setInterval(() => {
      const orders = getOrders();
      const pendingOrders = orders.filter((order: any) => order.status === 'pending');
      
      if (pendingOrders.length > 0) {
        console.log(`🔔 ${pendingOrders.length} pending orders need attention`);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return null;
}