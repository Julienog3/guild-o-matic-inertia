import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorMenuBar from './editor_menu_bar'

const extensions = [StarterKit.configure()]

interface Props {
  content: string
  onChange: (value: string) => void
}

const Tiptap = (props: Props) => {
  const { content, onChange } = props

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'w-full h-full min-h-[300px] prose prose-sm focus:outline-none prose-headings:text-stone-400 prose-p:text-stone-500 max-w-full'
      }
    },
    extensions,
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    }
  })

  return (
    <>
      <EditorMenuBar editor={editor} />
      <EditorContent
        className="flex flex-1 px-3 py-2 h-full [&>p]:block w-full rounded-md border text-stone-400 border-stone-700 bg-stone-800 text-sm ring-offset-indigo-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        editor={editor}
      />

      {/* <FloatingMenu shouldShow={() => false} editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu shouldShow={() => false} editor={editor}>This is the bubble menu</BubbleMenu> */}
    </>
  )
}

export default Tiptap