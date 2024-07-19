"use server"
import { FormData } from "../page";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function serverCall(data:FormData){
    const response = await prisma.school.create({
        data:{
            Email:data.email,
            name:data.name,
            Address:data.address,
            City:data.city,
            State:data.state,
            Contact:data.contact
        }
    })
    console.log(response)
    if(response){
        return response
    }
    return null
}