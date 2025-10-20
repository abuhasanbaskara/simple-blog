import { NextResponse } from 'next/server'
import connectDB from '../../../lib/config/db'
import BlogModel from '../../../lib/models/BlogModel'

const LoadDB = async () => {
    await connectDB()
}

LoadDB();

// Migration endpoint to convert English categories to Japanese
export async function POST(request) {
    try {
        // Category mapping from English to Japanese
        const categoryMapping = {
            'Technology': 'テクノロジー',
            'Startup': 'スタートアップ',
            'Lifestyle': 'ライフスタイル'
        };

        // Find all blogs with English categories
        const blogs = await BlogModel.find({
            category: { $in: Object.keys(categoryMapping) }
        });

        let updatedCount = 0;

        // Update each blog's category
        for (const blog of blogs) {
            const newCategory = categoryMapping[blog.category];
            if (newCategory) {
                await BlogModel.findByIdAndUpdate(blog._id, {
                    category: newCategory
                });
                updatedCount++;
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: `${updatedCount} blogs updated with Japanese categories`,
            updatedCount 
        });
    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({error: error.message }, { status: 500 });
    }
}
