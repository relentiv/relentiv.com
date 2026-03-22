import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

export const verifyFrontendPassword = async (input: string): Promise<boolean> => {
  try {
    const gateRef = doc(db, "config", "adminGate");
    const gateSnap = await getDoc(gateRef);

    if (gateSnap.exists()) {
      const storedPassword = gateSnap.data().password;
      return input === storedPassword;
    }
    return false;
  } catch (error) {
    console.error("Error verifying frontend password:", error);
    return false;
  }
};
