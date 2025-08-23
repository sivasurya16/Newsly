import './styles.scss'
// import * from '@/components/tiptap-icons';
import { Undo2Icon } from '../tiptap-icons/undo2-icon';
import { EditorContent, useEditor, Editor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import { TextStyleKit } from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Redo2Icon } from '../tiptap-icons/redo2-icon';
import { HeadingOneIcon } from '../tiptap-icons/heading-one-icon';
import { HeadingSixIcon } from '../tiptap-icons/heading-six-icon';
import { HeadingFiveIcon } from '../tiptap-icons/heading-five-icon';
import { HeadingFourIcon } from '../tiptap-icons/heading-four-icon';
import { HeadingThreeIcon } from '../tiptap-icons/heading-three-icon';
import { HeadingTwoIcon } from '../tiptap-icons/heading-two-icon';
import { BoldIcon } from '../tiptap-icons/bold-icon';
import { ItalicIcon } from '../tiptap-icons/italic-icon';
import { StrikeIcon } from '../tiptap-icons/strike-icon';
import { Code2Icon } from '../tiptap-icons/code2-icon';
import { UnderlineIcon } from '../tiptap-icons/underline-icon';
import { AlignCenterIcon } from '../tiptap-icons/align-center-icon';
import { AlignRightIcon } from '../tiptap-icons/align-right-icon';
import { AlignJustifyIcon } from '../tiptap-icons/align-justify-icon';
import { BlockquoteIcon } from '../tiptap-icons/blockquote-icon';
import { CodeBlockIcon } from '../tiptap-icons/code-block-icon';
import { ListOrderedIcon } from '../tiptap-icons/list-ordered-icon';
import { ListIcon } from '../tiptap-icons/list-icon';

const MenuBar = ({ editor }: { editor: Editor }) => {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                isUnderline: ctx.editor.isActive('underline') ?? false,
                canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,

            }
        },
    })

    return (
        <div className="control-group">
            <div className="button-group">
                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}><Undo2Icon /></button>
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}><Redo2Icon /></button>
            </div>
            <div className="button-group">
                {/* <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editorState.isParagraph ? 'is-active' : ''}
                >
                    P
                </button> */}
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editorState.isHeading1 ? 'is-active' : ''}
                >
                    <HeadingOneIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editorState.isHeading2 ? 'is-active' : ''}
                >
                    <HeadingTwoIcon />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editorState.isHeading3 ? 'is-active' : ''}
                >
                    <HeadingThreeIcon />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editorState.isHeading4 ? 'is-active' : ''}
                >
                    <HeadingFourIcon />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editorState.isHeading5 ? 'is-active' : ''}
                >
                    <HeadingFiveIcon />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editorState.isHeading6 ? 'is-active' : ''}
                >
                    <HeadingSixIcon />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editorState.isBulletList ? 'is-active' : ''}
                >
                    <ListIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editorState.isOrderedList ? 'is-active' : ''}
                >
                    <ListOrderedIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editorState.isCodeBlock ? 'is-active' : ''}
                >
                    <CodeBlockIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editorState.isBlockquote ? 'is-active' : ''}
                >
                    <BlockquoteIcon />
                </button>
            </div>
            <div className="button-group">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editorState.canBold}
                    className={editorState.isBold ? 'is-active' : ''}
                >
                    <BoldIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editorState.canItalic}
                    className={editorState.isItalic ? 'is-active' : ''}
                >
                    <ItalicIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editorState.canStrike}
                    className={editorState.isStrike ? 'is-active' : ''}
                >
                    <StrikeIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editorState.canCode}
                    className={editorState.isCode ? 'is-active' : ''}
                >
                    <Code2Icon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editorState.canUnderline}
                    className={editorState.isUnderline ? 'is-active' : ''}
                >
                    <UnderlineIcon />
                </button>
                {/* <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={editorState.isActive('highlight') ? 'is-active' : ''}
                >
                    HighLight
                </button> */}
            </div>
            <div className="button-group">
                <button
                    onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
                >
                    <AlignCenterIcon />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
                >
                    <AlignRightIcon />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleTextAlign('justify').run()}
                >
                    <AlignJustifyIcon />

                </button>
            </div>
            {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
            <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button> */}

            {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</button> */}
            {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button> */}

        </div>
    )
}

interface TiptapEditorProps {
    content: Object,
    updateContent: Function
}

const TiptapEditor = ({ content, updateContent }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        editorProps: {
            attributes: {
                spellcheck: 'true',
            },
        },
        onUpdate: ({ editor }) => {
            // Send JSON back to parent
            updateContent(editor.getJSON());
            console.log("Editor JSON:", editor.getJSON()); // ✅ Logs the correct new value
        },
    })




    return (
        <div className='editor-container'>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TiptapEditor;