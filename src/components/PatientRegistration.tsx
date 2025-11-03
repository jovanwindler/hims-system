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
    <div className="space-y-6 animate-fadeIn animate-delay-100">
      {/* 页面标题 */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2 shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 className="card-title">患者信息登记</h2>
          <p className="card-subtitle">填写患者基本信息，选择就医类型后进行结算</p>
        </div>
      </div>

      {/* 患者信息表单 */}
      <div className="card animate-slideInRight">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 姓名输入 */}
            <div>
              <label className="form-label flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>患者姓名</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入患者真实姓名"
                  className="form-input input-with-icon"
                />
                <div className="input-icon">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 身份证号输入 */}
            <div>
              <label className="form-label flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span>身份证号码</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={idCard}
                  onChange={(e) => setIdCard(e.target.value)}
                  placeholder="请输入18位身份证号码"
                  className="form-input input-with-icon"
                />
                <div className="input-icon">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 就医类型选择 */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-gray-800">就医类型选择</span>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="medicalType"
                    checked={!isRemote}
                    onChange={() => setIsRemote(false)}
                    className="form-checkbox"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">本地就医</span>
                      <span className="status-badge status-success">推荐</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">在本地医疗机构就诊，享受标准报销比例</p>
                  </div>
                </label>

                <label className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-orange-300 transition-colors">
                  <input
                    type="radio"
                    name="medicalType"
                    checked={isRemote}
                    onChange={() => setIsRemote(true)}
                    className="form-checkbox"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-800">跨省异地就医</span>
                      <span className="status-badge status-warning">特殊</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">在异地医疗机构就诊，按异地报销比例结算</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 异地就医提示 */}
            {isRemote && (
              <div className="warning-message animate-scaleIn">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-orange-800">异地就医提醒</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      跨省异地就医将按异地报销比例进行结算，请确认就医信息准确无误。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 当前分组信息显示 */}
            {groupingResult && groupingResult.success && (
              <div className="info-message">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-800">当前分组信息</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      病种：{groupingResult.disease!.disease_name} |
                      DRG分组：{groupingResult.disease!.drg_group} |
                      价格：¥{groupingResult.disease!.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 提交按钮 */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!canRegister}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  canRegister
                    ? 'btn-primary shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>登记并完成结算</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}