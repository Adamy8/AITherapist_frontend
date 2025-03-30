import { create } from "zustand";

export const loginStore = create((set) => ({
    auths: [],  // List of user info (auth details)
    setauths: (auth) => set({ auth }),  // Setter to update auths state

    createAccount: async (newAuth) => {
        const res = await fetch("/auth", {
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAuth)
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Update the Zustand store with the new auth info
        set((state) => {
            const updatedAuths = [...state.auths, data];
            // console.log("Updated auths: ", updatedAuths); // Debug log
            return { auths: updatedAuths };  // Correct key
        });

        return { success: data.success, message: data.message };
    },

    loginRequest: async (auth) => {
        console.log("Login request in _store: ", auth);  // Debug log
        // Send a POST request to the server to authenticate the user
        const res = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(auth),  // `auth` contains username and password
            credentials: "include",
        });
        
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`Login failed! Status: ${res.status}, Message: ${data.message || 'Unknown error'}`);
        }

        // Store user info (auth token, user details) in Zustand state
        set((state) => {
            // If your response contains a user object and/or token, store it in auths
            const updatedAuths = [...state.auths, data.user];  // Assuming `data.user` contains the user info
            return { auths: updatedAuths };  // Correct key
        });

        return { success: data.success, message: data.message, user: data.user };
    },
}));