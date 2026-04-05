import { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { getFirebaseServices } from "./config";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new";
  submittedAt: Timestamp;
}

type ContactSubmissionInput = Omit<ContactSubmission, "id" | "status" | "submittedAt">;

const normalizeContactSubmission = (submission: ContactSubmissionInput) => {
  const name = submission.name.trim();
  const email = submission.email.trim();
  const message = submission.message.trim();

  if (!name || !email || !message) {
    throw new Error("Please complete your name, email, and message.");
  }

  return { name, email, message };
};

export const getContactSubmissionErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "permission-denied":
        return "Contact submissions are blocked by Firestore security rules. Update the rules and try again.";
      case "unavailable":
      case "deadline-exceeded":
        return "The contact service is temporarily unavailable. Please try again in a moment.";
      case "invalid-argument":
        return "Some contact details are invalid. Please review the form and try again.";
      default:
        return `Contact submission failed: ${error.message}`;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to send your message. Please try again.";
};

export const submitContactSubmission = async (submission: ContactSubmissionInput): Promise<string> => {
  const { db } = getFirebaseServices();
  const payload = normalizeContactSubmission(submission);
  const submissionsRef = collection(db, "contactSubmissions");

  const docRef = await addDoc(submissionsRef, {
    ...payload,
    status: "new",
    submittedAt: serverTimestamp(),
  });

  return docRef.id;
};
