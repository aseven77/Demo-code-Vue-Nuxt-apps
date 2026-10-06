type ColorTransformInput = 'primary' | 'error'
type ColorTransformOutput = 'secondary' | 'primary' | 'error'

export const colorTransform = (color: ColorTransformInput): ColorTransformOutput =>
  color === 'primary' ? 'secondary' : color
