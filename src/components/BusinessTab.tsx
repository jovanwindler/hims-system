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
    <div className="space-y-8">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="page-title">医保业务办理中心</h1>
        <p className="page-subtitle">提供完整的患者登记、DRG分组和费用结算服务</p>
      </div>

      {/* 业务统计卡片 */}
      <div className="data-grid mb-8">
        <div className="stat-card animate-fadeIn animate-delay-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">{allVisits.length}</div>
              <div className="stat-label">累计结算次数</div>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card animate-fadeIn animate-delay-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">
                ¥{allVisits.reduce((sum, visit) => sum + visit.total_fee, 0).toLocaleString()}
              </div>
              <div className="stat-label">累计结算金额</div>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="stat-card animate-fadeIn animate-delay-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="stat-value">
                {allVisits.filter(v => v.is_remote).length}
              </div>
              <div className="stat-label">异地就医次数</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 主要业务区域 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 左侧：登记和分组 */}
        <div className="xl:col-span-2 space-y-8">
          {/* DRG分组 */}
          <DRGGrouper onGroupingComplete={setGroupingResult} />

          {/* 患者登记 */}
          <PatientRegistration
            groupingResult={groupingResult}
            onRegistration={handleRegistration}
          />
        </div>

        {/* 右侧：结算结果 */}
        <div className="xl:col-span-1">
          <SettlementResult
            settlementResult={currentSettlement?.result || null}
            patientVisit={currentSettlement?.patient || null}
          />
        </div>
      </div>

      {/* 历史结算记录 */}
      {allVisits.length > 0 && (
        <div className="card animate-fadeIn animate-delay-400">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 rounded-lg p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">历史结算记录</h3>
                  <p className="text-sm text-gray-600">最近的患者结算明细</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="status-badge status-info">
                  共 {allVisits.length} 条记录
                </span>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="alipay-table">
                <thead>
                  <tr>
                    <th>患者信息</th>
                    <th>病种名称</th>
                    <th>就医类型</th>
                    <th>总费用</th>
                    <th>医保支付</th>
                    <th>个人自付</th>
                    <th>结算时间</th>
                  </tr>
                </thead>
                <tbody>
                  {allVisits.slice().reverse().slice(0, 10).map((visit, index) => (
                    <tr key={visit.id} className="animate-fadeIn" style={{animationDelay: `${index * 50}ms`}}>
                      <td>
                        <div className="flex items-center space-x-2">
                          <div className="bg-gray-100 rounded-full p-1">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{visit.name}</div>
                            <div className="text-xs text-gray-500">{visit.drg_group}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm text-gray-900">{visit.disease_name}</div>
                      </td>
                      <td>
                        {visit.is_remote ? (
                          <span className="status-badge status-warning">跨省异地</span>
                        ) : (
                          <span className="status-badge status-success">本地</span>
                        )}
                      </td>
                      <td>
                        <span className="font-semibold text-gray-900">
                          ¥{visit.total_fee.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className="highlight-green">
                          ¥{visit.reimbursed_fee?.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className="highlight-orange">
                          ¥{visit.self_pay_fee?.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <div className="text-sm text-gray-600">
                          {new Date(visit.settled_at!).toLocaleDateString('zh-CN')}
                          <div className="text-xs text-gray-400">
                            {new Date(visit.settled_at!).toLocaleTimeString('zh-CN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {allVisits.length > 10 && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    显示最近 10 条记录，共 {allVisits.length} 条
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}