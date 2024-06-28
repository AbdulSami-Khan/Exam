
"use server"
import { z } from "zod";
import { formSchema } from "../schemas/schema";
import { prisma } from "../lib/db";

export const createUser = async (values : z.infer<typeof formSchema>) => {

    const validatedValuse = formSchema.safeParse(values);

    if(!validatedValuse.success){
        return{err : "Invalid Values"};
    }

    const user = await prisma.user.create({
        data: {
            name: validatedValuse.data?.name,
            isCompleted : false
        }
    })

}