"use server"

import { prisma } from "../lib/db"



export const deleteUser = async (userID: string)=>{
    await prisma.user.delete({
        where: { id: userID}
    })
}