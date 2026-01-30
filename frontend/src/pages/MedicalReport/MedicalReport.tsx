import { useEffect, useState } from "react";
import AnalyticsServices, { type TAnalyticsResponse } from "@/services/AnalyticsServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn-io/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/shadcn-io/table";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, Archive, Calendar, Package } from "lucide-react";
import { ToolTip as CustomToolTip } from "@/components/ui";

export const InventoryDashboard = () => {
  const INVENTORY_TYPE = "medication";

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
    return <div className="h-full overflow-y-auto p-8 text-center">Cargando panel...</div>;
  }

  if (!data) {
    return <div className="h-full overflow-y-auto p-8 text-center text-red-500">Error al cargar los datos del panel.</div>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="h-full overflow-y-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Panel de Inventario ({INVENTORY_TYPE === "medication" ? "Medicamentos" : "Equipamiento"})</h1>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.totalStock}</div>
            <p className="text-xs text-muted-foreground">Unidades en todos los medicamentos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artículos con Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.lowStockCount}</div>
            <p className="text-xs text-muted-foreground">Artículos por debajo de la cantidad mínima</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lotes Expirados</CardTitle>
            <Archive className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.expiredCount}</div>
            <p className="text-xs text-muted-foreground">Lotes pasados de fecha de vencimiento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Por Vencer Pronto</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.kpis.expiringSoonCount}</div>
            <p className="text-xs text-muted-foreground">Lotes que vencen en 30 días</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Distribución de Stock por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data.charts.stockDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Participación por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={data.charts.stockDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data.charts.stockDistribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={CustomToolTip} isAnimationActive={true}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Lists */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Alertas de Stock Bajo</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicamento</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Mínimo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.lists.lowStockItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">No hay artículos con stock bajo</TableCell>
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
            <CardTitle>Lotes Expirados / Por Vencer</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicamento</TableHead>
                  <TableHead>ID de Lote</TableHead>
                  <TableHead>Fecha de Vencimiento</TableHead>
                  <TableHead>Cant.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...data.lists.expiredBatches, ...data.lists.expiringSoonBatches].length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">Sin alertas</TableCell>
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
