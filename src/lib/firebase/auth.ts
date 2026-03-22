import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  User
} from "firebase/auth";
import { getFirebaseServices } from "./config";
import { doc, getDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const { auth, db } = getFirebaseServices();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if email is in allowed admins
    if (user.email) {
      const allowedAdminsRef = doc(db, "config", "allowedAdmins");
      const allowedAdminsSnap = await getDoc(allowedAdminsRef);
      
      if (allowedAdminsSnap.exists()) {
        const emails = allowedAdminsSnap.data().emails || [];
        if (!emails.includes(user.email)) {
          await firebaseSignOut(auth);
          throw new Error("Access denied. Your account is not authorized.");
        }
      } else {
        await firebaseSignOut(auth);
        throw new Error("Access denied. Configuration missing.");
      }
    } else {
      await firebaseSignOut(auth);
      throw new Error("Access denied. No email associated with account.");
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    const { auth } = getFirebaseServices();
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  const { auth } = getFirebaseServices();
  return firebaseOnAuthStateChanged(auth, callback);
};
