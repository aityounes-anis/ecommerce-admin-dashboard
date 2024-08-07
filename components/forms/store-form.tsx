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
import useStoreModal from "@/hooks/use-store-modal";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must contain at least 1 character.",
  }),
  description: z.string().min(1, {
    message: "Name must contain at least 1 character.",
  }),
});

const StoreForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/stores", values);

      if (response.status === 201) {
        const storeId = response.data?.id;
        router.push(`/${storeId}`);
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
                <Input placeholder="E-commerce" {...field} />
              </FormControl>
              <FormDescription>
                This will be displayed as your store name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="where you find the best sweeties."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be displayed as your store description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default StoreForm;
