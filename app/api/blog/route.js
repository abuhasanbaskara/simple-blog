import { NextResponse } from 'next/server'
import connectDB from '../../../lib/config/db'
import BlogModel from '../../../lib/models/BlogModel'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const LoadDB = async () => {
    await connectDB()
}

LoadDB();

// Initialize R2 client
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  },
  forcePathStyle: true
});

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
        
        // Upload to R2
        const key = `${timestamp}_${image.name}`;
        await r2.send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: image.type
        }));
        
        const imageUrl = `${process.env.R2_PUBLIC_BASE_URL}/${key}`;
        
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
    try {
        const blogId = request.nextUrl.searchParams.get('id');
        if(!blogId) {
            return NextResponse.json({ error: 'ブログIDが必要です' }, { status: 400 });
        }
        
        const blog = await BlogModel.findByIdAndDelete(blogId);
        
        // Delete image from R2
        if(blog.image && blog.image.includes(process.env.R2_PUBLIC_BASE_URL)) {
            const key = blog.image.split('/').pop();
            await r2.send(new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: key
            }));
        }

        return NextResponse.json({ success: true, message: 'ブログが正常に削除されました', blog });
    } catch (error) {
        console.error('Error deleting blog:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}