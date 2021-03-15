---
templateKey: blog-post
title: "This is a test post with lots of different content. Delete soon. "
tags:
  - cardano
  - blockchain
  - nft
date: 2021-03-09T20:56:53.804Z
image: gql-b11c25531e6437d931c9eaa917487e1c.png
---
After spending some time diving in to understanding and implementing a graphQL based stack *I’m blown away by how easy it is to rapidly develop complex applications.* I’m particularly impressed by how graphQL queries empower front end developers to access the data they need across multiple related data types without needing a *specific* endpoint for each query.

*That said, the stack is not without it’s pain points. On the front end, one of those challenges is around invalidating data stored in the Apollo cache when that data has been changed server side. this can be particularly troublesome when working with paginated queries.*

![](https://miro.medium.com/max/4989/1*At_TiTGwf9noXQslh102lw.png "Some Caption for the image")

Our starting application

Throughout this article we’ll be going over some examples on a simple Next.js app that’s using Apollo to fetch data from an even simpler graphQL Yoga / Prisma back end. If you’d like to follow along with these examples you can grab the starter files here, on the master branch: [https://github.com/martinseanhunt/padgey-nation-fronten](https://github.com/martinseanhunt/padgey-nation-frontend)d

This front-end is connected to demo back end that’s hosted on now.sh so you should just be able to run `npm install` and `npm run dev` and you’ll be good to go!

```
update = async (cache, payload) => {
  // This function fires once the DELETE_LIST_ITEM_MUTATION is complete

  // Get the skip value for the current page so we can read the relevant
  // query from our cache. I've passed down page from Index.js and imported
  // perPage from our config file
  const queryVars = { skip: (this.props.page - 1) * PER_PAGE }

  // read cache for the page we need to change, GET_LIST_ITEMS_QUERY 
  // imported from Index.js
  const data = cache.readQuery({ 
    query: GET_LIST_ITEMS_QUERY, variables: queryVars 
  })

  // Filter the deleted ListItem out of the cached data 
  // server returns deleted ListItem
  const newListItems = data.listItems
    .filter(i => i.id !== payload.data.deleteListItem.id)

  // Write the current pages query with the deleted item 
  // filtered back to cache
  await cache.writeQuery({ 
    query: GET_LIST_ITEMS_QUERY, 
    data: { listItems: newListItems }, 
    variables: queryVars 
  })
}
```

# The Problem

*When using the Apollo client, the response from any Query that gets sent to the server is cached locally (unless we explicitly tell it not to which we’ll come back to later). This is great for speeding up our application as Apollo will grab the requested data from the cache rather than Querying the server for data we already have.*

![](https://miro.medium.com/max/960/1*Q31Nb-rrcE0w5P-VbAZOAA.gif)

Data caching makes repeated requests faster and reduces load on the server

*However, out of the box, when we make a change to data on our server via a graphQL mutation, that change will not be reflected in the state of the application unless we refresh the page.*

![](https://miro.medium.com/max/960/1*chheKTw9TLUE-DM3c3q8XA.gif)

Adding an item requires a refresh to see changes, same is true for delete

## refetchQueries

Apollo does give us a handy function called `refetchQueries` that can be passed an array of queries that need refetching once we perform a mutation. However, any queries that we pass to *`refetchQueries` will be called as soon as the mutation has finished, this is far less than ideal for paginated data*. Assumingwe had 100 pages of data that were all populated in separate queries, using `refetchQueries` would send 100 network requests to our server at once.

![](https://miro.medium.com/max/747/1*uuJPvtSTRsxDHCPBcQ_LmQ.gif)

The servers are on fire

## readQuery & writeQuery

*We can also read from, and write data to, the Apollo cache using the `readQuery` and `writeQuery` functions which are, in many cases, perfect for dealing with these kinds of operations. We can simply insert our newly created item in to, or filter the deleted item from our cache, showing the updates on screen instantly. However this approach can cause issues when dealing with paginated queries depending on what pages the user has cached before they initiate the mutation. This can be particularly problematic when multiple changes are made.*

For example, here’s a problem we can run in to when deleting an item from the cache manually using the update function in our `Create.js` component:

Here’s a visual example of one of the problems this can create:>