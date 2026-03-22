import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

class AdminGateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminGateError";
  }
}

export const verifyFrontendPassword = async (input: string): Promise<boolean> => {
  try {
    if (!db) {
      throw new AdminGateError("Firebase is not configured for the admin portal.");
    }

    const gateRef = doc(db, "config", "adminGate");
    const gateSnap = await getDoc(gateRef);

    if (gateSnap.exists()) {
      const storedPassword = gateSnap.data().password;
      return input === storedPassword;
    }

    throw new AdminGateError("Admin gate configuration is missing in Firestore.");
  } catch (error) {
    console.error("Error verifying frontend password:", error);

    if (error instanceof AdminGateError) {
      throw error;
    }

    throw new AdminGateError("Unable to verify access code right now. Check Firebase/Firestore in the deployed environment.");
  }
};
