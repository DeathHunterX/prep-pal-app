import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByInterviewId } from "@/lib/actions/feedback.action";
import { getInterviewById } from "@/lib/actions/interview.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
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

    return (
        <section className="section-feedback">
            <div className="flex flex-row justify-center text-center">
                <h1 className="text-4xl font-semibold">
                    Feedback on the Interview - {"\n"}
                    <span className="capitalize">{interview.role}</span>{" "}
                    Development Interview
                </h1>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/star.svg"
                            width={20}
                            height={20}
                            alt="star"
                        />
                        <p>
                            Overall Impression:{" "}
                            <span className="font-bold text-primary-200">
                                {feedback?.totalScore}
                            </span>
                            /100
                        </p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/calendar.svg"
                            width={20}
                            height={20}
                            alt="calendar"
                        />
                        <p>
                            {feedback?.createdAt
                                ? dayjs(feedback.createdAt).format(
                                      "MMM D, YYYY h:mm A"
                                  )
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <hr />

            <p>{feedback?.finalAssessment}</p>

            {/* Interview Breakdown */}
            <div className="flex flex-col gap-4">
                <h2>Breakdown of the Interview</h2>
                {feedback?.categoryScores?.map((category, index) => (
                    <div className="" key={index}>
                        <p className="font-bold">
                            {index + 1}. {category.name} ({category.score}/100)
                        </p>
                        <p>{category.comment}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <h3>Strengths</h3>
                <ul>
                    {feedback?.strengths?.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3">
                <h3>Areas for Improvement</h3>
                <ul>
                    {feedback?.areasForImprovement?.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons">
                <Button className="btn-secondary flex-1">
                    <Link href="/" className="flex w-full justify-center">
                        <p className="text-sm font-semibold text-primary-200 text-center">
                            Back to dashboard
                        </p>
                    </Link>
                </Button>

                <Button className="btn-primary flex-1">
                    <Link
                        href={`/interview/${id}`}
                        className="flex w-full justify-center"
                    >
                        <p className="text-sm font-semibold text-black text-center">
                            Retake Interview
                        </p>
                    </Link>
                </Button>
            </div>
        </section>
    );
};

export default FeedbackPage;
