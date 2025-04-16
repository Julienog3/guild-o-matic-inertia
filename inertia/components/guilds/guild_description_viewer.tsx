import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  content: string
}

export default function GuildDescriptionViewer(props: Props) {
  const { content } = props

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose w-full max-w-full focus:outline-none prose-headings:text-stone-400 prose-p:text-stone-500 prose-strong:text-stone-500'
      }
    },
    extensions: [StarterKit],
    content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
}