import { NextApiRequest } from "next";

export async function GET(request : NextApiRequest) {
   
   const users = [
    {
        id: 1,
        name: "Mateusz",
    },
    {
        id: 2,
        name: "Ola",
    },
    {
        id: 3,
        name: "Marysia",
    },
   ]
   
    return new Response (JSON.stringify(users))
}    
