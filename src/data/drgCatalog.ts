export interface DRGItem {
  id: string;
  disease_name: string;
  drg_group: string;
  price: number;
}

export const DRG_CATALOG: DRGItem[] = [
  { id: 'D-001', disease_name: '急性阑尾炎(无并发症)', drg_group: 'DRG-A01', price: 8000 },
  { id: 'D-002', disease_name: '轻症肺炎', drg_group: 'DRG-B03', price: 5000 },
  { id: 'D-003', disease_name: '腹股沟疝(单侧)', drg_group: 'DRG-C12', price: 12000 },
  { id: 'D-004', disease_name: '高血压(2级)', drg_group: 'DRG-D05', price: 3000 },
  { id: 'D-005', disease_name: '糖尿病(2型)', drg_group: 'DRG-E08', price: 4500 },
  { id: 'D-006', disease_name: '急性心肌梗死', drg_group: 'DRG-F01', price: 25000 },
  { id: 'D-007', disease_name: '脑梗死(急性期)', drg_group: 'DRG-G02', price: 18000 },
  { id: 'D-008', disease_name: '慢性支气管炎', drg_group: 'DRG-H04', price: 3500 },
  { id: 'D-009', disease_name: '胃溃疡', drg_group: 'DRG-I01', price: 6000 },
  { id: 'D-010', disease_name: '胆囊炎', drg_group: 'DRG-J03', price: 7500 }
];