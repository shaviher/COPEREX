import { Schema, model } from 'mongoose';
import { category_allow } from '../../configs/category.js';

const companySchema = new Schema({
    name:{
        type: String,
        required: [true, 'Company name is required'],
        unique: true
    },
    description:{
        type: String,
        required: [true, 'Company description is required'],
        maxLength: [200,  "The username cannot exceed 200 characters"]
    },
    category:{
        type: String,
        enum: category_allow,
        required: [true, 'Company category is required']
    },
    impactLevel:{
        type: String,
        required: [true, 'Company impact level is required'],
        enum: ["High", "Medium", "Low"]
    },
    foundationYear:{
        type: Number,
        required: [true, 'Company foundation year is required'],
        min: [1900, "The year cannot be less than 1900"],
        max: new Date().getFullYear()
    },
    email:{
        type: String,
        required: [true, 'Company email is required'],
        unique: true
    },
    phone:{
        type: String,
        required: [true, 'Company phone is required'],
        unique: true
    },
    address:{
        type: String,
        required: [true, 'Company address is required']
    },
    website:{
        type: String,
        required: [true, 'Company website is required']
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default model('Company', companySchema)