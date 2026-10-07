import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/sevn/pages";
import { data, pageHead } from "@/components/sevn/site";
export const Route=createFileRoute("/journal/$slug")({head:({params})=>pageHead(data.journal.entries[Number(params.slug)-1]?.t||"Story not found","A note from the SEVN bakehaus."),component:Article});
function Article(){return <ArticlePage slug={Route.useParams().slug}/>;}
