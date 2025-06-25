import { signIn } from "next-auth/react";

export async function Signin(formdata: FormData) {
    try {
        const response = await signIn("credentials", {
            email: formdata.get("email"),
            password: formdata.get("password"),
            redirect: false,
        });

        return response;
    } catch (error) {
        console.error("Sign-in failed:", error);
        throw error;
    }
}
