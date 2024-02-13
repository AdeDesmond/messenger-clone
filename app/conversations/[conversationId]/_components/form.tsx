"use client";
import { CldUploadButton } from "next-cloudinary";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useConversation from "@/hooks/use-conversation";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MessageSchema } from "@/schemas/schema";
import axios from "axios";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
function ChatForm() {
  const { conversationId } = useConversation();
  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (values: z.infer<typeof MessageSchema>) => {
    axios.post("/api/messages", {
      ...values,
      conversationId,
    });
    form.reset();
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };
  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full ">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="zttacbst"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2 lg:gap-4 w-full "
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="message"
                    {...field}
                    className="w-full flex-1 basis-[50rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="sm"
            type="submit"
            className="rounded-full cursor-pointer bg-sky-600 transition "
          >
            <HiPaperAirplane size={18} className="text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatForm;
