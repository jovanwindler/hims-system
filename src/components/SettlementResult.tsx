'use client';

import type { SettlementResult } from '@/lib/settlementCalculator';
import type { PatientVisit } from '@/lib/patientData';

interface SettlementResultProps {
  settlementResult: SettlementResult | null;
  patientVisit: PatientVisit | null;
}

export default function SettlementResult({
  settlementResult,
  patientVisit
}: SettlementResultProps) {
  if (!settlementResult || !patientVisit) {
    return (
      <div className="card animate-fadeIn">
        <div className="card-body text-center py-12">
          <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">暂无结算结果</h3>
          <p className="text-gray-500 text-sm">请先登记患者信息并完成结算</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn animate-delay-200">
      {/* 成功标识 */}
      <div className="text-center animate-scaleIn">
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">结算成功</h2>
        <p className="text-gray-600">医疗保险结算已完成</p>
      </div>

      {/* 结算单主体 */}
      <div className="card bg-gradient-to-br from-white to-blue-50 animate-slideInUp">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-lg p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">医疗保险结算单</h3>
                <p className="text-sm text-gray-600">Medical Insurance Settlement</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              已结算
            </div>
          </div>
        </div>

        <div className="card-body">
          {/* 患者基本信息 */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-6 border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>患者信息</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">姓名</p>
                  <p className="font-semibold text-gray-800">{patientVisit.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">DRG分组</p>
                  <p className="font-semibold text-blue-600">{patientVisit.drg_group}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">诊断病种</p>
                  <p className="font-semibold text-gray-800">{patientVisit.disease_name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">就医类型</p>
                  <p className="font-semibold">
                    {patientVisit.is_remote ? (
                      <span className="text-orange-600">跨省异地就医</span>
                    ) : (
                      <span className="text-green-600">本地就医</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 费用明细 */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>费用明细</span>
            </h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="text-gray-700">总费用 (DRG定价)</span>
                </div>
                <span className="font-bold text-lg text-gray-800">¥{settlementResult.total_fee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">起付线</span>
                </div>
                <span className="font-semibold text-yellow-700">¥{settlementResult.deductible.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-gray-700">可报销费用</span>
                </div>
                <span className="font-semibold text-blue-700">¥{settlementResult.reimbursable_fee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">报销比例</span>
                </div>
                <span className="font-semibold text-purple-700">{(settlementResult.ratio * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>

          {/* 结算结果 - 最重要部分 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-semibold">医保统筹支付</span>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                  {(settlementResult.ratio * 100).toFixed(0)}%
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">
                ¥{settlementResult.reimbursed_fee.toLocaleString()}
              </div>
              <p className="text-blue-100 text-sm">
                医保基金承担部分
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="font-semibold">个人自付</span>
                </div>
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                  {((settlementResult.self_pay_fee / settlementResult.total_fee) * 100).toFixed(1)}%
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">
                ¥{settlementResult.self_pay_fee.toLocaleString()}
              </div>
              <p className="text-orange-100 text-sm">
                个人需要承担部分
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 结算信息 */}
      <div className="text-center text-sm text-gray-500 bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>结算时间：{new Date(patientVisit.settled_at!).toLocaleString('zh-CN')}</span>
        </div>
      </div>
    </div>
  );
}