"use client";
import { z } from "zod";
import React, { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../schemas/schema";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUser } from "../actions/createUser";
import { useRouter } from "next/navigation";
import { getUser } from "../actions/getUser";
import { deleteUser } from "../actions/deleteUser";

const Home = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser(values);
  }

  const router = useRouter();
  const [userInfo, setuserInfo] = useState<any>();

  useEffect(() => {
    getUser()
      .then((data) => {
        setuserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = useCallback(
    (userId: string) => {
      deleteUser(userId).then(() => {
        router.refresh();
      });
    },
    [userInfo]
  );

  return (
    <div className="flex flex-col bg-white h-screen py-20 px-32">
      <div className="grid grid-cols-3 gap-28 ">
        <div className="border border-black p-4 bg-blue-300 text-center">
          <p className="text-lg">Total Tasks</p>
          <h1 className="text-4xl">04</h1>
        </div>
        <div className="border border-black p-4 bg-green-300 text-center">
          <p className="text-lg">Completed</p>
          <h1 className="text-4xl">02</h1>
        </div>
        <div className="border border-black p-4 bg-orange-300 text-center">
          <p className="text-lg">Pending</p>
          <h1 className="text-4xl">02</h1>
        </div>
      </div>

      <div className="mt-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 gap-2 flex flex-grow items-end justify-between "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-grow">
                  <FormControl>
                    <Input
                      placeholder="Enter task here..."
                      className="flex flex-grow-0 "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"lg"} className="bg-black text-white" type="submit">
              Add Task{" "}
              <span>
                {" "}
                <FaPlus size={15} className="m-2" />{" "}
              </span>
            </Button>
          </form>
        </Form>
      </div>
      <div>
        {userInfo?.map((userInfo: any) => {
          return (
            <div key={userInfo.id} className="mt-6">
              <Card  className="flex p-2 items-center justify-between">
                <CardHeader>
                  <CardTitle>{userInfo.name}</CardTitle>
                </CardHeader>
                <div className="flex  items-center justify-evenly">
                  <CardContent>
                    <Button variant={"outline"} className="rounded-full">
                      mark as completed
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <RiDeleteBinLine onClick={()=>handleDelete(userInfo.id)} size={25} />
                  </CardFooter>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
