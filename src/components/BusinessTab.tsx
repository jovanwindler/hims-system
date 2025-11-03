'use client';

import { useState, useEffect } from 'react';
import DRGGrouper from '@/components/DRGGrouper';
import PatientRegistration from '@/components/PatientRegistration';
import SettlementResult from '@/components/SettlementResult';
import type { DRGGroupingResult } from '@/lib/drgGrouper';
import { PatientVisitManager } from '@/lib/patientData';
import type { PatientVisit } from '@/lib/patientData';
import { SettlementCalculator } from '@/lib/settlementCalculator';
import { PolicyRulesManager } from '@/lib/policyRules';

export default function BusinessTab() {
  const [groupingResult, setGroupingResult] = useState<DRGGroupingResult | null>(null);
  const [currentSettlement, setCurrentSettlement] = useState<{
    result: any;
    patient: PatientVisit;
  } | null>(null);
  const [allVisits, setAllVisits] = useState<PatientVisit[]>([]);

  const refreshVisits = () => {
    setAllVisits(PatientVisitManager.getVisits());
  };

  useEffect(() => {
    refreshVisits();
  }, []);

  const handleRegistration = (patientData: {
    name: string;
    idCard: string;
    isRemote: boolean;
  }) => {
    if (!groupingResult || !groupingResult.success) {
      alert('请先选择病种进行分组');
      return;
    }

    const policy = PolicyRulesManager.getRules();
    const settlementResult = SettlementCalculator.calculate(
      groupingResult.disease!,
      patientData.isRemote,
      policy
    );

    const patientVisit: PatientVisit = {
      id: PatientVisitManager.generateId(),
      name: patientData.name,
      id_card: patientData.idCard,
      is_remote: patientData.isRemote,
      disease_id: groupingResult.disease!.id,
      disease_name: groupingResult.disease!.disease_name,
      drg_group: groupingResult.disease!.drg_group,
      status: 'settled',
      total_fee: settlementResult.total_fee,
      reimbursed_fee: settlementResult.reimbursed_fee,
      self_pay_fee: settlementResult.self_pay_fee,
      created_at: new Date().toISOString(),
      settled_at: new Date().toISOString()
    };

    PatientVisitManager.saveVisit(patientVisit);
    setCurrentSettlement({
      result: settlementResult,
      patient: patientVisit
    });

    refreshVisits();

    // 清空表单
    setGroupingResult(null);
    (document.querySelector('select') as HTMLSelectElement).value = '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">业务办理 (结算)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：登记和分组 */}
        <div className="space-y-6">
          {/* DRG分组 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <DRGGrouper onGroupingComplete={setGroupingResult} />
          </div>

          {/* 患者登记 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <PatientRegistration
              groupingResult={groupingResult}
              onRegistration={handleRegistration}
            />
          </div>
        </div>

        {/* 右侧：结算结果 */}
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {currentSettlement ? (
              <SettlementResult
                settlementResult={currentSettlement.result}
                patientVisit={currentSettlement.patient}
              />
            ) : (
              <div className="text-center text-gray-500 py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>暂无结算结果</p>
                <p className="text-sm mt-2">请先登记患者信息并完成结算</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 历史结算记录 */}
      {allVisits.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">历史结算记录</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">姓名</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">病种</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">就医类型</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">总费用</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">医保支付</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">个人自付</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">结算时间</th>
                </tr>
              </thead>
              <tbody>
                {allVisits.slice().reverse().map((visit) => (
                  <tr key={visit.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm">{visit.name}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">{visit.disease_name}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {visit.is_remote ? '跨省异地' : '本地'}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">¥{visit.total_fee.toLocaleString()}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-green-600">
                      ¥{visit.reimbursed_fee?.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-orange-600">
                      ¥{visit.self_pay_fee?.toLocaleString()}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {new Date(visit.settled_at!).toLocaleString('zh-CN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}