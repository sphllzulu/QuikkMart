
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async actions for signup and signin
// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/signup', userData, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const signinUser = createAsyncThunk(
//   'auth/signinUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/signin', userData, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null, loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(signinUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signinUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signinUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Set the base URL for axios
// const API_URL = 'http://localhost:3000'; 

// // Async actions for signup and signin
// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const signinUser = createAsyncThunk(
//   'auth/signinUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_URL}/signin`, userData, { withCredentials: true });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: { user: null, loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(signinUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signinUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(signinUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Get user from localStorage on initial load
const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

// Async actions
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData, { 
        withCredentials: true 
      });
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signup failed');
    }
  }
);

export const signinUser = createAsyncThunk(
  'auth/signinUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, userData, { 
        withCredentials: true 
      });
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signin failed');
    }
  }
);

export const signoutUser = createAsyncThunk(
  'auth/signoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/signout`, {}, { 
        withCredentials: true 
      });
      // Clear user from localStorage
      localStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Signout failed');
    }
  }
);

// Check auth status on app load
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/status`, { 
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('user'); // Clear invalid session
      return rejectWithValue(error.response?.data || 'Auth check failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getUserFromStorage(),
    loading: false,
    error: null,
    isAuthenticated: !!getUserFromStorage()
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Signin cases
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      // Signout cases
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;