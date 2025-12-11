export type TKpiData = {
  lowStockCount: number;
  expiredCount: number;
  expiringSoonCount: number;
  totalStock: number;
};

export type TStockDistribution = {
  category: string;
  count: number;
}[];

export type TLowStockItem = {
  medicationName: string;
  quantity: number;
  minQuantity: number;
};

export type TExpiredBatch = {
  medicationName: string;
  batchId: number;
  expirationDate: string;
  quantity: number;
};

export type TAnalyticsResponse = {
  kpis: TKpiData;
  charts: {
    stockDistribution: TStockDistribution;
  };
  lists: {
    lowStockItems: TLowStockItem[];
    expiredBatches: TExpiredBatch[];
    expiringSoonBatches: TExpiredBatch[];
  };
};

class AnalyticsServices {
  static async getDashboardMetrics(): Promise<TAnalyticsResponse | null> {
    try {
      const response = await fetch('http://localhost:3010/analytics/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default AnalyticsServices;
