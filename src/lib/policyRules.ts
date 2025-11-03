export interface PolicyRules {
  local_ratio: number;      // 本地结算报销比例
  remote_ratio: number;     // 跨省异地报销比例
  deductible: number;       // 起付线
}

export const DEFAULT_POLICY_RULES: PolicyRules = {
  local_ratio: 0.8,         // 本地结算报销 80%
  remote_ratio: 0.7,        // 跨省异地报销 70%
  deductible: 500           // 模拟起付线 500元
};

export class PolicyRulesManager {
  private static STORAGE_KEY = 'hims_policy_rules';

  static getRules(): PolicyRules {
    if (typeof window === 'undefined') {
      return DEFAULT_POLICY_RULES;
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_POLICY_RULES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('读取政策规则失败:', error);
    }

    return DEFAULT_POLICY_RULES;
  }

  static saveRules(rules: PolicyRules): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(rules));
    } catch (error) {
      console.error('保存政策规则失败:', error);
    }
  }
}