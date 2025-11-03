import { PolicyRules } from './policyRules';
import { DRGItem } from '@/data/drgCatalog';

export interface SettlementResult {
  total_fee: number;
  deductible: number;
  reimbursable_fee: number;
  reimbursed_fee: number;
  self_pay_fee: number;
  ratio: number;
}

export class SettlementCalculator {
  static calculate(
    disease: DRGItem,
    isRemote: boolean,
    policy: PolicyRules
  ): SettlementResult {
    const total_fee = disease.price;
    const deductible = policy.deductible;
    const ratio = isRemote ? policy.remote_ratio : policy.local_ratio;

    // 可报销费用 = 总费用 - 起付线
    const reimbursable_fee = Math.max(0, total_fee - deductible);

    // 医保统筹支付 = 可报销费用 * 报销比例
    const reimbursed_fee = reimbursable_fee * ratio;

    // 个人自付 = 总费用 - 医保统筹支付
    const self_pay_fee = total_fee - reimbursed_fee;

    return {
      total_fee,
      deductible,
      reimbursable_fee,
      reimbursed_fee,
      self_pay_fee,
      ratio
    };
  }
}