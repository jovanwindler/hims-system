import { DRGItem } from '@/data/drgCatalog';

export interface DRGGroupingResult {
  success: boolean;
  disease?: DRGItem;
  error?: string;
}

export class DRGGrouper {
  static groupDisease(diseaseId: string, catalog: DRGItem[]): DRGGroupingResult {
    const disease = catalog.find(item => item.id === diseaseId);

    if (!disease) {
      return {
        success: false,
        error: '未找到对应病种'
      };
    }

    return {
      success: true,
      disease
    };
  }

  static getCatalogByDiseaseName(diseaseName: string, catalog: DRGItem[]): DRGItem | null {
    return catalog.find(item => item.disease_name === diseaseName) || null;
  }
}