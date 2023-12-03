import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('setkey');
    } catch (error) {
        console.log('Error storing value: -> ', error);
    }
};


export const getItem = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    }catch (error){
        console.log('Error retrieving value: -> ', error);
    }
};


export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('Error deleting value: -> ', error);
    }
}
