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
import axios from "axios";
import useDeleteModal from "@/hooks/use-delete-modal";

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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must contain at least 1 character.",
  }),
});

const DeleteForm = ({ btnVariant }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
      }
    } catch (error) {
      console.error(error);
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
