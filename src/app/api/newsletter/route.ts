import { NextResponse } from "next/server";
import { z } from "zod";
import { getCollections } from "@/server/db";
import { sendEnquiryNotification } from "@/server/email";
import type { SubmissionDoc } from "@/server/types";

const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  sourcePage: z.string().trim().max(200).default("/"),
  _hp: z.string().max(200).default(""),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Please provide a valid email.",
        },
        { status: 400 },
      );
    }

    // Honeypot spam check
    if (parsed.data._hp.trim()) {
      return NextResponse.json({ success: false, error: "Spam detected." }, { status: 400 });
    }

    const { email, sourcePage } = parsed.data;
    const { submissions } = await getCollections();
    const submittedAt = new Date();

    const record: SubmissionDoc = {
      type: "contact",
      data: {
        fullName: "Community Subscriber",
        email,
        company: "Newsletter & Community",
        services: ["Newsletter & Growth Community"],
        serviceOfInterest: "Now it's time to scale — Weekly Growth Strategies",
        message: "Subscriber joined the free community from footer newsletter form.",
        timeline: "Immediate",
        sourcePage,
      },
      status: "new",
      emailNotificationSent: false,
      submittedAt,
    };

    const result = await submissions.insertOne(record);

    // Send admin notification
    void sendEnquiryNotification({
      subject: `New Newsletter Subscriber: ${email}`,
      type: "contact",
      data: {
        fullName: "Community Subscriber",
        email,
        company: "Newsletter & Community",
        services: "Now it's time to scale (Weekly Growth Strategies)",
        message: "Joined via Footer Community Form",
        sourcePage,
      },
    })
      .then(async (notification) => {
        await submissions.updateOne(
          { _id: result.insertedId },
          notification.success
            ? { $set: { emailNotificationSent: true } }
            : { $set: { emailNotificationError: notification.error || "Notification failed" } },
        );
      })
      .catch(async (error: unknown) => {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("Newsletter notification error:", msg);
      });

    return NextResponse.json({
      success: true,
      message: "Successfully joined the community!",
      submissionId: result.insertedId.toString(),
    });
  } catch (error: unknown) {
    console.error("Newsletter submission error:", error);
    return NextResponse.json(
      { success: false, error: "Could not join. Please try again shortly." },
      { status: 500 },
    );
  }
}
