import LoginForm from "@/components/auth/login";
import RegisterForm from "@/components/auth/register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-[400px]">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent asChild value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
