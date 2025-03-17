import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Cell {
  letter: string;
  status: string;
}

interface GridState {
  grid: Cell[];
  activeWordIndex: number;
}

const initialState: GridState = {
  grid: Array(30).fill({ letter: "", status: "" }),
  activeWordIndex: 0,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<Cell[]>) => {
      state.grid = action.payload;
    },
  },
});

export const { setGrid } = gridSlice.actions;
export default gridSlice.reducer;
