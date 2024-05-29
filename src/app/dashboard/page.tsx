import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import StatusDropdown from "./_components/StatusDropdown";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
    toast("Not authenticated");
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
    },
  });

  const lastWeekRevinueSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });
  const lastMonthRevinueSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const WEEKLY_GOAL = 200;
  const MONTHLY_GOAL = 500;

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <MaxWidthWrapper>
        <div className="max-w-7xl w-full flex flex-col sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Last Week</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastWeekRevinueSum._sum.amount ?? 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm to-muted-foreground">
                    of {formatPrice(WEEKLY_GOAL)}
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={
                      ((lastWeekRevinueSum._sum.amount ?? 0) * 100) /
                      WEEKLY_GOAL
                    }
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Last Month</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastMonthRevinueSum._sum.amount ?? 0)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm to-muted-foreground">
                    of {formatPrice(MONTHLY_GOAL)}
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress
                    value={
                      ((lastMonthRevinueSum._sum.amount ?? 0) * 100) /
                      MONTHLY_GOAL
                    }
                  />
                </CardFooter>
              </Card>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Incoming Orders
            </h1>

            <Table className="mb-10 md:mb-5">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Purchase date
                  </TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="bg-accent">
                    <TableCell>
                      <div className="font-medium">
                        {order.shippingAddress?.name}
                      </div>
                      <div className="text-sm hidden text-muted-foreground md:inline">
                        {order.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <StatusDropdown
                        id={order.id}
                        orderStatus={order.status}
                      />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
