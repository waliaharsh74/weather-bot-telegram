const subscribers: Set<number> = new Set();

export const subscribeUser = async (userId: number) => {
    subscribers.add(userId);
};

export const unsubscribeUser = async (userId: number) => {
    subscribers.delete(userId);
};

export const getAllUsers = async () => {
    return Array.from(subscribers);
};

export const blockUser = async (userId: number) => {
    subscribers.delete(userId);
};

export const deleteUser = async (userId: number) => {
    // Perform user deletion logic (e.g., removing from database)
    subscribers.delete(userId);
};
export const checkUser = async (userId: number) => {
    // Perform user deletion logic (e.g., removing from database)
    return subscribers.has(userId);
};
