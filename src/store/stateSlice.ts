import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface Capital {
    name: string;
    coordinates: [number, number]; // [longitude, latitude]
}

interface State {
    name: string;
    color: string;
    url: string;
    capital: Capital;
}

// Define the initial states with capital city coordinates
const initialStates: State[] = [
    { name: "Andhra Pradesh", color: "#FF5733", url: "https://example.com/AndhraPradesh", capital: { name: "Amaravati", coordinates: [80.2185, 16.5193] } },
    { name: "Arunachal Pradesh", color: "#e7f900", url: "https://example.com/ArunachalPradesh", capital: { name: "Itanagar", coordinates: [93.6177, 27.1024] } },
    { name: "Assam", color: "#fe9e0c", url: "https://example.com/Assam", capital: { name: "Dispur", coordinates: [91.7882, 26.1445] } },
    { name: "Bihar", color: "#db3a31", url: "https://example.com/Bihar", capital: { name: "Patna", coordinates: [85.324, 25.5941] } },
    { name: "Chhattisgarh", color: "#ef5a56", url: "https://example.com/Chhattisgarh", capital: { name: "Raipur", coordinates: [81.6338, 21.2514] } },
    { name: "Goa", color: "#1ABC9C", url: "https://example.com/Goa", capital: { name: "Panaji", coordinates: [73.8122, 15.4909] } },
    { name: "Gujarat", color: "#bd3030", url: "https://example.com/Gujarat", capital: { name: "Gandhinagar", coordinates: [72.6331, 23.2156] } },
    { name: "Haryana", color: "#85cb8e", url: "https://example.com/Haryana", capital: { name: "Chandigarh", coordinates: [76.7781, 30.7333] } },
    { name: "Himachal Pradesh", color: "#8E44AD", url: "https://example.com/HimachalPradesh", capital: { name: "Shimla", coordinates: [77.1714, 31.1048] } },
    { name: "Jharkhand", color: "#f9ff3f", url: "https://example.com/Jharkhand", capital: { name: "Ranchi", coordinates: [85.3343, 23.3567] } },
    { name: "Jammu and Kashmir", color: "#feb918", url: "https://example.com/JammuAndKashmir", capital: { name: "Srinagar", coordinates: [74.7973, 34.0837] } },
    { name: "Karnataka", color: "#bb5701", url: "https://example.com/Karnataka", capital: { name: "Bengaluru", coordinates: [77.5946, 12.9716] } },
    { name: "Kerala", color: "#2ECC71", url: "https://example.com/Kerala", capital: { name: "Thiruvananthapuram", coordinates: [76.9490, 8.5241] } },
    { name: "Ladakh", color: "#85cb8e", url: "https://example.com/Ladakh", capital: { name: "Leh", coordinates: [77.5789, 34.1526] } },
    { name: "Madhya Pradesh", color: "#8b4fc1", url: "https://example.com/MadhyaPradesh", capital: { name: "Bhopal", coordinates: [77.4377, 23.2599] } },
    { name: "Maharashtra", color: "#cac452", url: "https://example.com/Maharashtra", capital: { name: "Mumbai", coordinates: [72.8777, 19.0760] } },
    { name: "Manipur", color: "#e7f900", url: "https://example.com/Manipur", capital: { name: "Imphal", coordinates: [93.9368, 24.8170] } },
    { name: "Meghalaya", color: "#8E44AD", url: "https://example.com/Meghalaya", capital: { name: "Shillong", coordinates: [91.5822, 25.5788] } },
    { name: "Mizoram", color: "#9B59B6", url: "https://example.com/Mizoram", capital: { name: "Aizawl", coordinates: [92.7276, 23.1645] } },
    { name: "Nagaland", color: "#F1C40F", url: "https://example.com/Nagaland", capital: { name: "Kohima", coordinates: [94.1134, 25.6706] } },
    { name: "Odisha", color: "#6fd85b", url: "https://example.com/Odisha", capital: { name: "Bhubaneswar", coordinates: [85.8189, 20.2961] } },
    { name: "Punjab", color: "#a361e0", url: "https://example.com/Punjab", capital: { name: "Chandigarh", coordinates: [76.7781, 30.7333] } },
    { name: "Rajasthan", color: "#e2ee21", url: "https://example.com/Rajasthan", capital: { name: "Jaipur", coordinates: [75.7873, 26.9124] } },
    { name: "Sikkim", color: "#e7f900", url: "https://example.com/Sikkim", capital: { name: "Gangtok", coordinates: [88.6139, 27.3389] } },
    { name: "Tamil Nadu", color: "#58d067", url: "https://example.com/TamilNadu", capital: { name: "Chennai", coordinates: [80.2785, 13.0827] } },
    { name: "Telangana", color: "#9355d0", url: "https://example.com/Telangana", capital: { name: "Hyderabad", coordinates: [78.4744, 17.3850] } },
    { name: "Tripura", color: "#3357FF", url: "https://example.com/Tripura", capital: { name: "Agartala", coordinates: [91.2806, 23.8315] } },
    { name: "Uttar Pradesh", color: "#fea300", url: "https://example.com/UttarPradesh", capital: { name: "Lucknow", coordinates: [80.9462, 26.8467] } },
    { name: "Uttarakhand", color: "#bd3030", url: "https://example.com/Uttarakhand", capital: { name: "Dehradun", coordinates: [78.0844, 30.3165] } },
    { name: "West Bengal", color: "#965ac6", url: "https://example.com/WestBengal", capital: { name: "Kolkata", coordinates: [88.3639, 22.5726] } },
];

// Create the slice
const statesSlice = createSlice({
    name: 'states',
    initialState: initialStates,
    reducers: {
        updateState: (
            state, 
            action: PayloadAction<{ name: string; color?: string; url?: string; capital?: Capital }>
        ) => {
            const { name, color, url, capital } = action.payload;
            const existingState = state.find(s => s.name === name);
            if (existingState) {
                if (color) existingState.color = color;
                if (url) existingState.url = url;
                if (capital) existingState.capital = capital;
            }
        },
    },
});

// Export the actions and the reducer
export const { updateState } = statesSlice.actions;
export default statesSlice.reducer;
