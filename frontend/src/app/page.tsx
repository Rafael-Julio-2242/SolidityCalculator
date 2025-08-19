import OperationsCard from "@/components/handmade/operationCard/operationCard";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Calculator</h1>
      <OperationsCard />
    </div>
  );
}
