import type { NewsItem } from "@/types/news";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import './news_detail.css';

const api = import.meta.env.VITE_SERVER_URL || "";

function NewsDetail() {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState<NewsItem>();
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: newsItem?.body,
        editable: false,
    });
    useEffect(() => {
        if (editor && newsItem) {
            editor.commands.setContent(newsItem.body);
        }
    }, [editor, newsItem]);

    useEffect(() => {
        if (!id) return;
        const fetchFullNews = async () => {
            try {
                const res = await axios.get(`${api}/record/${id}`);
                setNewsItem(res.data);
            } catch (err) {
                if (axios.isAxiosError(err))
                    toast.error(err.response?.data);
                else
                    console.error(err);
            }
        };
        fetchFullNews();
    }, [id]);
    return (
        <div className="news-container">
            {newsItem && editor ? (
                <>
                    <h1>{newsItem.itemTitle}</h1>
                    <EditorContent editor={editor}></EditorContent>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default NewsDetail;