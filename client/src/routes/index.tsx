import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <section className="flex flex-col items-center">
      <div className="mt-20 flex flex-col gap-4">
        <Card className="min-w-[350px]">
          <CardHeader>
            <CardTitle className="text-primary"> Total Spent</CardTitle>
            <CardDescription>The total amount you've spent.</CardDescription>
          </CardHeader>

          <CardContent>0</CardContent>
        </Card>
        <Button className="text-secondary-foreground w-full">
          Hello Button
        </Button>
      </div>
    </section>
  );
}

export default Index;
