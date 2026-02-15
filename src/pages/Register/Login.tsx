// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
// import { SignInSchema, SignUpSchema, type SignInForm, type SignUpForm } from "../CRUD/Validation";
// import Button from "../../component/Button";
// import Input from "../../component/Input";

// export default function Login() {
//     const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
//     const navigate = useNavigate();

//     const {
//         register: registerSignIn,
//         handleSubmit: handleSignIn,
//         formState: { errors: errorsSignIn },
//     } = useForm<SignInForm>({ resolver: zodResolver(SignInSchema) });

//     const {
//         register: registerSignUp,
//         handleSubmit: handleSignUp,
//         formState: { errors: errorsSignUp },
//     } = useForm<SignUpForm>({ resolver: zodResolver(SignUpSchema) });

//     const onSubmitSignIn = (data: SignInForm) => {
//         const users = JSON.parse(localStorage.getItem("users") || "[]");

//         const user = users.find((user: any) => user.email === data.email && user.password === data.password);

//         if (!user) {
//             return "Invalid email or password!";
//         }
//         localStorage.setItem("isLoggedIn", "true");
//         localStorage.setItem("role", user.role);
//         if (user.role === "admin") navigate("/admin");
//         else navigate("/userdata");
//     };


//     const onSubmitSignUp = (data: SignUpForm) => {
//         const users = JSON.parse(localStorage.getItem("users") || "[]");
//         const exists = users.some((user: any) => user.email === data.email);
//         if (exists) {
//             alert("Email already registered!");
//             return;
//         }
//         const assignedRole = data.email === "zainab@gmail.com" ? "admin" : "user";
//         const newUser = {
//             name: data.name,
//             email: data.email,
//             password: data.password,
//             role: assignedRole,
//         };
//         users.push(newUser);
//         localStorage.setItem("users", JSON.stringify(users));
//         if (assignedRole === "admin") {
//             navigate("/admin");
//         } else {
//             navigate("/userdata");
//         }
//     };



//     return (
//         <div className="relative bg-cover bg-center min-h-screen bg-[url('/images/Slider1.jpg')] flex items-center justify-center p-4">
//             <div className="absolute inset-0 bg-blue-100"></div>

//             <div className="container relative z-10 flex justify-center py-20">
//                 <div className="w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md grid md:grid-cols-2">

//                     <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-r from-sky-700 to-sky-400 text-white">
//                         <h1 className="text-4xl font-bold">WELCOME!</h1>
//                         <p className="mt-4 text-lg">Sign in or create an account to continue.</p>
//                     </div>

//                     <div className="p-14 flex flex-col justify-center">
//                         <div className="flex p-1 mb-6 gap-4">
//                             <Button
//                                 variant="filled"
//                                 size="full"
//                                 className={`flex-1  ${activeTab === "signin" ? "bg-sky-600 text-white shadow-md" : "bg-gray-400 text-white"
//                                     }`}
//                                 onClick={() => setActiveTab("signin")}
//                             >
//                                 Sign In
//                             </Button>
//                             <Button
//                                 variant="filled"
//                                 size="full"
//                                 className={`flex-1 ${activeTab === "signup" ? "bg-sky-600 text-white shadow-md" : "bg-gray-400 text-white"
//                                     }`}
//                                 onClick={() => setActiveTab("signup")}
//                             >
//                                 Sign Up
//                             </Button>
//                         </div>

//                         {activeTab === "signin" && (
//                             <form onSubmit={handleSignIn(onSubmitSignIn)} className="space-y-7">
//                                 <div className="relative w-full">
//                                     <Icon icon="mdi:person" className=" absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
//                                     <Input
//                                         {...registerSignIn("email")}
//                                         placeholder="Email"
//                                         className=" p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
//                                     />
//                                     {errorsSignIn.email && <p className="absolute text-red-500 text-sm mb-3">{errorsSignIn.email.message}</p>}
//                                 </div>
//                                 <div className="relative w-full">
//                                     <Icon
//                                         icon="mdi:lock"
//                                         className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
//                                     />
//                                     <Input
//                                         {...registerSignIn("password")}
//                                         type="password"
//                                         placeholder="Password"
//                                         className="p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
//                                     />
//                                     {errorsSignIn.password && (
//                                         <p className="absolute text-red-500 text-sm left-0 mt-1">
//                                             {errorsSignIn.password.message}
//                                         </p>
//                                     )}
//                                 </div>
//                                 <Button
//                                     variant="filled"
//                                     size="lg"
//                                     type="submit"
//                                     className="mt-2 w-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold  shadow-md hover:from-sky-700 hover:to-sky-500 transition-all"
//                                 >
//                                     Sign In
//                                 </Button>
//                             </form>
//                         )}

//                         {activeTab === "signup" && (
//                             <form onSubmit={handleSignUp(onSubmitSignUp)} className="space-y-6">
//                                 <div className="relative w-full">
//                                     <Icon icon="mdi:account" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
//                                     <Input
//                                         {...registerSignUp("name")}
//                                         placeholder="Full Name"
//                                         className="border border-gray-300 p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
//                                     />
//                                     {errorsSignUp.name && <p className="absolute text-red-500 text-sm mt-1">{errorsSignUp.name.message}</p>}
//                                 </div>

//                                 <div className="relative w-full">
//                                     <Icon icon="mdi:email" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
//                                     <Input
//                                         {...registerSignUp("email")}
//                                         placeholder="Email"
//                                         className="border border-gray-300 p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
//                                     />
//                                     {errorsSignUp.email && <p className="absolute text-red-500 text-sm mt-1">{errorsSignUp.email.message}</p>}
//                                 </div>

//                                 <div className="relative w-full">
//                                     <Icon icon="mdi:lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
//                                     <Input
//                                         {...registerSignUp("password")}
//                                         type="password"
//                                         placeholder="Password"
//                                         className="border border-gray-300 p-3 pl-10 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
//                                     />
//                                     {errorsSignUp.password && <p className="absolute text-red-500 text-sm mt-1">{errorsSignUp.password.message}</p>}
//                                 </div>

//                                 <Button
//                                     type="submit"
//                                     variant="filled"
//                                     size="lg"
//                                     className="w-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-semibold shadow-md hover:from-sky-700 hover:to-sky-500 transition-all"
//                                 >
//                                     Sign Up
//                                 </Button>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
