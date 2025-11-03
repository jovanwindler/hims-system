'use client';

import { useState, useEffect } from 'react';
import { PolicyRules, PolicyRulesManager, DEFAULT_POLICY_RULES } from '@/lib/policyRules';
import { DRG_CATALOG } from '@/data/drgCatalog';

export default function PolicyConfig() {
  const [policyRules, setPolicyRules] = useState<PolicyRules>(DEFAULT_POLICY_RULES);
  const [editableCatalog, setEditableCatalog] = useState(DRG_CATALOG);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedRules = PolicyRulesManager.getRules();
    setPolicyRules(savedRules);

    // 从localStorage加载修改后的DRG目录
    try {
      const savedCatalog = localStorage.getItem('hims_drg_catalog');
      if (savedCatalog) {
        setEditableCatalog(JSON.parse(savedCatalog));
      }
    } catch (error) {
      console.error('读取DRG目录失败:', error);
    }
  }, []);

  const handlePolicyChange = (field: keyof PolicyRules, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const newRules = { ...policyRules, [field]: numValue };
      setPolicyRules(newRules);
      setHasChanges(true);
    }
  };

  const handleDRGPriceChange = (id: string, newPrice: string) => {
    const numPrice = parseFloat(newPrice);
    if (!isNaN(numPrice) && numPrice >= 0) {
      const newCatalog = editableCatalog.map(item =>
        item.id === id ? { ...item, price: numPrice } : item
      );
      setEditableCatalog(newCatalog);
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    PolicyRulesManager.saveRules(policyRules);

    try {
      localStorage.setItem('hims_drg_catalog', JSON.stringify(editableCatalog));
    } catch (error) {
      console.error('保存DRG目录失败:', error);
    }

    setHasChanges(false);
    alert('配置已保存成功！');
  };

  const handleReset = () => {
    setPolicyRules(DEFAULT_POLICY_RULES);
    setEditableCatalog(DRG_CATALOG);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">医保政策配置中心</h2>
        <p className="text-sm text-gray-600 mb-6">
          在这里可以修改医保结算规则和DRG病种打包价格。所有修改将立即生效。
        </p>
      </div>

      {/* 结算规则配置 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">结算规则配置</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              本地报销比例 (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={(policyRules.local_ratio * 100).toFixed(0)}
              onChange={(e) => handlePolicyChange('local_ratio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              跨省报销比例 (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={(policyRules.remote_ratio * 100).toFixed(0)}
              onChange={(e) => handlePolicyChange('remote_ratio', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              起付线 (元)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={policyRules.deductible}
              onChange={(e) => handlePolicyChange('deductible', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* DRG目录配置 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">DRG目录配置</h3>
        <p className="text-sm text-gray-600 mb-4">
          可以直接修改各病种的打包价格
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">病种ID</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">病种名称</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">DRG分组</th>
                <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">打包价格 (元)</th>
              </tr>
            </thead>
            <tbody>
              {editableCatalog.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-sm">{item.id}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{item.disease_name}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm font-medium">{item.drg_group}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={item.price}
                      onChange={(e) => handleDRGPriceChange(item.id, e.target.value)}
                      className="w-32 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleReset}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          重置为默认值
        </button>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            hasChanges
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          保存所有配置
        </button>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-sm text-yellow-600">
            注意：您有未保存的配置修改，请点击"保存所有配置"使修改生效。
          </p>
        </div>
      )}
    </div>
  );
}