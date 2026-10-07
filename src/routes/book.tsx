import { createFileRoute } from "@tanstack/react-router";
import { BookPage } from "@/components/sevn/pages";
import { pageHead } from "@/components/sevn/site";
export const Route=createFileRoute("/book")({validateSearch:(s:Record<string,unknown>): {date?:string;time?:string;guests?:string} =>({date:typeof s['date']==="string"?s['date']:"",time:typeof s['time']==="string"?s['time']:"",guests:typeof s['guests']==="string"?s['guests']:""}),head:()=>pageHead("Book a table","Prepare a table request for SEVN Café & Bakehaus."),component:Booking});
function Booking(){return <BookPage initial={Route.useSearch()}/>;}
