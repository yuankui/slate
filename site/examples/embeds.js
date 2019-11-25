import React, { useMemo, useState } from 'react'
import { Editor, createEditor } from 'slate'
import { Editable, withReact, useSelected, useFocused } from 'slate-react'

const EmbedsExample = () => {
  const [value, setValue] = useState(initialValue)
  const isVoid = element => element.type === 'video'
  const editor = useMemo(() => withReact(createEditor({ isVoid })), [])
  return (
    <div>
      <Editable
        editor={editor}
        value={value}
        renderElement={props => <Element {...props} />}
        onChange={v => setValue(v)}
        placeholder="Enter some text..."
      />
    </div>
  )
}

const Element = props => {
  const { attributes, children, element } = props
  switch (element.type) {
    case 'video':
      return <VideoElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const VideoElement = ({ attributes, children, element }) => {
  const selected = useSelected()
  const focused = useFocused()
  const { url } = element
  return (
    <div {...attributes}>
      {children}
      <div
        style={{
          position: 'relative',
          outline: focused ? '2px solid blue' : 'none',
        }}
      >
        <div
          style={{
            display: focused ? 'none' : 'block',
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100%',
            width: '100%',
            cursor: 'cell',
            zIndex: 1,
          }}
        />
        <div
          style={{
            padding: '75% 0 0 0',
            position: 'relative',
          }}
        >
          <iframe
            src={`${url}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      {selected && focused ? (
        <input
          value={url}
          onClick={e => e.stopPropagation()}
          style={{
            marginTop: '5px',
            boxSizing: 'border-box',
          }}
          onChange={value => {
            const path = editor.findPath(element)
            Editor.setNodes(editor, { url: value }, { at: path })
          }}
        />
      ) : null}
    </div>
  )
}

const initialValue = {
  selection: null,
  annotations: {},
  children: [
    {
      children: [
        {
          text:
            'In addition to simple image nodes, you can actually create complex embedded nodes. For example, this one contains an input element that lets you change the video being rendered!',
          marks: [],
        },
      ],
    },
    {
      type: 'video',
      url: 'https://player.vimeo.com/video/26689853',
      children: [
        {
          text: '',
          marks: [],
        },
      ],
    },
    {
      children: [
        {
          text:
            'Try it out! This editor is built to handle Vimeo embeds, but you could handle any type.',
          marks: [],
        },
      ],
    },
  ],
}

export default EmbedsExample