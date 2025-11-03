export interface PatientVisit {
  id: string;
  name: string;
  id_card: string;
  is_remote: boolean;        // 是否异地就医
  disease_id: string;
  disease_name: string;
  drg_group: string;
  status: 'registered' | 'settled';  // 状态：已登记 / 已结算
  total_fee: number;
  reimbursed_fee?: number;  // 医保统筹支付
  self_pay_fee?: number;    // 个人自付
  created_at: string;
  settled_at?: string;
}

export class PatientVisitManager {
  private static STORAGE_KEY = 'hims_patient_visits';

  static getVisits(): PatientVisit[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('读取患者就诊记录失败:', error);
    }

    return [];
  }

  static saveVisit(visit: PatientVisit): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const visits = this.getVisits();
      const existingIndex = visits.findIndex(v => v.id === visit.id);

      if (existingIndex >= 0) {
        visits[existingIndex] = visit;
      } else {
        visits.push(visit);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(visits));
    } catch (error) {
      console.error('保存患者就诊记录失败:', error);
    }
  }

  static generateId(): string {
    return `visit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}