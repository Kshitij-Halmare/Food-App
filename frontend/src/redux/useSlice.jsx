    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
        email: "",
        firstName: "",
        lastName: "",
        image: "",
        _id: "",
    };

    export const userSlice = createSlice({
        name: "user",
        initialState,
        reducers: {
            login: (state, action) => {
                // Update all user fields from action.payload
                console.log(action.payload);
                const { email, firstName, lastName, image, _id } = action.payload;
                state.email = email;
                state.firstName = firstName;
                state.lastName = lastName;
                state.image = image;
                state._id = _id;
            },
            setUserImage: (state, action) => {
                // Only update image field
                state.image = action.payload;
                console.log("Updated Image:", state.image);
            },
            logout: (state) => {
                // Reset state to initial values
                state.email = "";
                state.firstName = "";
                state.lastName = "";
                state.image = "";
                state._id = "";
            },
        },
    });

    export const { login, setUserImage, logout } = userSlice.actions;
    export default userSlice.reducer;
