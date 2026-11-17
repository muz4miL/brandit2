import { NextResponse } from "next/server";
import { z } from "zod";
import { getCollections } from "@/server/db";
import { sendEnquiryNotification } from "@/server/email";
import type { SubmissionDoc } from "@/server/types";

const contactSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, "Please provide your full name.").max(120),
  email: z.string().trim().email("Please provide a valid email address.").max(254),
  company: z.string().trim().max(160).default(""),
  services: z.array(z.string().trim().min(1).max(120)).min(1).max(20),
  message: z.string().trim().max(1000).default(""),
  timeline: z.string().trim().max(120).default(""),
  sourcePage: z.string().trim().max(200).default("/contact"),
  _hp: z.string().max(200).default(""),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = contactSubmissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Please check your enquiry details.",
        },
        { status: 400 },
      );
    }

    if (parsed.data._hp.trim()) {
      return NextResponse.json({ success: false, error: "Spam detected." }, { status: 400 });
    }

    const { fullName, email, company, services, message, timeline, sourcePage } = parsed.data;
    const { submissions } = await getCollections();
    const submittedAt = new Date();
    const record: SubmissionDoc = {
      type: "contact",
      data: {
        fullName,
        email,
        company,
        services,
        serviceOfInterest: services.join(", "),
        message,
        timeline,
        sourcePage,
      },
      status: "new",
      emailNotificationSent: false,
      submittedAt,
    };

    const result = await submissions.insertOne(record);
    const notificationData = {
      fullName,
      email,
      company,
      services: services.join(", "),
      message,
      timeline,
      sourcePage,
    };

    void sendEnquiryNotification({
      subject: `New Discovery Call Enquiry: ${fullName}`,
      type: "contact",
      data: notificationData,
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
        const message = error instanceof Error ? error.message : String(error);
        console.error("Contact notification update failed:", message);
        await submissions.updateOne(
          { _id: result.insertedId },
          { $set: { emailNotificationError: message } },
        );
      });

    return NextResponse.json({
      success: true,
      submissionId: result.insertedId.toString(),
    });
  } catch (error: unknown) {
    console.error("Contact submission failed:", error);
    return NextResponse.json(
      { success: false, error: "We could not submit your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
