import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

//! Importing rpc api from lib
import { api } from "../lib/api";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await client.api.expenses["total-spent"].$get();
      const data = await response.json();

      setTotalSpent(data.totalSpent);
    }

    fetchTotalSpent();
  }, []);

  return (
    <section className="flex flex-col items-center">
      <div className="mt-20 flex flex-col gap-4">
        <Card className="min-w-[350px]">
          <CardHeader>
            <CardTitle className="text-primary"> Total Spent</CardTitle>
            <CardDescription>The total amount you've spent.</CardDescription>
          </CardHeader>

          <CardContent>{totalSpent}</CardContent>
        </Card>
        <Button className="text-secondary-foreground w-full">
          Hello Button
        </Button>
      </div>
    </section>
  );
}

export default Index;
