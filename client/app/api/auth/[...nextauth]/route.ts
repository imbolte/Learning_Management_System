import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: true, // Enable debug logs
};

console.log("NextAuth GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "Loaded" : "Missing");
console.log("NextAuth NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "Loaded" : "Missing");
console.log("NextAuth NEXTAUTH_URL:", process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "Missing");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
