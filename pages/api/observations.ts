import type { NextApiRequest, NextApiResponse } from 'next';import { prisma } from '@/lib/prisma';export default async function handler(req:NextApiRequest,res:NextApiResponse){if(req.method==='GET'){try{const rows=await prisma.observation.findMany({orderBy:{id:'desc'},take:100,});return res.status(200).json(rows);}catch(err:any){return res.status(500).json({error:err?.message||'unknown'});} } if(req.method==='POST'){try{const {category,text,user}=(req.body||{}) as {category?:string;text?:string;user?:string;};if(!category||!text){return res.status(400).json({error:'category ve text zorunludur'});}const created=await prisma.observation.create({data:{category:String(category),text:String(text),user:user?String(user):'B',},});return res.status(201).json(created);}catch(err:any){return res.status(500).json({error:err?.message||'unknown'});} } res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method Not Allowed'});}
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
const bodySchema = z.object({
  user: z.string().trim().min(1).max(50).default("B"),
  category: z.enum(["Genel", "İlişki", "İş", "Aile", "Sağlık", "Diğer"]),
  text: z.string().trim().min(3).max(2000)
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const take = Math.min(Number(req.query.take ?? 100), 200);
      const rows = await prisma.observation.findMany({ orderBy: { id: "desc" }, take });
      return res.status(200).json(rows);
    } catch (err: any) {
      return res.status(500).json({ error: err?.message || "unknown" });
    }
  }
if (req.method === "POST") {
    try {
      const parsed = bodySchema.parse(req.body ?? {});
      const created = await prisma.observation.create({ data: parsed });
      return res.status(201).json(created);
    } catch (err: any) {
    if (err?.issues) return res.status(400).json({ error: "Geçersiz veri", issues: err.issues });
      return res.status(500).json({ error: err?.message || "unknown" });
    }
  }
res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method Not Allowed" });
}
