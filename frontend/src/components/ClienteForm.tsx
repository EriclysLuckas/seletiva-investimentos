import { UseFormReturn } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { ClienteForm as ClienteFormType } from "@/schemas/clienteSchema"; // Importa só o tipo, com outro nome

interface ClienteFormProps {
  form: UseFormReturn<ClienteFormType>;
  onSubmit: (data: ClienteFormType) => void;
  isPending: boolean;
  initialStatus?: boolean;
  showStatus?: boolean;
  onVoltar?: () => void;
}

export function ClienteForm({
  form,
  onSubmit,
  isPending,
  initialStatus = true,
  showStatus = true,
  onVoltar,
}: ClienteFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showStatus && (
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Switch checked={field.value ?? initialStatus} onCheckedChange={field.onChange} className="cursor-pointer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex gap-2">
          {onVoltar && (
            <Button type="button" variant="outline" onClick={onVoltar} className="cursor-pointer">
              Voltar
            </Button>
          )}
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}