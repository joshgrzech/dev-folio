import CardRouter from "@/components/router/index";

async function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <CardRouter slug={params.id} />
    </div>
  );
}

export default Page;
