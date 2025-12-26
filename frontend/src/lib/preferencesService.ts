interface PreferencesData {
    username: string;
    plate_ids: number[];
    destination_ids: number[];
    event_ids: number[];
}

/**
 * Get the current username from localStorage
 */
const getUsername = (): string | null => {
    return localStorage.getItem("username");
};

/**
 * Fetch current preferences from the backend
 */
const fetchPreferences = async (username: string): Promise<PreferencesData | null> => {
    try {
        const response = await fetch("http://127.0.0.1:8000/accounts/preferences/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                // Preferences don't exist yet, return empty structure
                return {
                    username,
                    plate_ids: [],
                    destination_ids: [],
                    event_ids: [],
                };
            }
            throw new Error("Failed to fetch preferences");
        }

        return response.json();
    } catch (err) {
        console.error("Error fetching preferences:", err);
        return null;
    }
};

/**
 * Update preferences with a new plate ID
 */
export const addPlateToFavorites = async (plateId: number): Promise<boolean> => {
    const username = getUsername();
    if (!username) {
        console.error("User not authenticated");
        return false;
    }

    try {
        const preferences = await fetchPreferences(username);
        if (!preferences) return false;

        // Add plate ID if not already present
        if (!preferences.plate_ids.includes(plateId)) {
            preferences.plate_ids.push(plateId);
        }

        const response = await fetch("http://127.0.0.1:8000/accounts/preferences/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(preferences),
        });

        return response.ok;
    } catch (err) {
        console.error("Error adding plate to favorites:", err);
        return false;
    }
};

/**
 * Update preferences with a new destination ID
 */
export const addDestinationToFavorites = async (destinationId: number): Promise<boolean> => {
    const username = getUsername();
    if (!username) {
        console.error("User not authenticated");
        return false;
    }

    try {
        const preferences = await fetchPreferences(username);
        if (!preferences) return false;

        // Add destination ID if not already present
        if (!preferences.destination_ids.includes(destinationId)) {
            preferences.destination_ids.push(destinationId);
        }

        const response = await fetch("http://127.0.0.1:8000/accounts/preferences/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(preferences),
        });

        return response.ok;
    } catch (err) {
        console.error("Error adding destination to favorites:", err);
        return false;
    }
};

/**
 * Update preferences with a new event ID
 */
export const addEventToAttending = async (eventId: number): Promise<boolean> => {
    const username = getUsername();
    if (!username) {
        console.error("User not authenticated");
        return false;
    }

    try {
        const preferences = await fetchPreferences(username);
        if (!preferences) return false;

        // Add event ID if not already present
        if (!preferences.event_ids.includes(eventId)) {
            preferences.event_ids.push(eventId);
        }

        const response = await fetch("http://127.0.0.1:8000/accounts/preferences/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(preferences),
        });

        return response.ok;
    } catch (err) {
        console.error("Error adding event to attending:", err);
        return false;
    }
};
