import { TextField } from '@mui/material'
import { unstable_JsonViewer as JsonViewer } from '@textea/json-viewer'
import type React from 'react'
import { useCallback, useState } from 'react'

import type { InteractionProps } from '../../../src/type'

function aPlusB (a: number, b: number) {
  return a + b
}

const example = {
  string: 'this is a test string',
  integer: 42,
  array: [1, 2, 3, 'test', NaN],
  float: 3.14159,
  undefined,
  object: {
    'first-child': true,
    'second-child': false,
    'last-child': null
  },
  fn: aPlusB,
  string_number: '1234',
  date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)')
}

const IndexPage: React.FC = () => {
  const [indent, setIndent] = useState(2)
  const [src, setSrc] = useState<object>(() => example)
  const handleEdit = useCallback((update: InteractionProps) => {
    setSrc(update.updated_src)
  }, [])
  return (
    <div>
      <TextField
        value={indent}
        type='number'
        onChange={
          event => {
            const indent = parseInt(event.target.value)
            if (indent > -1 && indent < 10) {
              setIndent(indent)
            }
          }
        }
      />
      <JsonViewer
        src={src}
        indentWidth={indent}
        onEdit={handleEdit}
      />
    </div>
  )
}

export default IndexPage