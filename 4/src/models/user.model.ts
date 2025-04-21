import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string
    email: string
    password: string
    comparePassword(candidatedPassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
    }, 
    {
        timestamps: true,
    })

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next()
    }
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password as string, salt)
        next()
    } catch(error: any) {
        next(error)
    }
})

UserSchema.methods.comparePassword = async function(
    candidatedPassword: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatedPassword, this.password)
    } catch(error) {
        return false
    }
}

export const User = mongoose.model<IUser>('User', UserSchema)

