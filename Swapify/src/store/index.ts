import { create } from 'zustand';
import {createTriggerSlice, TriggerSlice} from "./TriggerSlice.ts";

type StoreState = TriggerSlice; //add here with & any other slices

export const useStore = create<StoreState>()((...a) => ({
    ...createTriggerSlice(...a),
}));