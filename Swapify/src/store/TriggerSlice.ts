import {StateCreator} from "zustand/vanilla";

export interface TriggerSlice {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isSidebarOpen: boolean) => void;
}

export const createTriggerSlice:StateCreator<TriggerSlice>=(set)=>({
    isSidebarOpen:true,
    setIsSidebarOpen:(isOpen: boolean) => {
        set({isSidebarOpen:isOpen});
    }
})