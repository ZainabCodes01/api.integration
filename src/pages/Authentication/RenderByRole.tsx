import { useState, useEffect } from "react";

interface RenderByRoleProps {
    children: React.ReactNode;
    requiredRole: "admin" | "user";
}

export default function RenderByRole({
    requiredRole,
    children,
}: RenderByRoleProps) {

    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        setUserRole(storedRole);
    }, []);
    
    if (requiredRole === userRole) 
        
        return <>{children}</>;


    return null;
}