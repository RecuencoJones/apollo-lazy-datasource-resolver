# GraphQL on top of REST

This is just an example of how to layer GraphQL on top of REST

## Lazy datasource/resolver mapper

In some cases we want to resolve some properties from other endpoints which also depend on parent data.

To do this, although Apollo does not provide further information than current resolver data, we can return functions from the datasource that will be called from the resolver when necessary.

Check [vcs.ts](./graphql/src/datasources/vcs.ts#L24-L26):

```
_lazy: {
  changes: () => this.get(`changes/${ project.slug }/${ repo.slug }/${ env.from }?compare=${ env.to }`)
}
```

We are calling this later from the resolver at [repository.ts](./graphql/src/resolvers/repository.ts)

```
export const Repository = {
  changes: async ({ _lazy }) => _lazy.changes()
}
```

Is this a good practice? I don't know, but for sure this pattern could be used for further – and probably better – cases than the one showcased!
