import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { Order } from "@/models/OrderDetails";
import { headers } from "next/headers";
import { TShippingAddress } from "@/models/ShippingAddress";
import { TImageConfig } from "@/models/ImageConfig";
import { TBillingAddress } from "@/models/BillingAddress";
import { TUSER } from "@/models/betterAuth-UserDetails";
import connectDB from "@/lib/mongodb";
import { enum_ORDER_STATUS } from "./types";
import StatusSelect from "./StatusSelect";

const Page = async () => {
  const data = await auth.api.getSession({ headers: await headers() });

  const isAdmin = data?.user.email === process.env.ADMIN_EMAIL;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  await connectDB();
  //   view orders within last 7 days
  const orders = await Order.find({
    isPaid: true,
    //@gte == greater that or equal
    createdAt: { $gte: sevenDaysAgo },
  })
    .sort({ createdAt: -1 })
    .populate<{
      shippingAddressId: TShippingAddress;
      configurationId: TImageConfig;
      billingAddressId: TBillingAddress;
      userId: TUSER;
    }>(["shippingAddressId", "configurationId", "billingAddressId", "userId"])
    .lean();

  const lastWeekSum = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const weeklySum = (lastWeekSum[0]?.total ?? 0) / 100;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const lastMonthSum = await Order.aggregate([
    {
      $match: {
        isPaid: true,
        createdAt: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const monthlySum = (lastMonthSum[0]?.total ?? 0) / 100;

  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;
  console.log(weeklySum, WEEKLY_GOAL, monthlySum);

  return (
    <div className="bg-muted/40 flex min-h-screen w-dvw px-2.5">
      <div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-16">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Week</CardDescription>
                <CardTitle className="text-4xl">{formatPrice(weeklySum ?? 0)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  of {formatPrice(WEEKLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  className="bg-green-300 text-green-600"
                  value={((weeklySum ?? 0) * 100) / WEEKLY_GOAL}
                />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Last Month</CardDescription>
                <CardTitle className="text-4xl">{formatPrice(monthlySum ?? 0)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-muted-foreground text-sm">
                  of {formatPrice(MONTHLY_GOAL)} goal
                </div>
              </CardContent>
              <CardFooter>
                <Progress
                  className="bg-green-300 text-green-600"
                  value={((monthlySum ?? 0) * 100) / MONTHLY_GOAL}
                />
              </CardFooter>
            </Card>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

          {isAdmin ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Purchase date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              {/* dashboard or tables to be specific should not display all data on small screens  */}
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id.toString()} className="bg-accent">
                    <TableCell>
                      <div className="font-medium">{order.shippingAddressId?.name}</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        {order.userId.email}
                      </div>
                    </TableCell>
                    {/* hides the whole sell on sm or smaller screens */}
                    <TableCell className="hidden sm:table-cell">
                      <StatusSelect
                        orderId={order._id.toString()}
                        orderStatus={order.status as enum_ORDER_STATUS}
                      />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.createdAt?.toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell className="text-right">{formatPrice(order.amount / 100)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="mt-5 text-center text-2xl">
              <p className="inline-block bg-green-500/20 px-5 py-3 text-pretty">
                You need to be an Admin to access this section
              </p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
