'use client';

import { useState, useEffect } from 'react';
import { DRG_CATALOG, DRGItem } from '@/data/drgCatalog';
import { DRGGrouper, DRGGroupingResult } from '@/lib/drgGrouper';

interface DRGGrouperProps {
  onGroupingComplete: (result: DRGGroupingResult) => void;
}

export default function DRGGrouper({ onGroupingComplete }: DRGGrouperProps) {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('');
  const [groupingResult, setGroupingResult] = useState<DRGGroupingResult | null>(null);

  useEffect(() => {
    if (selectedDiseaseId) {
      const result = DRGGrouper.groupDisease(selectedDiseaseId, DRG_CATALOG);
      setGroupingResult(result);
      onGroupingComplete(result);
    } else {
      setGroupingResult(null);
    }
  }, [selectedDiseaseId, onGroupingComplete]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          选择诊断
        </label>
        <select
          value={selectedDiseaseId}
          onChange={(e) => setSelectedDiseaseId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">请选择病种...</option>
          {DRG_CATALOG.map((disease) => (
            <option key={disease.id} value={disease.id}>
              {disease.disease_name}
            </option>
          ))}
        </select>
      </div>

      {groupingResult && groupingResult.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-green-800 mb-2">
            [模拟分组成功]
          </h3>
          <div className="space-y-1 text-sm text-green-700">
            <p>归入组别: <span className="font-semibold">{groupingResult.disease!.drg_group}</span></p>
            <p>打包定价: <span className="font-semibold">¥{groupingResult.disease!.price.toLocaleString()}</span></p>
          </div>
        </div>
      )}

      {groupingResult && !groupingResult.success && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{groupingResult.error}</p>
        </div>
      )}
    </div>
  );
}