// app/page.tsx
'use client'

import {useState} from 'react';
import {supabase} from "@/lib/supabase";

const bucketName = "userinfo"

const HomePage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        const {data, error} = await supabase.storage
            .from(bucketName) // 替换为你的桶名称
            .upload(`test/${file.name}`, file);

        console.log(data)
        if (error) {
            setMessage(`Upload failed: ${error.message}`);
        } else {
            setMessage('File uploaded successfully!');
        }

        setUploading(false);
    };

    const handleget = async () => {
        // 获取文件的 URL

        const {data: {publicUrl}} = supabase.storage
            .from(bucketName)
            .getPublicUrl(`test/demo.jpeg`);
        console.log(publicUrl);
    }


    return (
        <div>
            <h1>File Upload to Supabase</h1>
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {message && <p>{message}</p>}
            <br/>
            <button onClick={handleget}>
                GET
            </button>


        </div>


    );
};

export default HomePage;