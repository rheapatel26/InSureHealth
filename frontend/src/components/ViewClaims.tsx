import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, User, FileCheck } from 'lucide-react';

const ViewClaims = () => {
  const { type } = useParams();

  const dummyData = [
    {
      id: 1,
      name: 'John Doe',
      policyNumber: 'POL-2024-001',
      documents: ['Medical Report', 'Bills', 'ID Proof'],
      summary: 'Cardiac treatment at Apollo Hospital',
      premium: 25000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      policyNumber: 'POL-2024-002',
      documents: ['Accident Report', 'Hospital Bills'],
      summary: 'Emergency surgery after road accident',
      premium: 35000,
    },
    {
      id: 3,
      name: 'Robert Johnson',
      policyNumber: 'POL-2024-003',
      documents: ['Medical History', 'Test Reports'],
      summary: 'Cancer treatment and therapy',
      premium: 50000,
    },
    {
      id: 4,
      name: 'Emily Brown',
      policyNumber: 'POL-2024-004',
      documents: ['Hospital Bills', 'Prescription'],
      summary: 'Respiratory infection treatment',
      premium: 15000,
    },
    {
      id: 5,
      name: 'Michael Wilson',
      policyNumber: 'POL-2024-005',
      documents: ['Surgery Report', 'Recovery Plan'],
      summary: 'Knee replacement surgery',
      premium: 45000,
    },
  ];

  const statusColors = {
    approved: 'text-green-600',
    pending: 'text-orange-500',
    rejected: 'text-red-500',
  };

  const capitalizedType = type?.charAt(0).toUpperCase() + type?.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8">
        <Link 
          to="/admin" 
          className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 font-lora mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <h1 className={`text-3xl font-merriweather font-bold ${statusColors[type as keyof typeof statusColors]}`}>
          {capitalizedType} Claims
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-merriweather font-semibold text-gray-500 uppercase tracking-wider">
                Serial No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-merriweather font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-merriweather font-semibold text-gray-500 uppercase tracking-wider">
                Policy Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-merriweather font-semibold text-gray-500 uppercase tracking-wider">
                Documents
              </th>
              <th className="px-6 py-3 text-left text-xs font-merriweather font-semibold text-gray-500 uppercase tracking-wider">
                User Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-merriweather font-semibold text-gray-500 uppercase tracking-wider">
                Premium Cost
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyData.map((claim) => (
              <motion.tr
                key={claim.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: claim.id * 0.1 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-lora text-gray-500">
                  {claim.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-lora text-gray-900">{claim.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileCheck className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="font-lora text-gray-900">{claim.policyNumber}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {claim.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary/20 text-primary"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 font-lora text-gray-900">
                  {claim.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-lora text-gray-900">
                  ₹{claim.premium.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ViewClaims;