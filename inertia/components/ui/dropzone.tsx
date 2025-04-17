import * as React from 'react'

import { cn } from '~/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Dropzone = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, ...props }, ref) => {
    React.useEffect(() => {
      if (value) {
        setImage(URL.createObjectURL(value))
      }
    }, [value])

    const [image, setImage] = React.useState<string | null>(null)

    return (
      <div className={cn("flex flex-col items-center justify-center w-full", className)}>
        <label htmlFor={props.id} className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer transition-colors bg-stone-800 hover:bg-stone-600 border-stone-700 hover:border-stone-800">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {image
              ? <img className="w-32 h-32" src={image} />
              : <>
                <svg className="w-8 h-8 mb-4 text-stone-500 dark:text-stone-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-stone-500 dark:text-stone-400"><span className="font-semibold">Cliquer pour upload</span> ou glisser et déposer</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </>
            }
          </div>
          <input
            type="file"
            className="hidden"
            ref={ref}
            {...props}
          />

        </label>
      </div>
    )
  }
)

export { Dropzone }
