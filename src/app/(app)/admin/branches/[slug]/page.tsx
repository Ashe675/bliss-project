import { getAdminBranchBySlug } from "@/actions";
import { BranchForm, CustomBackButton, Title } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function BranchEditPage({ params }: Props) {
  const { slug } = params;
  const { ok, data } = await getAdminBranchBySlug(slug);
  if (!ok) notFound();

  if (!data?.branch && slug !== "new") notFound();
  const title = slug === "new" ? "Nueva Sucursal" : "Editar Sucursal";

  return (
    <div>
      <div className=" flex gap-x-2 items-center justify-center relative">
        <CustomBackButton className=" absolute left-0 size-7 sm:size-9 hover:cursor-pointer hover:opacity-90" />
        <Title title={title} />
      </div>
      <BranchForm branch={data?.branch ?? undefined} />
    </div>
  );
}
