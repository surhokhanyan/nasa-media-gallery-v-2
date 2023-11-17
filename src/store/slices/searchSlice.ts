import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { constants } from "../../assets/constants";
import { SearchImagesAsyncTypes, SearchInitialStateReduxTypes, SearchMediaAsyncTypes } from "../../types";

const initialState: SearchInitialStateReduxTypes = {
    searchLoading: false,
    searchResult: [],
    images: [],
    findIndex: 0,
    error: "",
};

const { endpoints } = constants;

export const searchMediaAsync = createAsyncThunk("search/searchMediaAsync", async ({ search, yearStart, yearEnd }: SearchMediaAsyncTypes) => {
    const response = await fetch(
        process.env.REACT_APP_API_URL +
            endpoints.search +
            `?q=${search}` +
            (yearStart ? `&year_start=${yearStart}` : "") +
            (yearEnd ? `&year_end=${yearEnd}` : ""),
        {
            method: "GET",
        }
    );
    const data = await response.json();
    if (data.q) throw new Error(data.q);
    return data;
});

export const searchImagesAsync = createAsyncThunk("search/searchImagesAsync", async ({ href }: SearchImagesAsyncTypes) => {
    const response = await fetch(href, {
        method: "GET",
    });
    const data: string[] = await response.json();
    return data;
});

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        resetImagesRedux(state) {
            state.images = initialState.images;
        },
        setIndexRedux(state, action) {
            state.findIndex = action.payload.index;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMediaAsync.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchMediaAsync.fulfilled, (state, action) => {
                state.searchLoading = false;
                if (action.payload.collection.items.length) {
                    state.searchResult = action.payload.collection.items;
                    state.error = initialState.error;
                } else {
                    state.searchResult = initialState.searchResult;
                    state.error = "Nothing found";
                }
            })
            .addCase(searchMediaAsync.rejected, (state, action) => {
                state.searchLoading = false;
            })
            .addCase(searchImagesAsync.pending, (state) => {
                state.searchLoading = true;
            })
            .addCase(searchImagesAsync.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.images = action.payload.filter((item) => item.endsWith(".jpg"));
            })
            .addCase(searchImagesAsync.rejected, (state, action) => {
                state.searchLoading = false;
            });
    },
});

export const { resetImagesRedux, setIndexRedux } = searchSlice.actions;
export default searchSlice.reducer;
