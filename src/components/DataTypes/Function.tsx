/**
 * Use NoSsr on function value.
 *  Because in Next.js SSR, the function will be translated to other type
 */
import type { FC } from 'react'

import { useJsonViewerStore } from '../../stores/JsonViewerStore'
import type { DataItemProps } from '../../type'
import { DataTypeLabel } from '../DataTypeLabel'
import { NoSsr } from '../mui/NoSsr'

const functionBody = (func: Function) => {
  const funcString = func.toString()

  let isUsualFunction = true
  const parenthesisPos = funcString.indexOf(')')
  const arrowPos = funcString.indexOf('=>')
  if (arrowPos !== -1 && arrowPos > parenthesisPos) {
    isUsualFunction = false
  }
  if (isUsualFunction) {
    return funcString.substring(
      funcString.indexOf('{', parenthesisPos) + 1,
      funcString.lastIndexOf('}')
    )
  }

  return funcString.substring(funcString.indexOf('=>') + 2)
}

const functionName = (func: Function) => {
  const funcString = func.toString()
  const isUsualFunction = funcString.indexOf('function') !== -1
  if (isUsualFunction) {
    return funcString.substring(8, funcString.indexOf('{')).trim()
  }

  return funcString.substring(0, funcString.indexOf('=>') + 2).trim()
}

const lb = '{'
const rb = '}'

export const PreFunctionType: FC<DataItemProps<Function>> = (props) => {
  return (
    <NoSsr>
      <DataTypeLabel dataType='function'/>
      <span
        className='data-function-start'
        style={{
          letterSpacing: 0.5
        }}
      >
        {functionName(props.value)}
        {' '}{lb}
      </span>
    </NoSsr>
  )
}

export const PostFunctionType: FC<DataItemProps<Function>> = () => {
  return (
    <NoSsr>
      <span className='data-function-end'>
        {rb}
      </span>
    </NoSsr>
  )
}

export const FunctionType: FC<DataItemProps<Function>> = (props) => {
  const functionColor = useJsonViewerStore(store => store.colorspace.base05)
  return (
    <NoSsr>
      <div
        className='data-function'
        style={{
          display: props.inspect ? 'block' : 'inline-block',
          paddingLeft: props.inspect ? 2 : 0,
          color: functionColor
        }}
      >
        {props.inspect
          ? functionBody(props.value)
          : (
            <span className='data-viewer-data-function-body' onClick={() => props.setInspect(true)}>
              …
            </span>
            )
        }
      </div>
    </NoSsr>
  )
}
