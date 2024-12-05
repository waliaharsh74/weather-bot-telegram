import User from "./Model/user";

export const subscribeUser = async (userId: number) => {
    try {
        const user = await User.updateOne({ userId }, { isSubscribed: true }, { upsert: true })

        if (user) return true
        return false
    }
    catch (error) {
        console.log(error);
        return false
    }

};

export const unsubscribeUser = async (userId: number) => {
    try {
        await User.updateOne({ userId }, { isSubscribed: false }, { upsert: true })
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const getAllUsers = async () => {
    try {
        const allUsers = await User.find()
        if (!allUsers) return []
        return allUsers;
    } catch (error) {
        console.log(error);
    }

};

export const blockUser = async (userId: number) => {
    try {
        await User.updateOne({ userId }, { isBlocked: true }, { upsert: true })
        return true
    } catch (error) {
        console.log(error);
        return false
    }

};

export const deleteUser = async (userId: number) => {
    try {
        const user = await User.findOneAndDelete({ userId })
        if (user) return true
        return false
    } catch (error) {
        console.log(error);
        return false

    }


};
export const checkUser = async (userId: number) => {
    try {
        const user = await User.findOne({ userId })
        if (!user || !user.isSubscribed) {
            return false
        }
        return true
    } catch (error) {
        console.log(error);
    }

};
