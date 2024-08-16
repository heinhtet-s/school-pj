
export const logIn = async (signInUser)=>{
  try {
   
      // Store session data securely in localStorage
      // localStorage.setItem(session, JSON.stringify(sessionData));
  
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }

}

export const logOut = async ()=>{
  try {
    
    localStorage.removeItem(session); // Clear session from localStorage
    localStorage.clear();

    // return data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}