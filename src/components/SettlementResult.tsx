'use client';

import { SettlementResult } from '@/lib/settlementCalculator';
import { PatientVisit } from '@/lib/patientData';

interface SettlementResultProps {
  settlementResult: SettlementResult | null;
  patientVisit: PatientVisit | null;
}

export default function SettlementResult({
  settlementResult,
  patientVisit
}: SettlementResultProps) {
  if (!settlementResult || !patientVisit) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-green-100 rounded-full p-3">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        医疗保险结算单
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">患者姓名:</span>
          <span className="font-medium">{patientVisit.name}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">诊断病种:</span>
          <span className="font-medium">{patientVisit.disease_name}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">DRG分组:</span>
          <span className="font-medium">{patientVisit.drg_group}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">就医类型:</span>
          <span className="font-medium">
            {patientVisit.is_remote ? '跨省异地就医' : '本地就医'}
          </span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">总费用 (DRG定价):</span>
          <span className="font-semibold text-lg">¥{settlementResult.total_fee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">起付线:</span>
          <span className="font-medium">¥{settlementResult.deductible.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">可报销费用:</span>
          <span className="font-medium">¥{settlementResult.reimbursable_fee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">报销比例:</span>
          <span className="font-medium">{(settlementResult.ratio * 100).toFixed(0)}%</span>
        </div>

        <div className="flex justify-between items-center py-3 bg-blue-50 rounded px-3">
          <span className="text-blue-800 font-semibold">医保统筹支付:</span>
          <span className="font-bold text-blue-800 text-lg">
            ¥{settlementResult.reimbursed_fee.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 bg-orange-50 rounded px-3">
          <span className="text-orange-800 font-semibold">个人自付:</span>
          <span className="font-bold text-orange-800 text-lg">
            ¥{settlementResult.self_pay_fee.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        结算时间: {new Date(patientVisit.settled_at!).toLocaleString('zh-CN')}
      </div>
    </div>
  );
}