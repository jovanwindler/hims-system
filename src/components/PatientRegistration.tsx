'use client';

import { useState } from 'react';
import type { DRGGroupingResult } from '@/lib/drgGrouper';

interface PatientRegistrationProps {
  groupingResult: DRGGroupingResult | null;
  onRegistration: (patientData: {
    name: string;
    idCard: string;
    isRemote: boolean;
  }) => void;
}

export default function PatientRegistration({
  groupingResult,
  onRegistration
}: PatientRegistrationProps) {
  const [name, setName] = useState('');
  const [idCard, setIdCard] = useState('');
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !idCard) {
      alert('请填写完整的患者信息');
      return;
    }

    if (!groupingResult || !groupingResult.success) {
      alert('请先选择病种进行分组');
      return;
    }

    onRegistration({
      name,
      idCard,
      isRemote
    });
  };

  const canRegister = name && idCard && groupingResult && groupingResult.success;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">患者登记</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入患者姓名"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            身份证号
          </label>
          <input
            type="text"
            value={idCard}
            onChange={(e) => setIdCard(e.target.value)}
            placeholder="请输入身份证号"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isRemote"
            checked={isRemote}
            onChange={(e) => setIsRemote(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isRemote" className="text-sm font-medium text-gray-700">
            是否跨省异地就医
          </label>
        </div>

        {isRemote && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-600">
              注意：跨省异地就医将按异地报销比例结算
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!canRegister}
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
            canRegister
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          登记并结算
        </button>
      </form>
    </div>
  );
}