import { connectTODB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async(request,{params}) => {
    try{
        await connectTODB();
        console.log('connected');

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response('Prompt not found',{status:404});

        return new Response(JSON.stringify(prompt),{
            status:200
        })
    } catch(error) {
        return new Response("Failed to fetch all prompts",{
            status:500
        })
    }
};

export const PATCH = async (request,{params}) => {
    const {prompt,tag} = await request.json();

    try{
        await connectTODB();

        const existingPropmt = await Prompt.findById(params.id);

        if(!existingPropmt) return new Response('Prompt not found');
        existingPropmt.prompt = prompt;
        existingPropmt.tag = tag;

        await existingPropmt.save();

        return new Response(JSON.stringify(existingPropmt),{status:200})
    } catch(error) {
        return new Response('Failed to update prompt',{status:500})
    }
}


export const DELETE = async (request,{params}) => {
    try{
        await connectTODB();

        await Prompt.findByIdAndRemove(params.id);

        console.log('removes');

        return new Response("Prompt deleted successfully", {status:200})
    } catch(erorr) {
        return new Response('Failed to delete prompt',{status:500})
    }
}