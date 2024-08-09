"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import axios, { Axios, AxiosError } from "axios";
import useDeleteModal from "@/hooks/use-delete-modal";
import toast from "react-hot-toast";

interface FormProps {
  btnVariant:
    | "destructive"
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export interface ErrorResponse {
  message: string;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Wrong Store Name.",
  }),
});

const DeleteForm = ({ btnVariant }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useDeleteModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.delete("/api/stores", {
        data: values,
      });

      if (response.status === 201) {
        onClose();
        toast.success("Store Deleted");
        router.refresh();
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const errorMessage =
        err.response?.data?.message || "An Error occured, please try again.";

      console.error(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Store Name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of your Store.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={btnVariant} type="submit" disabled={isLoading}>
          Delete
        </Button>
      </form>
    </Form>
  );
};

export default DeleteForm;
