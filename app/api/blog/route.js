import { NextResponse } from 'next/server'
import connectDB from '../../../lib/config/db'
import BlogModel from '../../../lib/models/BlogModel'
import { writeFile } from 'fs/promises'
const fs = require('fs');

const LoadDB = async () => {
    await connectDB()
}

LoadDB();

// Get All Blogs
export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get('id');
    if(blogId) {
        const blog = await BlogModel.findById(blogId);
        return NextResponse.json({ blog });
    } else {
        const blogs = await BlogModel.find({});
        return NextResponse.json({ blogs })
    }
}

// Add Blog
export async function POST(request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get('image');
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const path = `public/uploads/${timestamp}_${image.name}`;
        await writeFile(path, buffer);
        const imageUrl = `/uploads/${timestamp}_${image.name}`;
        
        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            authorImg: formData.get('authorImg'),
            image: imageUrl,
            date: new Date()
        };
        await BlogModel.create(blogData);

        return NextResponse.json({ success: true, message: 'ブログが正常に保存されました', blogData });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({error: error.message }, { status: 500 });
    }
}

// Delete Blog
export async function DELETE(request) {
    const blogId = request.nextUrl.searchParams.get('id');
    if(!blogId) {
        return NextResponse.json({ error: 'ブログIDが必要です' }, { status: 400 });
    }
    const blog = await BlogModel.findByIdAndDelete(blogId);
    fs.unlink(`public/${blog.image}`, (err) => {
        if(err) {
            console.error('Error deleting image:', err);
        }
    });
    // fs.unlink(`public/${blog.authorImg}`, (err) => {
    //     if(err) {
    //         console.error('Error deleting author image:', err);
    //     }
    // });

    return NextResponse.json({ success: true, message: 'ブログが正常に削除されました', blog });
}