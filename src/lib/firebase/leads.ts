import {FirebaseError} from "firebase/app";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  serverTimestamp, 
  Timestamp,
  query,
  orderBy
} from "firebase/firestore";
import { db, auth } from "./config";

export interface Lead {
  id: string;
  fullName: string;
  workEmail: string;
  companyName?: string;
  budget: string;
  expectedTimeline: string;
  meetingDate: string;
  meetingTime: string;
  message?: string;
  status: 'new' | 'open' | 'in_progress' | 'closed';
  submittedAt: Timestamp;
  lastUpdatedAt: Timestamp;
  lastUpdatedBy?: string;
}

export interface LeadHistoryEntry {
  changedAt: Timestamp;
  changedBy: string;
  fromStatus: string;
  toStatus: string;
}

const normalizeLeadPayload = (
  leadData: Omit<Lead, 'id' | 'status' | 'submittedAt' | 'lastUpdatedAt' | 'lastUpdatedBy'>,
) => {
  const fullName = leadData.fullName.trim();
  const workEmail = leadData.workEmail.trim();
  const budget = leadData.budget.trim();
  const expectedTimeline = leadData.expectedTimeline.trim();
  const meetingDate = leadData.meetingDate.trim();
  const meetingTime = leadData.meetingTime.trim();
  const companyName = leadData.companyName?.trim();
  const message = leadData.message?.trim();

  if (!fullName || !workEmail || !budget || !expectedTimeline || !meetingDate || !meetingTime) {
    throw new Error("Missing required lead fields.");
  }

  return {
    fullName,
    workEmail,
    budget,
    expectedTimeline,
    meetingDate,
    meetingTime,
    ...(companyName ? {companyName} : {}),
    ...(message ? {message} : {}),
  };
};

export const getLeadSubmissionErrorMessage = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "permission-denied":
        return "Lead submissions are currently blocked by Firestore security rules. Please update the rules or use a server-side submission endpoint.";
      case "unavailable":
      case "deadline-exceeded":
        return "The booking service is temporarily unavailable. Please try again in a moment.";
      case "invalid-argument":
        return "Some booking details are invalid. Please review the form and try again.";
      default:
        return `Booking submission failed: ${error.message}`;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Failed to submit your request. Please try again.";
};

export const submitLead = async (leadData: Omit<Lead, 'id' | 'status' | 'submittedAt' | 'lastUpdatedAt' | 'lastUpdatedBy'>): Promise<string> => {
  try {
    const leadsRef = collection(db, "leads");
    const payload = normalizeLeadPayload(leadData);
    const docRef = await addDoc(leadsRef, {
      ...payload,
      status: 'new',
      submittedAt: serverTimestamp(),
      lastUpdatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting lead:", error);
    throw error;
  }
};

export const getAllLeads = async (): Promise<Lead[]> => {
  try {
    const leadsRef = collection(db, "leads");
    const q = query(leadsRef, orderBy("submittedAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Lead));
  } catch (error) {
    console.error("Error getting all leads:", error);
    throw error;
  }
};

export const getLeadById = async (id: string): Promise<Lead | null> => {
  try {
    const docRef = doc(db, "leads", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Lead;
    }
    return null;
  } catch (error) {
    console.error("Error getting lead by id:", error);
    throw error;
  }
};

export const updateLeadStatus = async (id: string, newStatus: Lead['status'], currentStatus: Lead['status']): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("User not authenticated");
    }

    const docRef = doc(db, "leads", id);
    
    // Update the lead document
    await updateDoc(docRef, {
      status: newStatus,
      lastUpdatedAt: serverTimestamp(),
      lastUpdatedBy: user.email
    });

    // Add history entry
    const historyRef = collection(db, "leads", id, "history");
    await addDoc(historyRef, {
      changedAt: serverTimestamp(),
      changedBy: user.email,
      fromStatus: currentStatus,
      toStatus: newStatus
    });
    
  } catch (error) {
    console.error("Error updating lead status:", error);
    throw error;
  }
};
