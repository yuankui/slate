/** @jsx jsx */

import { Editor } from 'slate'
import { jsx } from '../../..'

export const run = editor => {
  Editor.move(editor, { edge: 'anchor' })
}

export const input = (
  <editor>
    <block>
      one two t<cursor />
      hree
    </block>
  </editor>
)

export const output = (
  <editor>
    <block>
      one two t<focus />h<anchor />
      ree
    </block>
  </editor>
)
