"use client";
import React, { useEffect } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session }: any = useSession();
  console.log({ session });
  const axiosAuth = useAxiosAuth();
  const [reviewsList, setReviewsList] = React.useState([]);
  console.log({ reviewsList });

  useEffect(() => {
    const fetchReviews = async () => {
      if (!session?.user?.userId) {
        console.warn("User ID is not available yet.");
        return;
      }

      try {
        const res = await axiosAuth.get(
          `/brand/${session?.user?.userId}/reviews/list`
        );
        setReviewsList(res?.data.data.data);
        console.log("Fetched Reviews:", res.data.data.data);
      } catch (error: any) {
        if (error?.response?.data || error.message) {
          return "Failed to fetch reviews";
        }
      }
    };

    fetchReviews();
  }, [session?.user?.userId]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome, {session?.user?.firstName} {session?.user?.firstName}
      </p>
      <p>{session?.user?.email}</p>
      <div>
        <h2>Reviews</h2>
        {reviewsList.length === 0 && <p>No reviews found.</p>}
        <ul>
          {reviewsList.map((review: any) => (
            <li key={review.id}>{review.brandName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
