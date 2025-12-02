import { useEffect, useState } from "react";
import AnalyticsServices, { type TAnalyticsResponse } from "@/services/AnalyticsServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn-io/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/shadcn-io/table";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, Archive, Calendar, Package } from "lucide-react";

export const MedicalReport = () => {
  const [data, setData] = useState<TAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await AnalyticsServices.getDashboardMetrics();
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-red-500">Failed to load dashboard data.</div>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Medical Inventory Report</h1>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.totalStock}</div>
            <p className="text-xs text-muted-foreground">Units across all medications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Items below minimum quantity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expired Batches</CardTitle>
            <Archive className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.expiredCount}</div>
            <p className="text-xs text-muted-foreground">Batches past expiration date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.expiringSoonCount}</div>
            <p className="text-xs text-muted-foreground">Batches expiring in 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Stock Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.charts.stockDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Quantity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Category Share</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data.charts.stockDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data.charts.stockDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Lists */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Minimum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.lists.lowStockItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No low stock items</TableCell>
                  </TableRow>
                ) : (
                  data.lists.lowStockItems.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.medicationName}</TableCell>
                      <TableCell className="text-red-500 font-bold">{item.quantity}</TableCell>
                      <TableCell>{item.minQuantity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expired / Expiring Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Batch ID</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Qty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...data.lists.expiredBatches, ...data.lists.expiringSoonBatches].length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No alerts</TableCell>
                  </TableRow>
                ) : (
                  [...data.lists.expiredBatches, ...data.lists.expiringSoonBatches].map((batch, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{batch.medicationName}</TableCell>
                      <TableCell>{batch.batchId}</TableCell>
                      <TableCell className={new Date(batch.expirationDate) < new Date() ? "text-red-500 font-bold" : "text-orange-500"}>
                        {new Date(batch.expirationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{batch.quantity}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
