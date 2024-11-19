// "use client";

// import axios from "@/lib/axios";
// import { signIn, useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

// export const useRefreshToken = () => {
//   const { data: session }: any = useSession();
//   console.log("AAAAAAAAAAAAAAAAAAAAAAAA",{session})

//   const refreshToken = async () => {
//     try {
//       // Using Axios to make a GET request with Authorization header
//       const res = await axios.get(`/auth/refresh`, {
//         headers: {
//           Authorization: `Bearer ${session?.user?.refreshToken}`,
//         },
//       });

//       console.log("Refreshed Token Response:", res);

//       if (session) {
//         // Update the session access token dynamically
//         session.user.token = res.data.data.token;
//       } else {
//         // If session is missing, prompt the user to sign in
//         redirect("/login");
//       }
//     } catch (error) {
//       console.error("Failed to refresh token:", error);
//       redirect("/login");
//     }
//   };

//   return refreshToken;
// };

"use client";

import axios from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useRefreshToken = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const refreshToken = async () => {
    try {
      // Using Axios to make a GET request with Authorization header
      const res = await axios.get(`/auth/refresh`, {
        headers: {
          Authorization: `Bearer ${session?.user?.refreshToken}`,
        },
      });

      console.log("Refreshed Token Response:", res);

      if (session) {
        // Update the session access token dynamically
        await update({
          ...session,
          user: {
            ...session.user,
            token: res.data.data.token,
          },
        });
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      // Logout and redirect to /login
      if (error.response?.status === 400) {
        // Nullify the session and logout
        await signOut({ redirect: false }); // Prevent automatic redirection
        router.push("/login");
      }
    }
  };

  return refreshToken;
};
