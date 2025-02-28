import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const monthlyData = [
    { month: 'Jan', approved: 45, rejected: 12 },
    { month: 'Feb', approved: 52, rejected: 15 },
    { month: 'Mar', approved: 48, rejected: 10 },
    { month: 'Apr', approved: 60, rejected: 8 },
    { month: 'May', approved: 55, rejected: 14 },
    { month: 'Jun', approved: 65, rejected: 11 },
  ];

  const genderData = [
    { gender: 'Male', value: 65 },
    { gender: 'Female', value: 35 },
  ];

  const topReasons = [
    { reason: 'Accidents', count: 125 },
    { reason: 'Cardiac Arrests', count: 98 },
    { reason: 'Cancer Treatment', count: 76 },
    { reason: 'Respiratory Issues', count: 65 },
    { reason: 'Surgeries', count: 54 },
  ];

  const statusData = [
    { name: 'Approved', value: 350, color: '#22c55e' },
    { name: 'Pending', value: 150, color: '#f97316' },
    { name: 'Rejected', value: 80, color: '#ef4444' },
  ];

  const cards = [
    { title: 'Approved', count: 350, color: 'bg-green-500', icon: CheckCircle, type: 'approved' },
    { title: 'Pending', count: 150, color: 'bg-orange-500', icon: Clock, type: 'pending' },
    { title: 'Rejected', count: 80, color: 'bg-red-500', icon: XCircle, type: 'rejected' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-merriweather font-bold text-primary mb-8"
      >
        Admin Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-lora font-semibold text-gray-800">{card.title}</h3>
                <p className="text-3xl font-merriweather font-bold mt-2">{card.count}</p>
              </div>
              <card.icon className={`h-8 w-8 ${card.color} text-white rounded-full p-1`} />
            </div>
            <button
              onClick={() => navigate(`/claims/${card.type}`)}
              className="absolute bottom-4 right-4 text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-lora"
            >
              View <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-md p-6 col-span-1"
        >
          <h3 className="text-xl font-merriweather font-semibold mb-4">Monthly Claims</h3>
          <LineChart width={400} height={300} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="approved" stroke="#22c55e" />
            <Line type="monotone" dataKey="rejected" stroke="#ef4444" />
          </LineChart>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-merriweather font-semibold mb-4">Gender Distribution</h3>
            <BarChart width={300} height={200} data={genderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gender" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3D8D7A" />
            </BarChart>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-merriweather font-semibold mb-4">Top Claim Reasons</h3>
            {topReasons.map((reason, index) => (
              <div key={reason.reason} className="mb-2">
                <div className="flex justify-between text-sm font-lora mb-1">
                  <span>{reason.reason}</span>
                  <span>{reason.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-tertiary rounded-full h-2"
                    style={{ width: `${(reason.count / topReasons[0].count) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-merriweather font-semibold mb-4">Claims Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={statusData}
              cx={200}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;