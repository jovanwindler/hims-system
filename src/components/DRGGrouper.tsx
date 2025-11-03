'use client';

import { useState, useEffect } from 'react';
import { DRG_CATALOG, DRGItem } from '@/data/drgCatalog';
import { DRGGrouper as DRGGroupingService } from '@/lib/drgGrouper';
import type { DRGGroupingResult } from '@/lib/drgGrouper';

interface DRGGrouperProps {
  onGroupingComplete: (result: DRGGroupingResult) => void;
}

export default function DRGGrouper({ onGroupingComplete }: DRGGrouperProps) {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('');
  const [groupingResult, setGroupingResult] = useState<DRGGroupingResult | null>(null);

  useEffect(() => {
    if (selectedDiseaseId) {
      const result = DRGGroupingService.groupDisease(selectedDiseaseId, DRG_CATALOG);
      setGroupingResult(result);
      onGroupingComplete(result);
    } else {
      setGroupingResult(null);
    }
  }, [selectedDiseaseId, onGroupingComplete]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 页面标题 */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-2 shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <div>
          <h2 className="card-title">DIP/DRG 病种分组器</h2>
          <p className="card-subtitle">选择诊断病种，系统将自动分组并确定打包价格</p>
        </div>
      </div>

      {/* 病种选择表单 */}
      <div className="card animate-slideInLeft">
        <div className="card-body">
          <div className="space-y-4">
            <div>
              <label className="form-label flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>选择诊断病种</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDiseaseId}
                  onChange={(e) => setSelectedDiseaseId(e.target.value)}
                  className="form-select appearance-none bg-white"
                >
                  <option value="">请选择病种...</option>
                  {DRG_CATALOG.map((disease) => (
                    <option key={disease.id} value={disease.id}>
                      {disease.disease_name}
                    </option>
                  ))}
                </select>
                <div className="input-icon pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 病种统计信息 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-800">病种库信息</span>
                </div>
                <span className="text-sm text-blue-600 font-semibold">
                  共 {DRG_CATALOG.length} 种病种
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分组结果 */}
      {groupingResult && groupingResult.success && (
        <div className="success-message animate-scaleIn">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-500 rounded-full p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">DRG 分组成功</h3>
              <p className="text-sm text-green-600">系统已自动完成病种分组</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm font-medium text-gray-600">DRG 分组</span>
              </div>
              <p className="text-xl font-bold text-blue-600">{groupingResult.disease!.drg_group}</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span className="text-sm font-medium text-gray-600">打包价格</span>
              </div>
              <p className="text-xl font-bold text-green-600">¥{groupingResult.disease!.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-green-200">
            <p className="text-sm text-green-700">
              <strong>病种名称：</strong>{groupingResult.disease!.disease_name}
            </p>
          </div>
        </div>
      )}

      {groupingResult && !groupingResult.success && (
        <div className="error-message animate-scaleIn">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500 rounded-full p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-800">分组失败</h3>
              <p className="text-sm text-red-600">{groupingResult.error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}