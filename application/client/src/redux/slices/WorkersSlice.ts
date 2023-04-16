import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import serverUrl from '../urls/urls';



const WorkersSlice = createSlice({
    name:"WorkersSlice",
    initialState:{
        loading:false,
        data:false
    },
    reducers:{  
    },
    extraReducers(builder) {
        builder
        .addCase(searchWorkers.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(searchWorkers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
        })
    }
})

export const searchWorkers = createAsyncThunk('searchWorkers', async (input:{
    name:string,
    role:string,
    disposalName:string,
    state:string,
    page:number,
    pageSize:number
}) => {
    //{{host}}/user
    try {
        const {data} = await axios.post(`${serverUrl}/user`, input, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(data.status === 'success'){
            return {status:"success",data:data.data};
        }
        else {
            return {status:"fail", message:data.message};
        }
    }
    catch (error : any) {
        if(Array.isArray(error.response.data)) {
            let errorMessage = ""
            error.response.data[0].errors.issues.map((item:any)=>{
                errorMessage += item.message;
                errorMessage += ", ";
                return item.message;
            })
            return {status:"fail",message:errorMessage};
        }
        else {
            return {status:"fail",message:error.response.data.message};
        }
    }
}
)

export default WorkersSlice