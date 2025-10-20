import { NextResponse } from 'next/server'
import connectDB from '../../../lib/config/db'
import EmailModel from '../../../lib/models/EmailModel'

const LoadDB = async () => {
    await connectDB()
}

LoadDB();

export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;
        
        if (!email) {
            return NextResponse.json({ error: 'メールアドレスが必要です' }, { status: 400 });
        }
        
        const newEmail = new EmailModel({ email });
        await newEmail.save();
        return NextResponse.json({ success: true, message: 'メールアドレスの登録が完了いたしました', email: newEmail });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({error: error.message }, { status: 500 });
    }
}  

export async function GET() {
    try {
        const emails = await EmailModel.find();
        return NextResponse.json({ success: true, emails });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: 'メールアドレスIDが必要です' }, { status: 400 });
        }
        
        const deletedEmail = await EmailModel.findByIdAndDelete(id);
        
        if (!deletedEmail) {
            return NextResponse.json({ error: 'メールアドレスが見つかりません' }, { status: 404 });
        }
        
        return NextResponse.json({ success: true, message: 'メールアドレスが正常に削除されました', email: deletedEmail });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({error: error.message }, { status: 500 });
    }
}