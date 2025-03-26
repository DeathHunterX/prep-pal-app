import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByInterviewId } from "@/lib/actions/feedback.action";
import { getInterviewById } from "@/lib/actions/interview.action";
import { redirect } from "next/navigation";
import React from "react";

const FeedbackPage = async ({ params }: RouteParams) => {
    const { id } = await params;

    const user = await getCurrentUser();
    if (!user) redirect("/");

    const interview = await getInterviewById(id);
    if (!interview) redirect("/");

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user.id,
    });

    return <>FeedbackPage</>;
};

export default FeedbackPage;
