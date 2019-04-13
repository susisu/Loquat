# 3.0.0 (yyyy-mm-dd)
## Breaking changes
- Support `@loquat/core@3`
- `LanguageDef` is no longer a class

## Features
- `makeTokenParser` now returns `identifier`, `reserved`, `operator`, and `reservedOp` that always fails if `idStart`, `idLetter`, `opStart`, and `opLetter` are not given

## Performance improvements
- Avoid creating a parser in `whiteSpace` at each internal iteration
- Prefer `map(parser, _ => x)` to `then(parser, pure(x))`

# 2.0.0 (2017-01-11)
- First release!