import CardRouter from "@/components/router/index";
import fetchAllProjectInfo from "@/lib/fetchProjectInfo";

async function Page({ params }: { params: { id: string } }) {
  const projectInfo = await fetchAllProjectInfo("joshgrzech");
  return (
    <div>
      <CardRouter slug={params.id} projectInfo={projectInfo} />
    </div>
  );
}

export default Page;
