function mapModifiers(baseClassName: string, ...modifiers: Array<string | string[] | false | undefined>): string {
  return modifiers
    .reduce<string[]>((acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]), [])
    .map(m => `-${m}`)
    .reduce<string>((classNames, suffix) => `${classNames} ${baseClassName}${suffix}`, baseClassName);
}
export default mapModifiers;
