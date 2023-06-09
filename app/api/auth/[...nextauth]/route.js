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
            
            const sessionUser = await User.findOne({
                email: session.user.email
            })
        
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

                console.log('pprofile.emailrofile: ' +profile.picture )
    
                // if not create a new user
                if(!userExists) {

                    const newUser = new User({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image:profile.picture,
                    })

                    await newUser.save();
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