/** @jsx jsx */

import { Editor } from 'slate'
import { jsx } from '../../..'

export const run = editor => {
  Editor.delete(editor, { unit: 'line' })
}

export const input = (
  <editor>
    <block>
      one two thr
      <cursor />
      ee
    </block>
  </editor>
)

export const output = (
  <editor>
    <block>
      one two thr
      <cursor />
    </block>
  </editor>
)
