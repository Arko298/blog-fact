/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "../../../lib/mongodb";
import Blog from "../../../models/Blog";

export default async function handler(req, res) {
    const {method}=req;
    const {id}=req.query;
    await dbConnect();
    switch(method){
        case 'DELETE':
            try{
                const blog = await Blog.findByIdAndDelete(id);
                if (!blog){
                    return res.status(400).json
                }
                res.status(400).json({success: true, data: {}});
            }catch(error){
                res.status(400).json({success: false});
            }
            break;
        default:
            res.status(400).json({success:false});
            break;
    }
}