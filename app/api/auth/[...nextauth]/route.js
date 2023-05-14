import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectTODB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}) {
            // console.log(session)
            const sessionUser = await User.findOne({
                email: session.user.email
            })
        //    console.log(sessionUser.schema)
            session.user.id = sessionUser._id.toString();
    
            // to know which user is currenlty online
            console.log(session)
            return session
        },
        async signIn({profile}) {
            try {
                await connectTODB();
    
                // check if a user already exists
    
                const userExists = await User.findOne({
                    email: profile.email
                });
    
                // if not create a new user
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture
                    })
                }
    
    
    
                return true;
                
            } catch(error) {
                console.log(error);
                return false;
            }
        }
    }
    
})

export {handler as GET,handler as POST};