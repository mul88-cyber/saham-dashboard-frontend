"use client";
import React, { useState, useEffect } from 'react';
import { Activity, Database, TrendingUp, AlertTriangle } from 'lucide-react';

const BACKEND_URL = "URL_BACKEND_BAPAK_DISINI"; 

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/saham/summary`)
      .then(res => res.json())
      .then(json => {
        if (json.status === "success") {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal menarik data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">
        <h1 className="text-2xl animate-pulse flex items-center gap-3">
          <Database className="animate-spin" /> Menarik Data dari GDrive...
        </h1>
      </div>
    );
  }

  const totalEmiten = new Set(data.map(item => item.SHARE_CODE)).size;
  const totalInvestor = data.length;
  
  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="mb-8 border-b border-gray-800 pb-6">
        <h1 className="text-4xl font-bold text-blue-400 mb-2 flex items-center gap-3">
          <Activity size={36} /> Whale & HSC Tracker Dashboard
        </h1>
        <p className="text-gray-400">Live Data Feed: Kepemilikan Saham &gt; 1%</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <p className="text-sm text-gray-400 mb-1">Total Baris Data</p>
          <p className="text-3xl font-bold text-white">{totalInvestor}</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
          <p className="text-sm text-gray-400 mb-1">Emiten Terpantau</p>
          <p className="text-3xl font-bold text-white">{totalEmiten}</p>
        </div>
        <div className="bg-red-900/20 p-6 rounded-xl border border-red-800/50 shadow-lg">
          <p className="text-sm text-red-400 mb-1">Status Sistem</p>
          <p className="text-xl font-bold text-red-300 flex items-center gap-2">
            <AlertTriangle size={24} /> Live & Terkoneksi
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-xl font-bold">Data Real-Time KSEI (Top 100)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-950 text-gray-400">
              <tr>
                <th className="px-6 py-4">TANGGAL</th>
                <th className="px-6 py-4">KODE</th>
                <th className="px-6 py-4">INVESTOR</th>
                <th className="px-6 py-4 text-right">PORSI (%)</th>
                <th className="px-6 py-4">SEKTOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.slice(0, 100).map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-gray-300">{row.DATE}</td>
                  <td className="px-6 py-4 font-bold text-blue-400">{row.SHARE_CODE}</td>
                  <td className="px-6 py-4">{row.INVESTOR_NAME}</td>
                  <td className="px-6 py-4 text-right text-emerald-400">{row.PERCENTAGE}%</td>
                  <td className="px-6 py-4 text-gray-400">{row.Sector}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
