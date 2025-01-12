import { Editor } from "@tiptap/react";
import { BoldIcon, Heading1Icon, Heading2Icon, Heading3Icon, ItalicIcon, StrikethroughIcon } from "lucide-react";
import { Toggle } from "./toggle";

interface Props { 
  editor: Editor | null
}

export default function EditorMenuBar(props: Props) {
  const { editor } = props

  if (!editor) return null

  return (
    <div className="flex gap-2">
      <Toggle 
        pressed={editor.isActive('heading', { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
      >
        <Heading1Icon className="h-4 w-4" />
      </Toggle>
      <Toggle 
        pressed={editor.isActive('heading', { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}  
      >
        <Heading2Icon className="h-4 w-4" />
      </Toggle>
      <Toggle 
        pressed={editor.isActive('heading', { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
      >
        <Heading3Icon className="h-4 w-4" />
      </Toggle>
      <Toggle 
        pressed={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()} 
      >
        <BoldIcon className="h-4 w-4" />
      </Toggle>
      <Toggle 
        pressed={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()} 
      >
        <ItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle 
        pressed={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()} 
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
    </div>
  )
}